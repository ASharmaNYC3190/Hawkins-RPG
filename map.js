const map = [];

for(let y = 0; y < 50; y++) {

    let row = [];

    for(let x = 0; x < 50; x++) {

        if(
            x === 0 ||
            y === 0 ||
            x === 49 ||
            y === 49
        ) {
            row.push(1);
        }

        else if(y === 25) {
            row.push(2);
        }

        else if(
            (x === 10 && y > 5 && y < 20) ||
            (x === 11 && y > 5 && y < 20) ||
            (x === 30 && y > 10 && y < 35)
        ) {
            row.push(3);
        }

        else if(
            x > 18 &&
            x < 24 &&
            y > 10 &&
            y < 16
        ) {
            row.push(4);
        }

        else {
            row.push(0);
        }
    }

    map.push(row);
}

function isColliding(x, y) {

    let tileX = Math.floor(x / TILE_SIZE);
    let tileY = Math.floor(y / TILE_SIZE);

    if(
        tileX < 0 ||
        tileY < 0 ||
        tileY >= map.length ||
        tileX >= map[0].length
    ) {
        return true;
    }

    return map[tileY][tileX] === 1;
}

function drawMap() {

    for(let y = 0; y < map.length; y++) {

        for(let x = 0; x < map[y].length; x++) {

            let tile = map[y][x];

            if(tile === 1) {
                ctx.fillStyle = "#333";
            }

            else if(tile === 0) {
                ctx.fillStyle = "#0b3d0b";
            }

            else if(tile === 2) {
                ctx.fillStyle = "#666";
            }

            else if(tile === 3) {
                ctx.fillStyle = "#145214";
            }

            else if(tile === 4) {
                ctx.fillStyle = "#5c4033";
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
