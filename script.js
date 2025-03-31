const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const image = new Image();
image.src = "img/cat-sprite.svg";

const frameWidth = 18;
const frameHeight = 12;
const scaleFactor = 5;
const totalFrames = 2;
let currentFrame = 0;
let xPos = 0;
let direction = 1;
const speed = 2;
let frameCounter = 0;
const frameDelay = 15;

const animationContainer = document.querySelector(".animationContainer");

function updateFrame() {
    frameCounter++;
    if (frameCounter >= frameDelay) {
        currentFrame = (currentFrame + 1) % totalFrames;
        frameCounter = 0;
    }
}

function updatePosition() {
    const maxWidth = animationContainer.offsetWidth - (frameWidth * scaleFactor);
    xPos += speed * direction;

    if (xPos >= maxWidth) {
        direction = -1;
    } else if (xPos <= 0) {
        direction = 1;
    }
}

function drawFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(xPos, 0);

    if (direction === -1) {
        ctx.scale(-1, 1);
        ctx.translate(-frameWidth * scaleFactor, 0);
    }

    ctx.drawImage(
        image,
        currentFrame * frameWidth, 0, frameWidth, frameHeight,
        0, 0, frameWidth * scaleFactor, frameHeight * scaleFactor
    );

    ctx.restore();
}

function resizeCanvas() {
    const maxWidth = animationContainer.offsetWidth - (frameWidth * scaleFactor);
    canvas.width = maxWidth + (frameWidth * scaleFactor);
    canvas.height = frameHeight * scaleFactor;
}

function animate() {
    updateFrame();
    updatePosition();
    drawFrame();
    requestAnimationFrame(animate);
}

image.onload = () => {
    resizeCanvas();
    animate();
};

window.addEventListener("resize", resizeCanvas);

canvas.style.position = "absolute";
canvas.style.top = "0";
canvas.style.left = "0";