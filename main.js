const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 960;
canvas.height = 640;

const TILE_SIZE = 32;

// BIG MAP
const map = [];

for(let y = 0; y < 50; y++) {

    let row = [];

    for(let x = 0; x < 50; x++) {

        // outer walls
        if(
            x === 0 ||
            y === 0 ||
            x === 49 ||
            y === 49
        ) {
            row.push(1);
        } else {
            row.push(0);
        }
    }

    map.push(row);
}

// PLAYER
const player = {
    x: 200,
    y: 200,
    width: 28,
    height: 28,
    speed: 4,
    color: "cyan"
};

// CAMERA
const camera = {
    x: 0,
    y: 0
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

    if (keys["ArrowUp"]) nextY -= player.speed;
    if (keys["ArrowDown"]) nextY += player.speed;
    if (keys["ArrowLeft"]) nextX -= player.speed;
    if (keys["ArrowRight"]) nextX += player.speed;

    if (!isColliding(nextX, player.y)) {
        player.x = nextX;
    }

    if (!isColliding(player.x, nextY)) {
        player.y = nextY;
    }

    // CAMERA FOLLOWS PLAYER
    camera.x = player.x - canvas.width / 2;
    camera.y = player.y - canvas.height / 2;
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
                x * TILE_SIZE - camera.x,
                y * TILE_SIZE - camera.y,
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
        player.x - camera.x,
        player.y - camera.y,
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

// LOOP
function gameLoop() {

    update();
    draw();

    requestAnimationFrame(gameLoop);
}

gameLoop();
