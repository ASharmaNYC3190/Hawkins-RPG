// INPUTS
window.addEventListener("keydown", function(e) {

    keys[e.key] = true;

    // START MUSIC
    if(!musicStarted) {

        music.play();
        musicStarted = true;
    }

    // FLASHLIGHT
    if(e.key === "f") {
        flashlightOn = !flashlightOn;
    }

    // DIALOGUE NAVIGATION
    if(showDialogue) {

        let choices =
            npc.dialogue[currentDialogue].choices;

        if(e.key === "ArrowUp") {

            if(choices) {

                selectedChoice--;

                if(selectedChoice < 0) {
                    selectedChoice =
                        choices.length - 1;
                }
            }
        }

        if(e.key === "ArrowDown") {

            if(choices) {

                selectedChoice++;

                if(selectedChoice >= choices.length) {
                    selectedChoice = 0;
                }
            }
        }
    }

    // INTERACT
    if(e.key === "e") {

        let dx = player.x - npc.x;
        let dy = player.y - npc.y;

        let distance = Math.sqrt(dx * dx + dy * dy);

        if(distance < 80 && !showDialogue) {

            showDialogue = true;
            currentDialogue = "start";
            selectedChoice = 0;
        }

        else if(showDialogue) {

            let current =
                npc.dialogue[currentDialogue];

            if(current.choices) {

                currentDialogue =
                    current.choices[selectedChoice].next;

                selectedChoice = 0;
            }

            else {

                showDialogue = false;
                currentDialogue = "start";
            }
        }
    }
});

window.addEventListener("keyup", function(e) {
    keys[e.key] = false;
});

// DARKNESS
function drawDarkness() {

    ctx.fillStyle =
        `rgba(0,0,0,${darkness})`;

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    // FLASHLIGHT
    if(flashlightOn) {

        const gradient =
            ctx.createRadialGradient(
                player.x - camera.x,
                player.y - camera.y,
                20,

                player.x - camera.x,
                player.y - camera.y,
                140
            );

        gradient.addColorStop(
            0,
            "rgba(255,255,220,0)"
        );

        gradient.addColorStop(
            1,
            `rgba(0,0,0,${darkness})`
        );

        ctx.globalCompositeOperation =
            "destination-out";

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

        ctx.globalCompositeOperation =
            "source-over";
    }
}

// UPDATE
function update() {

    updatePlayer();

    darkness += nightDirection;

    if(darkness > 0.85 || darkness < 0) {
        nightDirection *= -1;
    }
}

// DRAW
function draw() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    drawMap();
    drawNPC();
    drawPlayer();
    drawDialogue();
    drawDarkness();
}

// GAME LOOP
function gameLoop() {

    update();
    draw();

    requestAnimationFrame(gameLoop);
}

gameLoop();
