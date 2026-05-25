const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

// PLAYER
const player = {
    x: 400,
    y: 300,
    width: 32,
    height: 32,
    speed: 4,
    color: "cyan"
};

// KEYBOARD INPUT
const keys = {};

document.addEventListener("keydown", (e) => {
    keys[e.key] = true;
});

document.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});

// UPDATE PLAYER
function update() {

    if (keys["ArrowUp"]) {
        player.y -= player.speed;
    }

    if (keys["ArrowDown"]) {
        player.y += player.speed;
    }

    if (keys["ArrowLeft"]) {
        player.x -= player.speed;
    }

    if (keys["ArrowRight"]) {
        player.x += player.speed;
    }
}

// DRAW EVERYTHING
function draw() {

    // background
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // player
    ctx.fillStyle = player.color;
    ctx.fillRect(
        player.x,
        player.y,
        player.width,
        player.height
    );
}

// MAIN GAME LOOP
function gameLoop() {

    update();
    draw();

    requestAnimationFrame(gameLoop);
}

gameLoop();
