const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 960;
canvas.height = 640;

const TILE_SIZE = 32;

// CAMERA
const camera = {
    x: 0,
    y: 0
};

// KEYS
const keys = {};

// DAY/NIGHT
let darkness = 0;
let nightDirection = 0.0004;
let flashlightOn = true;
