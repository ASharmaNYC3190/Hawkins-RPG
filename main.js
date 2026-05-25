const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 608;

const TILE_SIZE = 32;

// MAP
// 0 = floor
// 1 = wall


const map = [
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];
// PLAYER
const player = {
    x: 100,
    y: 100,
    width: 28,
    height: 28,
    speed: 4,
    color: "cyan"
};

// KEYS
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
});

window.addEventListener("keyup", function(e) {
    keys[e.key] = false;
});

// COLLISION
function isColliding(x, y) {

    let tileX = Math.floor(x / TILE_SIZE);
    let tileY = Math.floor(y / TILE_SIZE);

    // OUTSIDE MAP = COLLISION
    if (
        tileX < 0 ||
        tileY < 0 ||
        tileY >= map.length ||
        tileX >= map[0].length
    ) {
        return true;
    }

    return map[tileY][tileX] === 1;

}

// UPDATE
function update() {

    let nextX = player.x;
    let nextY = player.y;

    if (keys["ArrowUp"]) {
        nextY -= player.speed;
    }

    if (keys["ArrowDown"]) {
        nextY += player.speed;
    }

    if (keys["ArrowLeft"]) {
        nextX -= player.speed;
    }

    if (keys["ArrowRight"]) {
        nextX += player.speed;
    }

    if (!isColliding(nextX, player.y)) {
        player.x = nextX;
    }

    if (!isColliding(player.x, nextY)) {
        player.y = nextY;
    }
}

// DRAW MAP
function drawMap() {

    for(let y = 0; y < map.length; y++) {

        for(let x = 0; x < map[y].length; x++) {

            if(map[y][x] === 1) {
                ctx.fillStyle = "#333";
            } else {
                ctx.fillStyle = "#111";
            }

            ctx.fillRect(
                x * TILE_SIZE,
                y * TILE_SIZE,
                TILE_SIZE,
                TILE_SIZE
            );
        }
    }
}

// DRAW PLAYER
function drawPlayer() {

    ctx.fillStyle = player.color;

    ctx.fillRect(
        player.x,
        player.y,
        player.width,
        player.height
    );
}

// DRAW
function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawMap();
    drawPlayer();
}

// GAME LOOP
function gameLoop() {

    update();
    draw();

    requestAnimationFrame(gameLoop);
}

gameLoop();
