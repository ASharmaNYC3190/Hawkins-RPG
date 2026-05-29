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

// NPC
function drawNPC() {

    ctx.fillStyle = npc.color;

    ctx.fillRect(
        npc.x - camera.x,
        npc.y - camera.y,
        npc.width,
        npc.height
    );
}

// DIALOGUE
function drawDialogue() {

    if(!showDialogue) return;

    const current =
        npc.dialogue[currentDialogue];

    ctx.fillStyle = "black";
    ctx.fillRect(100, 420, 760, 180);

    ctx.strokeStyle = "white";
    ctx.lineWidth = 4;
    ctx.strokeRect(100, 420, 760, 180);

    ctx.fillStyle = "white";
    ctx.font = "20px monospace";

    ctx.fillText(
        current.text,
        120,
        460
    );

    if(current.choices) {

        for(let i = 0; i < current.choices.length; i++) {

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

    else {

        ctx.fillStyle = "gray";

        ctx.fillText(
            "Press E to continue",
            120,
            560
        );
    }
}
