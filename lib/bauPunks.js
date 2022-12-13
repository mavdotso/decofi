import { createCanvas } from "canvas";

export default async function generateBauPunk() {
    // Initialise canvas
    const canvas = createCanvas(400, 400);
    const ctx = canvas.getContext("2d");

    // PRNG algo
    function mulberry32(a) {
        return function () {
            a |= 0;
            a = (a + 0x6d2b79f5) | 0;
            var t = Math.imul(a ^ (a >>> 15), 1 | a);
            t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
    }

    const randSeed = Math.floor(Math.random() * 4294967296);
    const rand = mulberry32(randSeed);

    const w = 400;
    const width = (canvas.width = w);
    const height = (canvas.height = w);

    const nX = 3; // How many cells will fit horizintally
    const nY = 3; // How many cells will fit vertically;

    const cell = Math.floor(width / (nX + 2)); // Size of one cell

    // Calculating equal padding
    const totalPaddingX = width - nX * cell;
    const totalPaddingY = height - nY * cell;
    const paddingLeft = Math.ceil(totalPaddingX / 2);
    const paddingTop = Math.ceil(totalPaddingY / 2);
    const paddingRight = width - nX * cell - paddingLeft;
    const paddingBottom = height - nY * cell - paddingTop;

    const hairColors = ["#1F1F1F", "#CF6637", "#869FB8", "#117985", "#F4B248"];
    const canvasColors = ["#F5F4F2", "#F9F3E3", "#FFF2D7"];
    const canvasCircleColors = ["#FA4E1D", "#1C6AE4", "#EFCF28"];
    const skinColors = ["#DDB989", "#CEAB97", "#CB9D7C", "#CA9C7B", "#C08F67", "#936943", "#66442B"];

    /* GLOBAL LETS */
    const canvasColor = canvasColors[Math.floor(rand() * canvasColors.length)];
    const circleColor = canvasCircleColors[Math.floor(rand() * canvasColors.length)];
    const skinColor = skinColors[Math.floor(rand() * skinColors.length)];
    const hairColor = hairColors[Math.floor(rand() * hairColors.length)];

    function drawCanvas() {
        ctx.fillStyle = canvasColor;
        ctx.fillRect(0, 0, width, height);
    }

    function drawCircle() {
        ctx.fillStyle = circleColor;

        ctx.arc(width / 2, height / 2, width / 2, 0, 2 * Math.PI);

        ctx.fill();
    }

    function drawFace(x, y, cell) {
        ctx.fillStyle = skinColor;

        ctx.beginPath();
        ctx.moveTo(x + cell * 2, y);
        ctx.lineTo(x + cell * 2, y + cell * 2);
        ctx.quadraticCurveTo(x + cell * 2, y + cell * 3, x + cell, y + cell * 3);
        ctx.lineTo(x + cell, y + cell * 4);
        ctx.lineTo(x, y + cell * 4);
        ctx.lineTo(x, y + cell);
        ctx.lineTo(x + cell, y);
        ctx.closePath();
        ctx.fill();
    }

    function hairStyleMohawk(x, y, cell) {
        ctx.fillStyle = hairColor;

        ctx.beginPath();
        ctx.moveTo(x, y + cell * 2);
        ctx.lineTo(x, y + cell);
        ctx.quadraticCurveTo(x, y, x + cell, y);
        ctx.lineTo(x + cell * 3, y);
        ctx.quadraticCurveTo(x + cell * 3, y + cell, x + cell * 2, y + cell);
        ctx.lineTo(x, y + cell);
        ctx.closePath();
        ctx.fill();
    }

    function hairStyleNormal(x, y, cell) {
        ctx.fillStyle = hairColor;

        ctx.beginPath();
        ctx.moveTo(x, y + cell * 2);
        ctx.lineTo(x, y + cell);
        ctx.quadraticCurveTo(x, y, x + cell, y);
        ctx.lineTo(x + cell * 3, y);
        ctx.quadraticCurveTo(x + cell * 3, y + cell, x + cell * 2, y + cell);
        ctx.lineTo(x + cell, y + cell);
        ctx.quadraticCurveTo(x + cell, y + cell * 2, x, y + cell * 2);
        ctx.closePath();
        ctx.fill();
    }

    function hairStyleSideburns(x, y, cell) {
        ctx.fillStyle = hairColor;

        ctx.beginPath();
        ctx.moveTo(x, y + cell * 2);
        ctx.lineTo(x, y + cell);
        ctx.quadraticCurveTo(x, y, x + cell, y);
        ctx.lineTo(x + cell * 3, y);
        ctx.quadraticCurveTo(x + cell * 3, y + cell, x + cell * 2, y + cell);
        ctx.lineTo(x + cell, y + cell);
        ctx.lineTo(x + cell, y + cell * 2);
        ctx.closePath();
        ctx.fill();
    }

    function hairStyleLong(x, y, cell) {
        ctx.fillStyle = hairColor;

        ctx.beginPath();
        ctx.moveTo(x, y + cell * 3);
        ctx.lineTo(x, y + cell);
        ctx.quadraticCurveTo(x, y, x + cell, y);
        ctx.lineTo(x + cell * 3, y);
        ctx.quadraticCurveTo(x + cell * 3, y + cell, x + cell * 2, y + cell);
        ctx.lineTo(x + cell, y + cell);
        ctx.lineTo(x + cell, y + cell * 2);
        ctx.quadraticCurveTo(x + cell, y + cell * 3, x, y + cell * 3);
        ctx.closePath();
        ctx.fill();
    }

    function hairStyleShort(x, y, cell) {
        ctx.fillStyle = hairColor;

        ctx.beginPath();
        ctx.moveTo(x, y + cell * 2);
        ctx.lineTo(x, y + cell);
        ctx.quadraticCurveTo(x, y, x + cell, y);
        ctx.lineTo(x + cell * 2, y);
        ctx.quadraticCurveTo(x + cell * 2, y + cell, x + cell, y + cell);
        ctx.quadraticCurveTo(x + cell, y + cell * 2, x, y + cell * 2);
        ctx.closePath();
        ctx.fill();
    }

    function hairStyleHippie(x, y, cell) {
        ctx.fillStyle = hairColor;

        ctx.beginPath();
        ctx.moveTo(x, y + cell * 2);
        ctx.lineTo(x, y + cell);
        ctx.quadraticCurveTo(x, y, x + cell, y);
        ctx.lineTo(x + cell * 2, y);
        ctx.quadraticCurveTo(x + cell * 2, y + cell, x + cell, y + cell);
        ctx.quadraticCurveTo(x + cell, y + cell * 2, x, y + cell * 2);
        ctx.closePath();
        ctx.moveTo(x + cell * 2, y);
        ctx.lineTo(x + cell * 3, y);
        ctx.quadraticCurveTo(x + cell * 3, y + cell, x + cell * 2, y + cell);
        ctx.closePath();
        ctx.moveTo(x + cell * 2, y + cell);
        ctx.lineTo(x + cell * 3, y + cell);
        ctx.quadraticCurveTo(x + cell * 3, y + cell * 2, x + cell * 2, y + cell * 2);
        ctx.closePath();
        ctx.fill();
    }

    function chooseHairstyle(paddingLeft, paddingTop, cell) {
        switch (Math.ceil(rand() * 6)) {
            case 1:
                hairStyleHippie(paddingLeft, paddingTop, cell);
                break;
            case 2:
                hairStyleNormal(paddingLeft, paddingTop, cell);
                break;
            case 3:
                hairStyleSideburns(paddingLeft, paddingTop, cell);
                break;
            case 4:
                hairStyleLong(paddingLeft, paddingTop, cell);
                break;
            case 5:
                hairStyleShort(paddingLeft, paddingTop, cell);
                break;
            case 6:
                hairStyleMohawk(paddingLeft, paddingTop, cell);
                break;
            default:
                break;
        }
    }

    drawCanvas();
    drawCircle();
    drawFace(paddingLeft, paddingTop, cell);
    chooseHairstyle(paddingLeft, paddingTop, cell);

    return canvas.toDataURL("image/jpeg").split(";base64,")[1];
}
