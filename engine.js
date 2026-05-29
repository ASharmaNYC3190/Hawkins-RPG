const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 960;
canvas.height = 640;

const TILE_SIZE = 32;

// DAY/NIGHT
let darkness = 0;
let nightDirection = 0.0004;
let flashlightOn = true;

// CAMERA
const camera = {
    x: 0,
    y: 0
};

function update() {

    updatePlayer();

    camera.x = player.x - canvas.width / 2;
    camera.y = player.y - canvas.height / 2;

    darkness += nightDirection;

    if(darkness > 0.85 || darkness < 0) {
        nightDirection *= -1;
    }
}

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawMap();
    drawNPC();
    drawPlayer();
    drawDialogue();
    drawDarkness();
}

function drawDarkness() {

    ctx.fillStyle = `rgba(0,0,0,${darkness})`;

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    if(flashlightOn) {

        const gradient = ctx.createRadialGradient(
            player.x - camera.x,
            player.y - camera.y,
            20,

            player.x - camera.x,
            player.y - camera.y,
            140
        );

        gradient.addColorStop(0, "rgba(255,255,220,0)");
        gradient.addColorStop(1, `rgba(0,0,0,${darkness})`);

        ctx.globalCompositeOperation = "destination-out";

        ctx.fillStyle = gradient;

        ctx.beginPath();

        ctx.arc(
            player.x - camera.x,
            player.y - camera.y,
            140,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.globalCompositeOperation = "source-over";
    }
}
