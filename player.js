const player = {
    x: 200,
    y: 200,
    width: 28,
    height: 28,
    speed: 4,
    color: "cyan"
};

const keys = {};

window.addEventListener("keydown", function(e) {

    if([
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight"
    ].includes(e.key)) {
        e.preventDefault();
    }

    keys[e.key] = true;

    if(e.key === "f") {
        flashlightOn = !flashlightOn;
    }
});

window.addEventListener("keyup", function(e) {
    keys[e.key] = false;
});

function updatePlayer() {

    let nextX = player.x;
    let nextY = player.y;

    if(keys["ArrowUp"]) nextY -= player.speed;
    if(keys["ArrowDown"]) nextY += player.speed;
    if(keys["ArrowLeft"]) nextX -= player.speed;
    if(keys["ArrowRight"]) nextX += player.speed;

    if(!isColliding(nextX, player.y)) {
        player.x = nextX;
    }

    if(!isColliding(player.x, nextY)) {
        player.y = nextY;
    }
}

function drawPlayer() {

    ctx.fillStyle = player.color;

    ctx.fillRect(
        player.x - camera.x,
        player.y - camera.y,
        player.width,
        player.height
    );
}
