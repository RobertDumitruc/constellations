const widthInput = document.getElementById('canvas-width');
const heightInput = document.getElementById('canvas-height');
const dotXInput = document.getElementById('dot-x');
const dotYInput = document.getElementById('dot-y');
const titleInput = document.getElementById('dot-title');
const resultX = document.getElementById('result-x');
const resultY = document.getElementById('result-y');
const pixelReadout = document.getElementById('helper-pixel-readout');
const snippetOutput = document.getElementById('snippet-output');
const helperCanvas = document.getElementById('helper-canvas');
const helperDot = document.getElementById('helper-dot');
const copyButton = document.getElementById('copy-snippet-btn');

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}

function safeNumber(input, fallback) {
    const value = Number(input.value);
    return Number.isFinite(value) && value > 0 ? value : fallback;
}

function formatNormalized(value) {
    return value.toFixed(4);
}

function updateHelper() {
    const canvasWidth = safeNumber(widthInput, 1);
    const canvasHeight = safeNumber(heightInput, 1);
    const dotX = clamp(Number(dotXInput.value) || 0, 0, canvasWidth);
    const dotY = clamp(Number(dotYInput.value) || 0, 0, canvasHeight);
    const normalizedX = dotX / canvasWidth;
    const normalizedY = dotY / canvasHeight;
    const title = titleInput.value.trim() || 'Song Title';

    resultX.textContent = formatNormalized(normalizedX);
    resultY.textContent = formatNormalized(normalizedY);
    pixelReadout.textContent = `${dotX}px, ${dotY}px`;

    helperDot.style.left = `${normalizedX * 100}%`;
    helperDot.style.top = `${normalizedY * 100}%`;

    snippetOutput.textContent = `{ title: "${title}", x: ${formatNormalized(normalizedX)}, y: ${formatNormalized(normalizedY)} }`;
}

async function copySnippet() {
    try {
        await navigator.clipboard.writeText(snippetOutput.textContent);
        copyButton.textContent = 'Copied';
        window.setTimeout(() => {
            copyButton.textContent = 'Copy snippet';
        }, 1200);
    } catch (error) {
        copyButton.textContent = 'Copy failed';
        window.setTimeout(() => {
            copyButton.textContent = 'Copy snippet';
        }, 1200);
    }
}

[widthInput, heightInput, dotXInput, dotYInput, titleInput].forEach((input) => {
    input.addEventListener('input', updateHelper);
});

copyButton.addEventListener('click', copySnippet);

if (helperCanvas) {
    helperCanvas.addEventListener('click', (event) => {
        const rect = helperCanvas.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * safeNumber(widthInput, 1);
        const y = ((event.clientY - rect.top) / rect.height) * safeNumber(heightInput, 1);
        dotXInput.value = Math.round(x);
        dotYInput.value = Math.round(y);
        updateHelper();
    });
}

updateHelper();
