
const constellations = {
    "Amen Break": {
        name: "Amen Break",
        songs: [
            { id: 1, title: "Amen, Brother", artist: "The Winstons", year: 1969, x: 0.5, y: 0.5, isSource: true, sample: "The foundational 6-second drum solo that became one of the most sampled breaks in history.", sound: [{ name: "Amen Brother", src: "audio/AmenBreak/The Winstons - Amen Brother - (320 Kbps).mp3", startTime: 86 }] },
            { id: 2, title: "Straight Outta Compton", artist: "N.W.A.", year: 1988, x: 0.3891, y: 0.2685, sample: "The iconic drum loop provides the track's raw backbone.", sound: [{ name: "Straight Outta compton", src: "audio/AmenBreak/N.W.A. - Straight Outta Compton (Official Music Video) - (256 Kbps).mp3", startTime: 4 }] },
            { id: 3, title: "King of the Beats", artist: "Mantronix", year: 1988, x: 0.6443, y: 0.2880, sample: "One of the earliest hip-hop tracks to popularize the Amen Break.", sound: [{ name: "King Of The Beats", src: "audio/AmenBreak/Mantronix - King Of The Beats - (320 Kbps).mp3", startTime: 19 }] },
            { id: 4, title: "I Desire", artist: "Salt-N-Pepa", year: 1986, x: 0.6089, y: 0.7, sample: "The break is pitched down and slowed down.", sound: [{ name: "I Desire", src: "audio/AmenBreak/Salt-N-Pepa - I Desire - (320 Kbps).mp3", startTime: 2 }, { name: "'Style Wars' Sample", src: "audio/AmenBreak/Salt-N-Pepa - I Desire - (320 Kbps).mp3", startTime: 41, durationSeconds: 10 }] },
            { id: 5, title: "Pigs", artist: "Tyler, The Creator", year: 2013, x: 0.4365, y: 0.7065, sample: "Samples both the Amen Break and Jay-Z's '99 Problems'.", sound: [{ name: "Pigs", src: "audio/AmenBreak/Tyler, The Creator - Pigs - (256 Kbps).mp3", startTime: 0 }, { name: "'99 Problems' Vocals", src: "audio/AmenBreak/Tyler, The Creator - Pigs - (256 Kbps).mp3", startTime: 249 }], },
            { id: 6, title: "Sugar On My Tongue", artist: "Tyler, The Creator", year: 2025, x: 0.7552, y: 0.3917, sample: "Features a sample from Mantronix's 'King of the Beats'.", sound: [{ name: "Sugar On My Tongue", src: "audio/AmenBreak/Tyler, The Creator - Sugar On My Tongue (audio) - (320 Kbps).mp3", startTime: 139 }], connectsTo: 3 },
            { id: 7, title: "The Mission", artist: "Special Ed", year: 1990, x: 0.6786, y: 0.5815, sample: "The lyrics of 'I desire' are featured in this song.", sound: [{ name: "The Mission", src: "audio/AmenBreak/Special Ed - The Mission - Legal - (320 Kbps).mp3", startTime: 2 }], connectsTo: 4 },
            { id: 8, title: "99 Problems", artist: "Jay-Z", year: 2003, x: 0.2896, y: 0.5417, sample: "Its drum pattern is iconic.", sound: [{ name: "99 Problems", src: "audio/AmenBreak/JAY-Z - 99 Problems - (320 Kbps).mp3", startTime: 0 }], isGuest: true, connectsTo: [1, 5] },
            { id: 9, title: "Don't You Worry Baby", artist: "Tyler, The Creator", year: 2025, x: 0.6594, y: 0.4500, sample: "The siren is found again in this song too", sound: [{ name: "Don't You Worry Baby", src: "audio/AmenBreak/Tyler, The Creator - Don't You Worry Baby (feat. Madison McFerrin) - (256 Kbps).mp3", startTime: 162 }], connectsTo: [3,6]},
            { id: 10, title: "Style Wars", artist: "Hijack", year: 1988, x: 0.6745, y: 0.7417, sample: "Samples Salt-N-Pepa's 'I Desire', with the vocals surfacing later in the track.", sound: [{ name: "Style Wars", src: "audio/AmenBreak/Hijack - Style Wars - (256 Kbps).mp3", startTime: 256, durationSeconds: 10 }], connectsTo: 4 }
        ]
    },
    "Funky Drummer": {
        name: "Funky Drummer",
        songs: [
            { id: 1, title: "Funky Drummer", artist: "James Brown", year: 1970, x: 0.5, y: 0.5287, isSource: true, sample: "Clyde Stubblefield's legendary drum break.", sound: [{ name: "Funky Drummer", src: "audio/FunkyDrummer/James Brown - Funky Drummer (Full Version, 1970) - HQ - (128 Kbps).mp3", startTime: 322, durationSeconds: 8 }] },
            { id: 2, title: "Rebel Without a Pause", artist: "Public Enemy", year: 1987, x: 0.3990, y: 0.7759, sample: "The break is chopped and layered to create a chaotic rhythm, with the lift from The JB's 'The Grunt' landing in the same moment.", sound: [{ name: "Rebel Without a Pause", src: "audio/FunkyDrummer/Public Enemy - Rebel Without A Pause - (256 Kbps).mp3", startTime: 12, durationSeconds: 10 }] },
            { id: 3, title: "Fight the Power", artist: "Public Enemy", year: 1989, x: 0.4240, y: 0.3630, sample: "Drives forward on a hard, urgent groove, with a sample from Syl Johnson's 'Different Strokes' landing later in the track.", sound: [{ name: "Fight the Power", src: "audio/FunkyDrummer/Public Enemy - Fight The Power - (256 Kbps).mp3", startTime: 13, durationSeconds: 10 }, { name: "'Different Strokes' Sample", src: "audio/FunkyDrummer/Public Enemy - Fight The Power - (256 Kbps).mp3", startTime: 140, durationSeconds: 10 }] },
            { id: 4, title: "The Originators", artist: "The Jaz", year: 1988, x: 0.6214, y: 0.2435, sample: "Pulls the break into late-'80s rap production with a crisp, propulsive loop and a nod to Last Ward.", sound: [{ name: "The Originators", src: "audio/FunkyDrummer/The Jaz - The Originators - (256 Kbps).mp3", startTime: 17, durationSeconds: 10 }, { name: "'Keep On Bumpin'' Sample", src: "audio/FunkyDrummer/The Jaz - The Originators - (256 Kbps).mp3", startTime: 28, durationSeconds: 10 }] },
            { id: 5, title: "Let Me Ride", artist: "Dr. Dre", year: 1992, x: 0.6448, y: 0.5880, sample: "Loops the Funky Drummer break into a laid-back G-funk cruise, with Parliament surfacing later in the arrangement.", sound: [{ name: "Let Me Ride", src: "audio/FunkyDrummer/Dr. Dre - Let Me Ride - (256 Kbps).mp3", startTime: 68, durationSeconds: 10 }, { name: "'Swing Down, Sweet Chariot' Sample", src: "audio/FunkyDrummer/Dr. Dre - Let Me Ride - (256 Kbps).mp3", startTime: 219, durationSeconds: 10 }] },
            { id: 6, title: "Powerpuff Girls Theme", artist: "Cartoon Network", year: 1998, x: 0.5177, y: 0.7157, sample: "Even the cartoon theme borrows the same breakbeat energy, showing how far the groove traveled.", sound: [{ name: "The Powerpuff Girls", src: "audio/FunkyDrummer/The Powerpuff Girls _ Theme Song _ Cartoon Network - (256 Kbps).mp3", startTime: 32, durationSeconds: 10 }] },
            { id: 7, title: "Keep On Bumpin' Before You Give Out Of Gas", artist: "Last Ward", year: 1974, x: 0.7208, y: 0.3630, sample: "A deep funk cut whose groove resurfaces in The Jaz's 'The Originators'.", sound: [{ name: "Keep On Bumpin'", src: "audio/FunkyDrummer/Last Ward - Keep On Bumpin' Before You Give Out Of Gas.wmv - (320 Kbps).mp3", startTime: 51, durationSeconds: 10 }], isGuest: true, connectsTo: 4 },
            { id: 8, title: "Swing Down, Sweet Chariot", artist: "Parliament", year: 1977, x: 0.8099, y: 0.5667, sample: "Its vocal and funk texture echo through Dr. Dre's 'Let Me Ride'.", sound: [{ name: "Swing Down, Sweet Chariot", src: "audio/FunkyDrummer/Parliament - Swing Down, Sweet Chariot (Live_1977) - (256 Kbps).mp3", startTime: 52, durationSeconds: 10 }], isGuest: true, connectsTo: 5 },
            { id: 9, title: "Different Strokes", artist: "Syl Johnson", year: 1967, x: 0.3547, y: 0.5, sample: "A famous break source that turns up inside 'Fight the Power'.", sound: [{ name: "Different Strokes", src: "audio/FunkyDrummer/Syl Johnson  Different Strokes - (320 Kbps).mp3", startTime: 27, durationSeconds: 10 }], isGuest: true, connectsTo: 3 },
            { id: 10, title: "The Grunt", artist: "The JB's", year: 1970, x: 0.2906, y: 0.6250, sample: "A foundational funk riff sampled by 'Rebel Without a Pause'.", sound: [{ name: "The Grunt", src: "audio/FunkyDrummer/The JB's-The Grunt. - (320 Kbps).mp3", startTime: 0, durationSeconds: 10 }], isGuest: true, connectsTo: 2 }
        ]
    },
    "I Shot The Sheriff": {
        name: "I Shot The Sheriff",
        songs: [
            { id: 1, title: "I Shot The Sheriff", artist: "Bob Marley & The Wailers", year: 1973, x: 0.5, y: 0.5, isSource: true, sample: "The original reggae classic, with multiple moments that echo through later hip-hop and R&B tracks.", sound: [{ name: "I Shot The Sheriff", src: "audio/IShotTheSheriff/Bob Marley & The Wailers - I Shot The Sheriff - (192 Kbps).mp3", startTime: 1, durationSeconds: 10 }, { name: "I Shot The Sheriff (2nd Sample)", src: "audio/IShotTheSheriff/Bob Marley & The Wailers - I Shot The Sheriff - (192 Kbps).mp3", startTime: 46, durationSeconds: 7 }] },
            { id: 2, title: "What's the 411?", artist: "Mary J. Blige feat. Grand Puba", year: 1992, x: 0.31, y: 0.34, sample: "Reworks the song's hook and reggae feel into an early '90s R&B and hip-hop crossover.", sound: [{ name: "What's the 411?", src: "audio/IShotTheSheriff/What's the 411_-Mary J. Blige feat. Grand Puba - (256 Kbps).mp3", startTime: 54, durationSeconds: 10 }] },
            { id: 3, title: "Reflection Of Perfection (Radio Mix)", artist: "M.C. Jewel with D.J. Screen", year: 1990, x: 0.69, y: 0.3, sample: "Lifts the source into a rap setting, keeping the original's melodic pull front and center.", sound: [{ name: "Reflection Of Perfection", src: "audio/IShotTheSheriff/M.C. Jewel with D.J. Screen - Reflection Of Perfection (Radio Mix) - (256 Kbps).mp3", startTime: 166, durationSeconds: 10 }] },
            { id: 4, title: "Loc Shot The Sheriff", artist: "C-Loc ft. SPM", year: 2000, x: 0.74, y: 0.57, sample: "Turns the source into a Southern rap variation, borrowing the familiar title and melodic identity.", sound: [{ name: "Loc Shot The Sheriff", src: "audio/IShotTheSheriff/C-Loc - Loc Shot The Sheriff ft. SPM - (256 Kbps).mp3", startTime: 48, durationSeconds: 10 }] },
            { id: 5, title: "He Shot Me", artist: "Rapsody", year: 2024, x: 0.58, y: 0.76, sample: "Flips the narrative point of view while nodding back to the original Marley song.", sound: [{ name: "He Shot Me", src: "audio/IShotTheSheriff/Rapsody - He Shot Me - Lyric Video - (256 Kbps).mp3", startTime: 31, durationSeconds: 10 }] },
            { id: 6, title: "Lyrical .44", artist: "Method Man, Redman, & Damian 'Jr. Gong' Marley", year: 2003, x: 0.28, y: 0.68, sample: "Brings the song's phrasing and reggae lineage into a later rap collaboration with Damian Marley in the mix.", sound: [{ name: "Lyrical .44", src: "audio/IShotTheSheriff/Method Man, Redman, & Damian _Jr. Gong_ Marley - Lyrical .44 - (256 Kbps).mp3", startTime: 2, durationSeconds: 10 }] }
        ]
    }
  };

let currentAudio = null;
let snippetTimeout = null;
let volumeFadeInterval = null;
let audioEnabled = false;
let activeConstellationKey = Object.keys(constellations)[0];
let currentView = null;

const constellationState = {
    canvas: null,
    ctx: null,
    tooltip: null,
    stars: [],
    hoveredStar: null,
    lastHoveredStarId: null,
    tooltipHideTimeout: null,
    animationId: null,
    typewriterTimeout: null,
    typewriterIndex: 0,
    initialized: false,
    resizeHandler: null,
    tooltipEnterHandler: null,
    tooltipLeaveHandler: null,
    isTooltipHovered: false
};

const mobileTreeState = {
    initialized: false,
    navInitialized: false,
    headerToggleInitialized: false,
    canvas: null,
    ctx: null,
    infoPanel: null,
    positions: new Map(),
    bounds: null,
    selectedSongId: null,
    panX: 0,
    panY: 0,
    pointerActive: false,
    dragMoved: false,
    lastPointerX: 0,
    lastPointerY: 0,
    activePointerId: null
};

function triggerSample(songId, sampleIndex) {
    const song = constellations[activeConstellationKey].songs.find((candidate) => candidate.id === songId);
    if (song && song.sound && song.sound[sampleIndex]) playSnippet(song.sound[sampleIndex]);
}

window.triggerSample = triggerSample;

function playSnippet(soundObject) {
    if (!audioEnabled || !soundObject || !soundObject.src) return;
    clearTimeout(snippetTimeout);
    clearInterval(volumeFadeInterval);
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    const { src, startTime = 0 } = soundObject;
    const snippetDurationSeconds = soundObject.durationSeconds || 10;
    const durationMs = snippetDurationSeconds * 1000;
    const audio = new Audio(src);
    currentAudio = audio;
    audio.preload = 'auto';
    audio.volume = 0;

    const startPlayback = () => {
        if (currentAudio !== audio) return;
        audio.currentTime = startTime;
    audio.play().catch(() => {});
    };

    if (audio.readyState >= 1) {
        startPlayback();
    } else {
        audio.addEventListener('loadedmetadata', startPlayback, { once: true });
    }

    let currentVolume = 0;
    const fadeDuration = 1000;
    const fadeSteps = 20;
    const volumeStep = 100 / fadeSteps;
    const stepInterval = fadeDuration / fadeSteps;

    volumeFadeInterval = setInterval(() => {
        currentVolume += volumeStep;
        if (currentVolume >= 100) {
            currentVolume = 100;
            clearInterval(volumeFadeInterval);
        }
        if (currentAudio === audio) currentAudio.volume = currentVolume / 100;
    }, stepInterval);

    snippetTimeout = setTimeout(() => {
        clearInterval(volumeFadeInterval);
        volumeFadeInterval = setInterval(() => {
            currentVolume -= volumeStep;
            if (currentVolume <= 0) {
                currentVolume = 0;
                if (currentAudio === audio) {
                    currentAudio.pause();
                    currentAudio.currentTime = 0;
                }
                clearInterval(volumeFadeInterval);
            }
            if (currentAudio === audio) currentAudio.volume = currentVolume / 100;
        }, stepInterval);
    }, durationMs - fadeDuration);
}

function initAudio() {
    const introButton = document.getElementById('intro-enter-btn');
    const intro = document.getElementById('site-intro');
    if (!introButton || !intro) return;

    introButton.addEventListener('click', () => {
        audioEnabled = true;
        intro.classList.add('is-hidden');
    }, { once: true });
}

function initIntro() {
    return;
}

function initHudToggle() {
    const button = document.getElementById('hud-toggle');
    if (!button) return;

    const syncLabel = () => {
        const hidden = document.body.classList.contains('hud-hidden');
        button.textContent = hidden ? 'Show HUD' : 'Hide HUD';
        button.setAttribute('aria-pressed', String(hidden));
    };

    button.addEventListener('click', () => {
        document.body.classList.toggle('hud-hidden');
        syncLabel();
    });

    syncLabel();
}

function initNav(navId, onSelect) {
    const navContainer = document.getElementById(navId);
    navContainer.innerHTML = '';
    Object.keys(constellations).forEach((key) => {
        const button = document.createElement('button');
        button.textContent = constellations[key].name;
        button.className = 'nav-button bg-black/20 text-cyan-200 py-2 px-4 rounded-full text-sm';
        if (key === activeConstellationKey) button.classList.add('active');
        button.addEventListener('click', () => {
            activeConstellationKey = key;
            document.querySelectorAll('.nav-button').forEach((btn) => btn.classList.remove('active'));
            document.querySelectorAll(`#constellation-nav-desktop button, #${navId} button`).forEach((btn) => {
                if (btn.textContent === constellations[key].name) btn.classList.add('active');
            });
            onSelect(key);
        });
        navContainer.appendChild(button);
    });
}

function initConstellations() {
    const view = document.getElementById('constellations-view');
    view.style.display = 'block';
    constellationState.canvas = document.getElementById('constellation-canvas');
    constellationState.ctx = constellationState.canvas.getContext('2d');
    constellationState.tooltip = document.getElementById('hover-tooltip');
    const desktopTrackCount = document.getElementById('desktop-track-count');
    const constellation = constellations[activeConstellationKey];
    if (desktopTrackCount && constellation) desktopTrackCount.textContent = `${constellation.songs.length} tracks`;

    if (!constellationState.initialized) {
        initNav('constellation-nav-desktop', (key) => {
            activeConstellationKey = key;
            const activeConstellation = constellations[activeConstellationKey];
            if (desktopTrackCount && activeConstellation) desktopTrackCount.textContent = `${activeConstellation.songs.length} tracks`;
        });

        constellationState.canvas.addEventListener('mousemove', handleConstellationMouseMove);
        constellationState.tooltipEnterHandler = () => {
            constellationState.isTooltipHovered = true;
            clearTimeout(constellationState.tooltipHideTimeout);
        };
        constellationState.tooltipLeaveHandler = () => {
            constellationState.isTooltipHovered = false;
            hideConstellationTooltipAndStopAudio();
        };
        constellationState.tooltip.addEventListener('mouseenter', constellationState.tooltipEnterHandler);
        constellationState.tooltip.addEventListener('mouseleave', constellationState.tooltipLeaveHandler);

        constellationState.stars = [];
        for (let i = 0; i < 200; i += 1) {
            constellationState.stars.push({ x: Math.random(), y: Math.random(), radius: Math.random() * 1.5, alpha: Math.random() * 0.5 + 0.2, velocity: Math.random() * 0.1 + 0.05 });
        }

        constellationState.resizeHandler = () => {
            constellationState.canvas.width = window.innerWidth;
            constellationState.canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', constellationState.resizeHandler);
        constellationState.initialized = true;
    }

    constellationState.resizeHandler();
    animateConstellation();
}

function animateConstellation() {
    const { ctx, canvas, stars } = constellationState;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach((star) => {
        star.y -= star.velocity / 1000;
        if (star.y < 0) star.y = 1;
        ctx.beginPath();
        ctx.arc(star.x * canvas.width, star.y * canvas.height, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
    });
    drawConstellationLines();
    drawConstellationStars();
    constellationState.animationId = requestAnimationFrame(animateConstellation);
}
function drawConstellationStars() {
    const { ctx, canvas, hoveredStar } = constellationState;
    const constellation = constellations[activeConstellationKey];
    if (!constellation) return;

    constellation.songs.forEach((song) => {
        const x = song.x * canvas.width;
        const y = song.y * canvas.height;
        const isHovered = hoveredStar && hoveredStar.id === song.id;
        const radius = song.isSource ? 18 : song.isGuest ? 11 : 13;

        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, radius + (isHovered ? 10 : 5), 0, Math.PI * 2);
        ctx.fillStyle = song.isSource ? 'rgba(255, 229, 151, 0.12)' : 'rgba(0, 234, 255, 0.1)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        if (song.isGuest) {
            ctx.fillStyle = '#dfccff';
            ctx.shadowColor = 'rgba(210, 180, 255, 0.7)';
        } else if (song.isSource) {
            ctx.fillStyle = '#fff4c1';
            ctx.shadowColor = 'rgba(255, 231, 165, 0.85)';
        } else {
            ctx.fillStyle = '#b9f7ff';
            ctx.shadowColor = 'rgba(0, 255, 255, 0.72)';
        }
        ctx.shadowBlur = isHovered ? 28 : 18;
        ctx.fill();
        ctx.restore();

        if (isHovered) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(x, y, radius + 16, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(144, 241, 255, 0.7)';
            ctx.lineWidth = 2;
            ctx.setLineDash([4, 6]);
            ctx.stroke();
            ctx.restore();
        }

        ctx.save();
        ctx.fillStyle = isHovered ? 'rgba(245, 251, 255, 0.98)' : 'rgba(203, 228, 236, 0.86)';
        ctx.font = song.isSource ? '700 14px Inter, sans-serif' : '600 13px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(song.title, x, y + radius + 26);
        ctx.fillStyle = 'rgba(150, 184, 196, 0.8)';
        ctx.font = '500 11px Inter, sans-serif';
        ctx.fillText(String(song.year), x, y + radius + 42);
        ctx.restore();
    });
}

function drawConstellationLines() {
    const { ctx, canvas } = constellationState;
    const constellation = constellations[activeConstellationKey];
    if (!constellation) return;
    const sourceStar = constellation.songs.find((song) => song.isSource);
    if (!sourceStar) return;

    constellation.songs.forEach((endStar) => {
        if (endStar.isSource) return;
        const startStarIds = endStar.connectsTo ? (Array.isArray(endStar.connectsTo) ? endStar.connectsTo : [endStar.connectsTo]) : [sourceStar.id];
        startStarIds.forEach((startStarId) => {
            const startStar = constellation.songs.find((song) => song.id === startStarId);
            if (!startStar) return;
            const sx = startStar.x * canvas.width;
            const sy = startStar.y * canvas.height;
            const ex = endStar.x * canvas.width;
            const ey = endStar.y * canvas.height;
            const midY = sy + (ey - sy) * 0.45;
            ctx.beginPath();
            ctx.moveTo(sx, sy);
            ctx.bezierCurveTo(sx, midY, ex, midY, ex, ey);
            ctx.strokeStyle = 'rgba(104, 231, 255, 0.34)';
            ctx.lineWidth = 2;
            ctx.stroke();
        });
    });
}

function handleConstellationMouseMove(e) {
    if (!audioEnabled) return;
    const rect = constellationState.canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const star = getStarAtPos(mouseX, mouseY);
    if (star) {
        clearTimeout(constellationState.tooltipHideTimeout);
        showConstellationTooltip(star);
    } else if (!constellationState.isTooltipHovered) {
        clearTimeout(constellationState.tooltipHideTimeout);
        constellationState.tooltipHideTimeout = setTimeout(() => {
            if (!constellationState.isTooltipHovered) hideConstellationTooltipAndStopAudio();
        }, 350);
    }
}

function getStarAtPos(x, y) {
    const constellation = constellations[activeConstellationKey];
    if (!constellation) return null;
    for (const star of constellation.songs) {
        const starX = star.x * window.innerWidth;
        const starY = star.y * window.innerHeight;
        const radius = (star.isSource ? 18 : star.isGuest ? 11 : 13) + 12;
        if (Math.hypot(starX - x, starY - y) < radius) return star;
    }
    return null;
}

function showConstellationTooltip(star) {
    const { tooltip } = constellationState;
    constellationState.isTooltipHovered = false;
    if (star.id === constellationState.lastHoveredStarId) return;
    constellationState.hoveredStar = star;

    let tooltipHTML = `<h3 class="text-xl font-bold text-cyan-300">${star.title}</h3><p>${star.artist}</p><p class="text-sm text-gray-400 mt-2">Released: ${star.year}</p><p id="typewriter-output" class="text-sm text-gray-300 mt-2 typewriter-text"></p>`;
    if (star.sound && star.sound.length > 1) {
        tooltipHTML += '<div class="mt-2 flex flex-col gap-2">';
        star.sound.forEach((sample, index) => {
            tooltipHTML += `<button onclick="triggerSample(${star.id}, ${index})" class="sample-button">Play: ${sample.name}</button>`;
        });
        tooltipHTML += '</div>';
    }

    tooltip.innerHTML = tooltipHTML;
    typeWriter(star.sample, document.getElementById('typewriter-output'));
    if (star.sound && star.sound.length === 1) playSnippet(star.sound[0]);
    constellationState.lastHoveredStarId = star.id;

    let x = star.x * window.innerWidth + 20;
    let y = star.y * window.innerHeight;
    if (x + tooltip.offsetWidth > window.innerWidth - 20) x = star.x * window.innerWidth - tooltip.offsetWidth - 20;
    if (y + tooltip.offsetHeight > window.innerHeight - 20) y = window.innerHeight - tooltip.offsetHeight - 20;
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
    tooltip.classList.add('active');
}

function hideConstellationTooltipAndStopAudio() {
    if (constellationState.isTooltipHovered) return;
    constellationState.hoveredStar = null;
    constellationState.tooltip.classList.remove('active');
    if (constellationState.lastHoveredStarId !== null) {
        if (constellationState.typewriterTimeout) clearTimeout(constellationState.typewriterTimeout);
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
        clearTimeout(snippetTimeout);
        clearInterval(volumeFadeInterval);
        constellationState.lastHoveredStarId = null;
    }
}

function typeWriter(text, element) {
    if (!element) return;
    if (constellationState.typewriterTimeout) clearTimeout(constellationState.typewriterTimeout);
    constellationState.typewriterIndex = 0;
    element.innerHTML = '';
    function type() {
        if (constellationState.typewriterIndex < text.length) {
            element.innerHTML += text.charAt(constellationState.typewriterIndex);
            constellationState.typewriterIndex += 1;
            constellationState.typewriterTimeout = setTimeout(type, 30);
        }
    }
    type();
}

function getMobileTreeSafeArea(rect = mobileTreeState.canvas ? mobileTreeState.canvas.getBoundingClientRect() : null) {
    const infoPanelHeight = mobileTreeState.infoPanel ? mobileTreeState.infoPanel.offsetHeight : 220;
    const bottomInset = Math.max(160, infoPanelHeight + 28);
    if (!rect) return { top: 40, bottom: bottomInset, left: 24, right: 24, height: 0, width: 0 };
    return { top: 40, bottom: bottomInset, left: 24, right: 24, width: rect.width, height: rect.height };
}

function initMobileHeaderToggle() {
    const view = document.getElementById('card-deck-view');
    const toggle = document.getElementById('mobile-header-toggle');
    if (!view || !toggle) return;

    if (!mobileTreeState.headerToggleInitialized) {
        toggle.addEventListener('click', () => {
            const isCollapsed = view.classList.toggle('mobile-header-collapsed');
            toggle.setAttribute('aria-expanded', String(!isCollapsed));

            window.setTimeout(() => {
                if (currentView === 'mobile') {
                    resizeMobileTreeCanvas();
                    renderMobileTree();
                }
            }, 360);
        });
        mobileTreeState.headerToggleInitialized = true;
    }

    if (window.innerWidth <= 768) {
        view.classList.add('mobile-header-collapsed');
        toggle.setAttribute('aria-expanded', 'false');
    }
}

function initCardDeck() {
    const view = document.getElementById('card-deck-view');
    view.style.display = 'flex';
    mobileTreeState.canvas = document.getElementById('mobile-tree-canvas');
    mobileTreeState.ctx = mobileTreeState.canvas.getContext('2d');
    mobileTreeState.infoPanel = document.getElementById('mobile-tree-info');
    initMobileHeaderToggle();

    if (!mobileTreeState.navInitialized) {
        initNav('constellation-nav-mobile', buildCardDeck);
        mobileTreeState.navInitialized = true;
    }

    if (!mobileTreeState.initialized) {
        mobileTreeState.canvas.addEventListener('pointerdown', handleMobileTreePointerDown);
        mobileTreeState.canvas.addEventListener('pointermove', handleMobileTreePointerMove);
        mobileTreeState.canvas.addEventListener('pointerup', handleMobileTreePointerUp);
        mobileTreeState.canvas.addEventListener('pointercancel', handleMobileTreePointerUp);
        mobileTreeState.initialized = true;
    }

    buildCardDeck(activeConstellationKey);
}

function buildCardDeck(key) {
    activeConstellationKey = key;
    const constellation = constellations[key];
    const deckCount = document.getElementById('mobile-deck-count');
    if (deckCount) deckCount.textContent = `${constellation.songs.length} tracks`;

    const selectedSongStillExists = constellation.songs.some((song) => song.id === mobileTreeState.selectedSongId);
    const sourceSong = constellation.songs.find((song) => song.isSource) || constellation.songs[0];
    if (!selectedSongStillExists) mobileTreeState.selectedSongId = sourceSong ? sourceSong.id : null;

    buildMobileTreeLayout(constellation);
    resizeMobileTreeCanvas();
    renderMobileTree();
    updateMobileTreeInfo(getMobileTreeSelectedSong());
}
function buildMobileTreeLayout(constellation) {
    const songs = constellation.songs;
    const sourceSong = songs.find((song) => song.isSource) || songs[0];
    const depthMap = new Map();

    const getParentIds = (song) => {
        if (song.isSource) return [];
        if (!song.connectsTo) return sourceSong ? [sourceSong.id] : [];
        return Array.isArray(song.connectsTo) ? song.connectsTo : [song.connectsTo];
    };

    const getDepth = (song) => {
        if (depthMap.has(song.id)) return depthMap.get(song.id);
        if (song.isSource) {
            depthMap.set(song.id, 0);
            return 0;
        }
        const parentDepths = getParentIds(song)
            .map((parentId) => songs.find((candidate) => candidate.id === parentId))
            .filter(Boolean)
            .map(getDepth);
        const depth = (parentDepths.length ? Math.max(...parentDepths) : 0) + 1;
        depthMap.set(song.id, depth);
        return depth;
    };

    songs.forEach(getDepth);
    const levels = new Map();
    songs.forEach((song) => {
        const depth = depthMap.get(song.id) || 0;
        if (!levels.has(depth)) levels.set(depth, []);
        levels.get(depth).push(song);
    });

    const orderedDepths = Array.from(levels.keys()).sort((a, b) => a - b);
    const positions = new Map();
    const horizontalSpacing = 220;
    const verticalSpacing = 190;

    orderedDepths.forEach((depth) => {
        const row = levels.get(depth);
        row.sort((a, b) => {
            const parentCenterA = averageParentX(a, positions, getParentIds);
            const parentCenterB = averageParentX(b, positions, getParentIds);
            if (parentCenterA !== parentCenterB) return parentCenterA - parentCenterB;
            return a.year - b.year;
        });

        const rowWidth = (row.length - 1) * horizontalSpacing;
        row.forEach((song, index) => {
            positions.set(song.id, {
                x: index * horizontalSpacing - rowWidth / 2,
                y: depth * verticalSpacing
            });
        });
    });

    mobileTreeState.positions = positions;
    mobileTreeState.bounds = getMobileTreeBounds(positions);
    mobileTreeState.panX = 0;
    mobileTreeState.panY = 20;
}

function averageParentX(song, positions, getParentIds) {
    const parentPositions = getParentIds(song).map((parentId) => positions.get(parentId)).filter(Boolean);
    if (!parentPositions.length) return 0;
    return parentPositions.reduce((sum, position) => sum + position.x, 0) / parentPositions.length;
}

function getMobileTreeBounds(positions) {
    const values = Array.from(positions.values());
    if (!values.length) return { minX: -100, maxX: 100, minY: -100, maxY: 100 };
    return {
        minX: Math.min(...values.map((position) => position.x)),
        maxX: Math.max(...values.map((position) => position.x)),
        minY: Math.min(...values.map((position) => position.y)),
        maxY: Math.max(...values.map((position) => position.y))
    };
}

function resizeMobileTreeCanvas() {
    if (!mobileTreeState.canvas) return;
    const rect = mobileTreeState.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    mobileTreeState.canvas.width = rect.width * dpr;
    mobileTreeState.canvas.height = rect.height * dpr;
    mobileTreeState.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    clampMobileTreePan();
}

function clampMobileTreePan() {
    if (!mobileTreeState.canvas || !mobileTreeState.bounds) return;
    const rect = mobileTreeState.canvas.getBoundingClientRect();
    const safeArea = getMobileTreeSafeArea(rect);
    const marginX = 100;
    const topMargin = 80;
    const bottomMargin = 90;
    const originX = rect.width / 2;
    const originY = safeArea.top + 80;
    const minPanX = rect.width - originX - mobileTreeState.bounds.maxX - marginX;
    const maxPanX = -mobileTreeState.bounds.minX + marginX - originX;
    const minPanY = (rect.height - safeArea.bottom) - originY - mobileTreeState.bounds.maxY - bottomMargin;
    const maxPanY = safeArea.top - originY - mobileTreeState.bounds.minY + topMargin;
    mobileTreeState.panX = Math.min(maxPanX, Math.max(minPanX, mobileTreeState.panX));
    mobileTreeState.panY = Math.min(maxPanY, Math.max(minPanY, mobileTreeState.panY));
}

function renderMobileTree() {
    if (!mobileTreeState.ctx || !mobileTreeState.canvas) return;
    const ctx = mobileTreeState.ctx;
    const rect = mobileTreeState.canvas.getBoundingClientRect();
    const safeArea = getMobileTreeSafeArea(rect);
    ctx.clearRect(0, 0, rect.width, rect.height);

    const originX = rect.width / 2 + mobileTreeState.panX;
    const originY = safeArea.top + 80 + mobileTreeState.panY;
    drawMobileTreeGrid(ctx, rect, safeArea, originX, originY);
    drawMobileTreeConnections(ctx, originX, originY);
    drawMobileTreeNodes(ctx, originX, originY, safeArea);
}

function drawMobileTreeGrid(ctx, rect, safeArea, originX, originY) {
    ctx.save();
    ctx.strokeStyle = 'rgba(120, 205, 230, 0.06)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.rect(safeArea.left, safeArea.top, rect.width - safeArea.left - safeArea.right, rect.height - safeArea.top - safeArea.bottom);
    ctx.clip();
    for (let x = -800; x <= 800; x += 120) {
        ctx.beginPath();
        ctx.moveTo(originX + x, safeArea.top);
        ctx.lineTo(originX + x, rect.height - safeArea.bottom);
        ctx.stroke();
    }
    for (let y = -120; y <= 1200; y += 120) {
        ctx.beginPath();
        ctx.moveTo(safeArea.left, originY + y);
        ctx.lineTo(rect.width - safeArea.right, originY + y);
        ctx.stroke();
    }
    ctx.restore();
}

function drawMobileTreeConnections(ctx, originX, originY) {
    const constellation = constellations[activeConstellationKey];
    if (!constellation) return;
    const sourceSong = constellation.songs.find((song) => song.isSource);

    constellation.songs.forEach((song) => {
        if (song.isSource) return;
        const targetPosition = mobileTreeState.positions.get(song.id);
        const parentIds = song.connectsTo ? (Array.isArray(song.connectsTo) ? song.connectsTo : [song.connectsTo]) : [sourceSong.id];
        parentIds.forEach((parentId) => {
            const parentPosition = mobileTreeState.positions.get(parentId);
            if (!parentPosition || !targetPosition) return;
            const sx = originX + parentPosition.x;
            const sy = originY + parentPosition.y;
            const ex = originX + targetPosition.x;
            const ey = originY + targetPosition.y;
            const midY = sy + (ey - sy) * 0.45;
            ctx.beginPath();
            ctx.moveTo(sx, sy);
            ctx.bezierCurveTo(sx, midY, ex, midY, ex, ey);
            ctx.strokeStyle = 'rgba(104, 231, 255, 0.34)';
            ctx.lineWidth = 2;
            ctx.stroke();
        });
    });
}

function drawMobileTreeNodes(ctx, originX, originY, safeArea) {
    const constellation = constellations[activeConstellationKey];
    constellation.songs.forEach((song) => {
        const position = mobileTreeState.positions.get(song.id);
        if (!position) return;
        const x = originX + position.x;
        const y = originY + position.y;
        const isSelected = mobileTreeState.selectedSongId === song.id;
        const radius = song.isSource ? 18 : song.isGuest ? 11 : 13;
        if (y < safeArea.top - 70 || y > (safeArea.height - safeArea.bottom) + 30) return;

        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, radius + (isSelected ? 10 : 5), 0, Math.PI * 2);
        ctx.fillStyle = song.isSource ? 'rgba(255, 229, 151, 0.12)' : 'rgba(0, 234, 255, 0.1)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        if (song.isGuest) {
            ctx.fillStyle = '#dfccff';
            ctx.shadowColor = 'rgba(210, 180, 255, 0.7)';
        } else if (song.isSource) {
            ctx.fillStyle = '#fff4c1';
            ctx.shadowColor = 'rgba(255, 231, 165, 0.85)';
        } else {
            ctx.fillStyle = '#b9f7ff';
            ctx.shadowColor = 'rgba(0, 255, 255, 0.72)';
        }
        ctx.shadowBlur = isSelected ? 28 : 18;
        ctx.fill();
        ctx.restore();

        if (isSelected) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(x, y, radius + 16, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(144, 241, 255, 0.7)';
            ctx.lineWidth = 2;
            ctx.setLineDash([4, 6]);
            ctx.stroke();
            ctx.restore();
        }

        ctx.save();
        ctx.fillStyle = isSelected ? 'rgba(245, 251, 255, 0.98)' : 'rgba(203, 228, 236, 0.86)';
        ctx.font = song.isSource ? '700 13px Inter, sans-serif' : '600 12px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(song.title, x, y + radius + 24);
        ctx.fillStyle = 'rgba(150, 184, 196, 0.8)';
        ctx.font = '500 11px Inter, sans-serif';
        ctx.fillText(String(song.year), x, y + radius + 40);
        ctx.restore();
    });
}
function handleMobileTreePointerDown(e) {
    mobileTreeState.pointerActive = true;
    mobileTreeState.dragMoved = false;
    mobileTreeState.activePointerId = e.pointerId;
    mobileTreeState.lastPointerX = e.clientX;
    mobileTreeState.lastPointerY = e.clientY;
    mobileTreeState.canvas.setPointerCapture(e.pointerId);
}

function handleMobileTreePointerMove(e) {
    if (!mobileTreeState.pointerActive || e.pointerId !== mobileTreeState.activePointerId) return;
    const dx = e.clientX - mobileTreeState.lastPointerX;
    const dy = e.clientY - mobileTreeState.lastPointerY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) mobileTreeState.dragMoved = true;
    mobileTreeState.panX += dx;
    mobileTreeState.panY += dy;
    mobileTreeState.lastPointerX = e.clientX;
    mobileTreeState.lastPointerY = e.clientY;
    clampMobileTreePan();
    renderMobileTree();
}

function handleMobileTreePointerUp(e) {
    if (mobileTreeState.activePointerId !== e.pointerId) return;
    mobileTreeState.pointerActive = false;
    if (!mobileTreeState.dragMoved) {
        const song = getMobileTreeSongAtPoint(e.clientX, e.clientY);
        if (song) selectMobileTreeSong(song);
    }
    mobileTreeState.activePointerId = null;
}

function getMobileTreeSongAtPoint(clientX, clientY) {
    if (!mobileTreeState.canvas) return null;
    const rect = mobileTreeState.canvas.getBoundingClientRect();
    const safeArea = getMobileTreeSafeArea(rect);
    const localX = clientX - rect.left;
    const localY = clientY - rect.top;
    if (localY > rect.height - safeArea.bottom || localY < safeArea.top) return null;
    const originX = rect.width / 2 + mobileTreeState.panX;
    const originY = safeArea.top + 80 + mobileTreeState.panY;
    const constellation = constellations[activeConstellationKey];

    for (const song of constellation.songs) {
        const position = mobileTreeState.positions.get(song.id);
        if (!position) continue;
        const x = originX + position.x;
        const y = originY + position.y;
        const radius = (song.isSource ? 18 : song.isGuest ? 11 : 13) + 12;
        if (Math.hypot(localX - x, localY - y) <= radius) return song;
    }
    return null;
}

function selectMobileTreeSong(song) {
    mobileTreeState.selectedSongId = song.id;
    renderMobileTree();
    updateMobileTreeInfo(song);
    if (song.sound && song.sound[0] && song.sound[0].src) playSnippet(song.sound[0]);
}

function getMobileTreeSelectedSong() {
    const constellation = constellations[activeConstellationKey];
    return constellation.songs.find((song) => song.id === mobileTreeState.selectedSongId) || constellation.songs[0];
}

function updateMobileTreeInfo(song) {
    if (!mobileTreeState.infoPanel) return;
    if (!song) {
        mobileTreeState.infoPanel.innerHTML = '<p class="mobile-tree-empty">Tap a star to open its sample notes.</p>';
        return;
    }

    const label = song.isSource ? 'Source Song' : song.isGuest ? 'Guest Link' : 'Connected Song';
      const actions = song.sound && song.sound.length > 1
        ? song.sound.map((sample, sampleIndex) => {
            const disabled = sample.src ? '' : 'disabled';
            return `<button onclick="triggerSample(${song.id}, ${sampleIndex})" class="sample-button" ${disabled}>${sample.name}</button>`;
          }).join('')
          : '';

    mobileTreeState.infoPanel.innerHTML = `
        <p class="info-eyebrow">${label}</p>
        <h3>${song.title}</h3>
        <p class="info-artist">${song.artist}</p>
        <p class="info-year">Released ${song.year}</p>
        <p class="info-copy">${song.sample}</p>
        <div class="mobile-tree-actions">${actions}</div>
    `;
    if (currentView === 'mobile') {
        resizeMobileTreeCanvas();
        renderMobileTree();
    }
}

function initQrFallback() {
    const qrImage = document.getElementById('qr-image');
    const qrFallbackLink = document.getElementById('qr-fallback-link');
    if (!qrImage || !qrFallbackLink) return;
    qrImage.addEventListener('error', () => {
        qrImage.style.display = 'none';
        qrFallbackLink.classList.add('active');
    }, { once: true });
}

function handleView() {
    const newView = window.innerWidth > 768 ? 'desktop' : 'mobile';
    if (newView === currentView) return;
    currentView = newView;

    if (currentView === 'desktop') {
        document.getElementById('card-deck-view').style.display = 'none';
        if (constellationState.animationId) cancelAnimationFrame(constellationState.animationId);
        initConstellations();
    } else {
        document.getElementById('constellations-view').style.display = 'none';
        if (constellationState.animationId) cancelAnimationFrame(constellationState.animationId);
        initCardDeck();
    }
}

window.addEventListener('resize', handleView);
window.addEventListener('resize', () => {
    if (currentView === 'mobile') {
        resizeMobileTreeCanvas();
        renderMobileTree();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    initQrFallback();
    initIntro();
    initAudio();
    initHudToggle();
    handleView();
});
