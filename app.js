
let constellations = {};

async function loadConstellations() {
    try {
        const response = await fetch('constellations.json?v=20260411');
        if (!response.ok) throw new Error(`Failed to load constellations: ${response.status}`);
        constellations = await response.json();
    } catch (error) {
        if (window.CONSTELLATIONS_DATA) {
            constellations = window.CONSTELLATIONS_DATA;
            return;
        }
        throw error;
    }
}

let currentAudio = null;
let sharedAudio = null;
let snippetTimeout = null;
let volumeFadeInterval = null;
let audioEnabled = false;
let activeConstellationKey = Object.keys(constellations)[0];
let currentView = null;
let playbackRequestId = 0;

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

function getLinkedSongIds(songId, constellation) {
    const linkedIds = new Set([songId]);
    constellation.songs.forEach((song) => {
        const parents = song.connectsTo
            ? (Array.isArray(song.connectsTo) ? song.connectsTo : [song.connectsTo])
            : [];
        if (song.id === songId || parents.includes(songId)) linkedIds.add(song.id);
        if (song.id === songId) parents.forEach((parentId) => linkedIds.add(parentId));
    });
    return linkedIds;
}

function getBezierPoint(t, sx, sy, cp1x, cp1y, cp2x, cp2y, ex, ey) {
    const inv = 1 - t;
    const x = (inv ** 3) * sx + 3 * (inv ** 2) * t * cp1x + 3 * inv * (t ** 2) * cp2x + (t ** 3) * ex;
    const y = (inv ** 3) * sy + 3 * (inv ** 2) * t * cp1y + 3 * inv * (t ** 2) * cp2y + (t ** 3) * ey;
    return { x, y };
}

function triggerSample(songId, sampleIndex) {
    const song = constellations[activeConstellationKey].songs.find((candidate) => candidate.id === songId);
    if (song && song.sound && song.sound[sampleIndex]) playSnippet(song.sound[sampleIndex], song.id);
}

window.triggerSample = triggerSample;

function buildAudioUrl(src) {
    return src
        .split('/')
        .map((segment) => encodeURIComponent(decodeURIComponent(segment)))
        .join('/');
}

function playSnippet(soundObject, songId = null) {
    if (!audioEnabled || !soundObject || !soundObject.src) return;
    clearTimeout(snippetTimeout);
    clearInterval(volumeFadeInterval);
    if (!sharedAudio) {
        sharedAudio = new Audio();
        sharedAudio.preload = 'auto';
        sharedAudio.volume = 0;
        currentAudio = sharedAudio;
    }
    if (currentAudio) currentAudio.pause();
    playbackRequestId += 1;
    const requestId = playbackRequestId;

    const { src, startTime = 0 } = soundObject;
    const snippetDurationSeconds = soundObject.durationSeconds || 10;
    const durationMs = snippetDurationSeconds * 1000;
    const audio = sharedAudio;
    currentAudio = audio;
    audio.volume = 0;

    let currentVolume = 0;
    const fadeDuration = 1000;
    const fadeSteps = 20;
    const volumeStep = 100 / fadeSteps;
    const stepInterval = fadeDuration / fadeSteps;
    let playbackStarted = false;

    const beginFadeInAndStopTimer = () => {
        if (playbackStarted || currentAudio !== audio || requestId !== playbackRequestId) return;
        playbackStarted = true;

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
    };

    const startPlayback = () => {
        if (currentAudio !== audio || requestId !== playbackRequestId) return;

        const duration = Number.isFinite(audio.duration) ? audio.duration : null;
        const safeStart = duration ? Math.min(startTime, Math.max(0, duration - 0.15)) : startTime;

        const playNow = () => {
            if (currentAudio !== audio || requestId !== playbackRequestId) return;
            audio.play()
                .then(beginFadeInAndStopTimer)
                .catch(() => {});
        };

        if (safeStart <= 0.05) {
            playNow();
            return;
        }

        let seekHandled = false;
        const finalizeSeek = () => {
            if (seekHandled || currentAudio !== audio || requestId !== playbackRequestId) return;
            seekHandled = true;
            audio.removeEventListener('seeked', finalizeSeek);
            playNow();
        };

        audio.addEventListener('seeked', finalizeSeek, { once: true });

        try {
            audio.currentTime = safeStart;
            window.setTimeout(finalizeSeek, 250);
        } catch (error) {
            playNow();
        }
    };

    const nextSrc = buildAudioUrl(src);
    if (!audio.src || !audio.src.endsWith(nextSrc)) {
        audio.src = nextSrc;
        audio.load();
    }

    if (audio.readyState >= 1 && audio.src && audio.src.endsWith(nextSrc)) {
        startPlayback();
    } else {
        audio.addEventListener('loadedmetadata', startPlayback, { once: true });
    }
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
        for (let i = 0; i < 260; i += 1) {
            const layer = Math.random() > 0.82 ? 'glow' : (Math.random() > 0.45 ? 'mid' : 'far');
            constellationState.stars.push({
                x: Math.random(),
                y: Math.random(),
                radius: layer === 'glow' ? (Math.random() * 2.2 + 1.2) : (layer === 'mid' ? Math.random() * 1.6 + 0.5 : Math.random() * 1.1 + 0.25),
                alpha: layer === 'glow' ? Math.random() * 0.22 + 0.08 : Math.random() * 0.42 + 0.12,
                velocity: layer === 'glow' ? Math.random() * 0.03 + 0.01 : Math.random() * 0.1 + 0.05,
                twinkle: Math.random() * Math.PI * 2,
                twinkleSpeed: Math.random() * 0.012 + 0.004,
                color: layer === 'glow'
                    ? (Math.random() > 0.55 ? 'rgba(110, 240, 255,' : 'rgba(255, 213, 126,')
                    : 'rgba(255, 255, 255,',
                layer
            });
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
        star.twinkle += star.twinkleSpeed;
        const pulse = (Math.sin(star.twinkle) + 1) / 2;
        ctx.beginPath();
        ctx.arc(star.x * canvas.width, star.y * canvas.height, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color} ${Math.min(0.9, star.alpha * (0.72 + pulse * 0.55))})`;
        if (star.layer === 'glow') {
            ctx.shadowColor = star.color.replace(/,$/, ', 0.35)');
            ctx.shadowBlur = 18;
        } else {
            ctx.shadowBlur = 0;
        }
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
    const linkedIds = hoveredStar ? getLinkedSongIds(hoveredStar.id, constellation) : null;

    constellation.songs.forEach((song) => {
        const x = song.x * canvas.width;
        const y = song.y * canvas.height;
        const isHovered = hoveredStar && hoveredStar.id === song.id;
        const isLinked = linkedIds ? linkedIds.has(song.id) : false;
        const isDimmed = hoveredStar && !isLinked;
        const radius = song.isSource ? 18 : song.isGuest ? 11 : 13;

        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, radius + (isHovered ? 12 : isLinked ? 8 : 5), 0, Math.PI * 2);
        ctx.fillStyle = song.isSource
            ? `rgba(255, 229, 151, ${isDimmed ? 0.05 : isLinked ? 0.18 : 0.12})`
            : `rgba(0, 234, 255, ${isDimmed ? 0.05 : isLinked ? 0.16 : 0.1})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        if (song.isGuest) {
            ctx.fillStyle = isDimmed ? 'rgba(223, 204, 255, 0.45)' : '#dfccff';
            ctx.shadowColor = isLinked ? 'rgba(210, 180, 255, 0.95)' : 'rgba(210, 180, 255, 0.7)';
        } else if (song.isSource) {
            ctx.fillStyle = isDimmed ? 'rgba(255, 244, 193, 0.48)' : '#fff4c1';
            ctx.shadowColor = isLinked ? 'rgba(255, 231, 165, 1)' : 'rgba(255, 231, 165, 0.85)';
        } else {
            ctx.fillStyle = isDimmed ? 'rgba(185, 247, 255, 0.42)' : '#b9f7ff';
            ctx.shadowColor = isLinked ? 'rgba(0, 255, 255, 1)' : 'rgba(0, 255, 255, 0.72)';
        }
        ctx.shadowBlur = isHovered ? 34 : isLinked ? 26 : isDimmed ? 8 : 18;
        ctx.fill();
        ctx.restore();

        if (isHovered || isLinked) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(x, y, radius + (isHovered ? 16 : 13), 0, Math.PI * 2);
            ctx.strokeStyle = isHovered ? 'rgba(144, 241, 255, 0.78)' : 'rgba(144, 241, 255, 0.34)';
            ctx.lineWidth = isHovered ? 2 : 1.4;
            ctx.setLineDash([4, 6]);
            ctx.stroke();
            ctx.restore();
        }

        ctx.save();
        ctx.fillStyle = isHovered ? 'rgba(245, 251, 255, 0.98)' : isDimmed ? 'rgba(203, 228, 236, 0.4)' : isLinked ? 'rgba(232, 248, 255, 0.95)' : 'rgba(203, 228, 236, 0.86)';
        ctx.font = song.isSource ? '700 14px Inter, sans-serif' : '600 13px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(song.title, x, y + radius + 26);
        ctx.fillStyle = isDimmed ? 'rgba(150, 184, 196, 0.35)' : 'rgba(150, 184, 196, 0.8)';
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
    const hoveredStar = constellationState.hoveredStar;
    const linkedIds = hoveredStar ? getLinkedSongIds(hoveredStar.id, constellation) : null;
    const now = performance.now() * 0.00022;

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
            const isLinked = linkedIds ? (linkedIds.has(startStar.id) && linkedIds.has(endStar.id)) : false;
            const isDimmed = hoveredStar && !isLinked;

            ctx.beginPath();
            ctx.moveTo(sx, sy);
            ctx.bezierCurveTo(sx, midY, ex, midY, ex, ey);
            ctx.strokeStyle = isLinked ? 'rgba(124, 238, 255, 0.62)' : isDimmed ? 'rgba(104, 231, 255, 0.1)' : 'rgba(104, 231, 255, 0.34)';
            ctx.lineWidth = isLinked ? 2.8 : 2;
            if (isLinked) {
                ctx.shadowColor = 'rgba(104, 231, 255, 0.24)';
                ctx.shadowBlur = 10;
            }
            ctx.stroke();
            ctx.shadowBlur = 0;

            if (isLinked && hoveredStar) {
                const tracerT = (now + ((startStar.id + endStar.id) * 0.13)) % 1;
                const tracer = getBezierPoint(tracerT, sx, sy, sx, midY, ex, midY, ex, ey);
                ctx.save();
                ctx.beginPath();
                ctx.arc(tracer.x, tracer.y, 4.2, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(204, 251, 255, 0.95)';
                ctx.shadowColor = 'rgba(104, 231, 255, 0.85)';
                ctx.shadowBlur = 16;
                ctx.fill();
                ctx.restore();
            }
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
      if (star.sound && star.sound.length === 1) playSnippet(star.sound[0], star.id);
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
          playbackRequestId += 1;
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
    if (song.sound && song.sound[0] && song.sound[0].src) playSnippet(song.sound[0], song.id);
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

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await loadConstellations();
        activeConstellationKey = Object.keys(constellations)[0] || '';
        initQrFallback();
        initIntro();
        initAudio();
        initHudToggle();
        handleView();
    } catch (error) {
        console.error(error);
    }
});
