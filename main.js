const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 960;
canvas.height = 640;

const TILE_SIZE = 32;

// ========================================
// DAY / NIGHT + FLASHLIGHT
// ========================================

let darkness = 0;
let nightDirection = 0.0004;
let flashlightOn = true;

// ========================================
// BIG MAP
// ========================================

const map = [];

for(let y = 0; y < 50; y++) {

    let row = [];

    for(let x = 0; x < 50; x++) {

        // OUTER WALLS
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

        // GRASS
        else {
            row.push(0);
        }
    }

    map.push(row);
}

// ========================================
// PLAYER
// ========================================

const player = {
    x: 200,
    y: 200,
    width: 28,
    height: 28,
    speed: 4,
    color: "cyan"
};

// ========================================
// NPC + DIALOGUE CHOICES
// ========================================

const npc = {
    x: 700,
    y: 400,
    width: 28,
    height: 28,
    color: "yellow",

    dialogue: {

        start: {
            text: "What do you want to ask about?",
            choices: [
                {
                    text: "Ask about Hawkins Lab",
                    next: "lab"
                },
                {
                    text: "Ask about the woods",
                    next: "woods"
                },
                {
                    text: "Leave",
                    next: "leave"
                }
            ]
        },

        lab: {
            text: "I heard strange experiments are happening there."
        },

        woods: {
            text: "People hear screaming at night near the forest."
        },

        leave: {
            text: "Stay safe out there..."
        }
    }
};

let showDialogue = false;
let currentDialogue = "start";
let selectedChoice = 0;

// ========================================
// CAMERA
// ========================================

const camera = {
    x: 0,
    y: 0
};

// ========================================
// KEYS
// ========================================

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

    // ========================================
    // DIALOGUE CHOICE NAVIGATION
    // ========================================

    if(showDialogue) {

        let choices =
            npc.dialogue[currentDialogue].choices;

        // MOVE UP
        if(e.key === "ArrowUp") {

            if(choices) {

                selectedChoice--;

                if(selectedChoice < 0) {
                    selectedChoice =
                        choices.length - 1;
                }
            }
        }

        // MOVE DOWN
        if(e.key === "ArrowDown") {

            if(choices) {

                selectedChoice++;

                if(selectedChoice >= choices.length) {
                    selectedChoice = 0;
                }
            }
        }
    }

    // ========================================
    // INTERACT
    // ========================================

    if(e.key === "e") {

        let dx = player.x - npc.x;
        let dy = player.y - npc.y;

        let distance = Math.sqrt(dx * dx + dy * dy);

        // START DIALOGUE
        if(distance < 80 && !showDialogue) {

            showDialogue = true;
            currentDialogue = "start";
            selectedChoice = 0;
        }

        // HANDLE DIALOGUE
        else if(showDialogue) {

            let current =
                npc.dialogue[currentDialogue];

            // HAS CHOICES
            if(current.choices) {

                currentDialogue =
                    current.choices[selectedChoice].next;

                selectedChoice = 0;
            }

            // END DIALOGUE
            else {

                showDialogue = false;
                currentDialogue = "start";
            }
        }
    }

    // ========================================
    // FLASHLIGHT TOGGLE
    // ========================================

    if(e.key === "f") {
        flashlightOn = !flashlightOn;
    }
});

window.addEventListener("keyup", function(e) {
    keys[e.key] = false;
});

// ========================================
// COLLISION
// ========================================

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

// ========================================
// UPDATE
// ========================================

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

    // DAY/NIGHT CYCLE
    darkness += nightDirection;

    if(darkness > 0.85 || darkness < 0) {
        nightDirection *= -1;
    }
}

// ========================================
// DRAW MAP
// ========================================

function drawMap() {

    for(let y = 0; y < map.length; y++) {

        for(let x = 0; x < map[y].length; x++) {

            let tile = map[y][x];

            // WALL
            if(tile === 1) {
                ctx.fillStyle = "#333";
            }

            // GRASS
            else if(tile === 0) {
                ctx.fillStyle = "#0b3d0b";
            }

            // ROAD
            else if(tile === 2) {
                ctx.fillStyle = "#666";
            }

            // TREE
            else if(tile === 3) {
                ctx.fillStyle = "#145214";
            }

            // HOUSE
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

// ========================================
// DRAW PLAYER
// ========================================

function drawPlayer() {

    ctx.fillStyle = player.color;

    ctx.fillRect(
        player.x - camera.x,
        player.y - camera.y,
        player.width,
        player.height
    );
}

// ========================================
// DRAW NPC
// ========================================

function drawNPC() {

    ctx.fillStyle = npc.color;

    ctx.fillRect(
        npc.x - camera.x,
        npc.y - camera.y,
        npc.width,
        npc.height
    );
}

// ========================================
// DRAW DIALOGUE
// ========================================

function drawDialogue() {

    if(!showDialogue) return;

    const current =
        npc.dialogue[currentDialogue];

    // DIALOGUE BOX
    ctx.fillStyle = "black";
    ctx.fillRect(100, 420, 760, 180);

    ctx.strokeStyle = "white";
    ctx.lineWidth = 4;
    ctx.strokeRect(100, 420, 760, 180);

    // TEXT
    ctx.fillStyle = "white";
    ctx.font = "20px monospace";

    ctx.fillText(
        current.text,
        120,
        460
    );

    // CHOICES
    if(current.choices) {

        for(let i = 0; i < current.choices.length; i++) {

            // SELECTED OPTION
            if(i === selectedChoice) {
                ctx.fillStyle = "yellow";
            }

            else {
                ctx.fillStyle = "white";
            }

            ctx.fillText(
                current.choices[i].text,
                140,
                510 + i * 30
            );
        }
    }

    // CONTINUE
    else {

        ctx.fillStyle = "gray";

        ctx.fillText(
            "Press E to continue",
            120,
            560
        );
    }
}

// ========================================
// DARKNESS + FLASHLIGHT
// ========================================

function drawDarkness() {

    // DARKNESS OVERLAY
    ctx.fillStyle = `rgba(0, 0, 0, ${darkness})`;

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    // FLASHLIGHT
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

// ========================================
// DRAW
// ========================================

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawMap();
    drawNPC();
    drawPlayer();
    drawDialogue();
    drawDarkness();
}

// ========================================
// GAME LOOP
// ========================================

function gameLoop() {

    update();
    draw();

    requestAnimationFrame(gameLoop);
}

gameLoop();
