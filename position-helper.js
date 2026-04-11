const fields = {
    songId: document.getElementById('song-id'),
    songYear: document.getElementById('song-year'),
    canvasWidth: document.getElementById('canvas-width'),
    canvasHeight: document.getElementById('canvas-height'),
    dotX: document.getElementById('dot-x'),
    dotY: document.getElementById('dot-y'),
    title: document.getElementById('dot-title'),
    artist: document.getElementById('song-artist'),
    audioSrc: document.getElementById('audio-src'),
    clipName: document.getElementById('clip-name'),
    clipStart: document.getElementById('clip-start'),
    clipDuration: document.getElementById('clip-duration'),
    connectsTo: document.getElementById('connects-to'),
    sampleCopy: document.getElementById('sample-copy'),
    isSource: document.getElementById('is-source'),
    isGuest: document.getElementById('is-guest')
};

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

function positiveNumber(input, fallback) {
    const value = Number(input.value);
    return Number.isFinite(value) && value > 0 ? value : fallback;
}

function parseOptionalNumber(input) {
    const value = Number(input.value);
    return Number.isFinite(value) ? value : null;
}

function formatNormalized(value) {
    return value.toFixed(4);
}

function parseConnectsTo(value) {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const parts = trimmed.split(',').map((part) => Number(part.trim())).filter((part) => Number.isFinite(part));
    if (!parts.length) return null;
    return parts.length === 1 ? parts[0] : parts;
}

function buildEntry() {
    const canvasWidth = positiveNumber(fields.canvasWidth, 1);
    const canvasHeight = positiveNumber(fields.canvasHeight, 1);
    const dotX = clamp(Number(fields.dotX.value) || 0, 0, canvasWidth);
    const dotY = clamp(Number(fields.dotY.value) || 0, 0, canvasHeight);
    const normalizedX = dotX / canvasWidth;
    const normalizedY = dotY / canvasHeight;
    const connectsTo = parseConnectsTo(fields.connectsTo.value);

    const entry = {
        id: positiveNumber(fields.songId, 1),
        title: fields.title.value.trim() || 'Song Title',
        artist: fields.artist.value.trim() || 'Artist',
        year: fields.songYear.value.trim() || 'Unknown',
        x: Number(formatNormalized(normalizedX)),
        y: Number(formatNormalized(normalizedY)),
        sample: fields.sampleCopy.value.trim() || 'Sample description.',
        sound: [
            {
                name: fields.clipName.value.trim() || 'Clip',
                src: fields.audioSrc.value.trim() || 'audio/path.mp3',
                startTime: parseOptionalNumber(fields.clipStart) ?? 0,
                durationSeconds: parseOptionalNumber(fields.clipDuration) ?? 10
            }
        ]
    };

    if (fields.isSource.checked) entry.isSource = true;
    if (fields.isGuest.checked) entry.isGuest = true;
    if (connectsTo !== null) entry.connectsTo = connectsTo;

    return { entry, dotX, dotY, normalizedX, normalizedY };
}

function updateHelper() {
    const { entry, dotX, dotY, normalizedX, normalizedY } = buildEntry();

    resultX.textContent = formatNormalized(normalizedX);
    resultY.textContent = formatNormalized(normalizedY);
    pixelReadout.textContent = `${dotX}px, ${dotY}px`;
    helperDot.style.left = `${normalizedX * 100}%`;
    helperDot.style.top = `${normalizedY * 100}%`;
    snippetOutput.textContent = `${JSON.stringify(entry, null, 2)},`;
}

async function copySnippet() {
    try {
        await navigator.clipboard.writeText(snippetOutput.textContent);
        copyButton.textContent = 'Copied';
        window.setTimeout(() => {
            copyButton.textContent = 'Copy entry';
        }, 1200);
    } catch (error) {
        copyButton.textContent = 'Copy failed';
        window.setTimeout(() => {
            copyButton.textContent = 'Copy entry';
        }, 1200);
    }
}

Object.values(fields).forEach((input) => {
    input.addEventListener('input', updateHelper);
    input.addEventListener('change', updateHelper);
});

copyButton.addEventListener('click', copySnippet);

if (helperCanvas) {
    helperCanvas.addEventListener('click', (event) => {
        const rect = helperCanvas.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * positiveNumber(fields.canvasWidth, 1);
        const y = ((event.clientY - rect.top) / rect.height) * positiveNumber(fields.canvasHeight, 1);
        fields.dotX.value = Math.round(x);
        fields.dotY.value = Math.round(y);
        updateHelper();
    });
}

updateHelper();
