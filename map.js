const map = [];

for(let y = 0; y < 50; y++) {

    let row = [];

    for(let x = 0; x < 50; x++) {

        // WALLS
        if(
            x === 0 ||
            y === 0 ||
            x === 49 ||
            y === 49
        ) {
            row.push(1);
        }

        // ROAD
        else if(y === 25) {
            row.push(2);
        }

        // TREES
        else if(
            (x === 10 && y > 5 && y < 20) ||
            (x === 11 && y > 5 && y < 20) ||
            (x === 30 && y > 10 && y < 35)
        ) {
            row.push(3);
        }

        // HOUSE
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

// DRAW MAP
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
