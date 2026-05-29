const player = {
    x: 200,
    y: 200,
    width: 28,
    height: 28,
    speed: 4,
    color: "cyan"
};

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

// UPDATE PLAYER
function updatePlayer() {

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

    // CAMERA
    camera.x = player.x - canvas.width / 2;
    camera.y = player.y - canvas.height / 2;
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
