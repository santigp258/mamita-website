// ==================== ERROR HANDLER GLOBAL ====================
// Prevenir que errores no manejados causen recargas en móvil
window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('Error:', msg, 'at', url, lineNo);
    return true; // Prevenir comportamiento por defecto
};

window.addEventListener('unhandledrejection', function(event) {
    console.error('Promise rejection:', event.reason);
    event.preventDefault();
});

// ==================== CONFIGURACIÓN ====================
// CDN de Cloudinary
const CDN_BASE = "https://res.cloudinary.com/dus5lm40j/image/upload/v1770259370/mamita/";

// Helper para construir URLs con CDN (lazy - solo genera string cuando se llama)
const asset = (path) => CDN_BASE + path;

// ==================== CONFIGURACIÓN DE FOTOS ====================
// Solo almacenamos los nombres de archivo, no las URLs completas
// Las URLs se generan bajo demanda para reducir memoria inicial

const photoNames = {
    cumpleanos50: ["foto_01.jpg", "foto_02.jpg", "foto_03.jpg", "foto_04.jpg", "foto_05.jpg", "foto_06.jpg"],
    momentosFamilia: ["foto_07.jpg", "foto_08.jpg", "foto_12.jpg", "foto_13.jpg"],
    vidaCotidiana: ["foto_09.jpg", "foto_10.jpg", "foto_11.jpg"],
    diaMadres: ["foto_14.jpg", "foto_15.jpg", "foto_16.jpg", "foto_17.jpg", "foto_18.jpg", "foto_19.jpg", "foto_20.jpg", "foto_21.jpg", "foto_22.jpg", "foto_23.jpg", "foto_24.jpg", "foto_25.jpg"],
    momentosTranquilos: ["foto_26.jpg", "foto_27.jpg", "foto_28.jpg", "foto_29.jpg"],
    cumpleanosHija: ["foto_30.jpg", "foto_31.jpg"],
    besosHijosNietos: ["foto_32.jpg", "foto_33.jpg", "foto_34.jpg"],
    momentosPaz: ["foto_35.jpg"],
    celebraciones: ["foto_36.jpg", "foto_37.jpg", "foto_38.jpg"],
    reunionesFamiliares: ["photo_1.jpg", "photo_2.jpg", "photo_4.jpg", "photo_8.jpg"],
    familiaCompleta: ["photo_3.jpg", "photo_7.jpg"],
    conNieto: ["photo_9.jpg"],
    selfieFamiliar: ["foto_39.jpg"],
    quinceanos: ["foto_40.jpg"],
    generaciones: ["foto_41.jpg", "foto_42.jpg"],
    ultimaFoto: ["ultima.jpeg"]
};

const photoMessages = {
    cumpleanos50: "Siempre celebrando a tus hijos, nietos y toda tu familia",
    momentosFamilia: "Los momentos más simples eran los más especiales",
    vidaCotidiana: "Trabajadora incansable, siempre atenta a todo",
    diaMadres: "Feliz Día de las Madres - Tu alegría era contagiosa",
    momentosTranquilos: "En tu hogar siempre hubo paz y amor",
    cumpleanosHija: "Tu abrazo era el refugio más seguro",
    besosHijosNietos: "Tus besos y cariño para hijos y nietos, amor eterno",
    momentosPaz: "Tu paz interior reflejaba tu fe inquebrantable",
    celebraciones: "Cada celebración era una bendición",
    reunionesFamiliares: "Reunida con toda la familia, el mejor regalo",
    familiaCompleta: "Rodeada de hijos, nietos y toda tu descendencia",
    conNieto: "El amor de abuela, incondicional y eterno",
    selfieFamiliar: "Toda la familia unida, tu mayor alegría",
    quinceanos: "Presente en cada momento especial de tus nietas",
    generaciones: "Tres generaciones unidas por tu amor",
    ultimaFoto: "Hasta siempre, mamita querida"
};

// Helper para obtener fotos de una categoría (genera URLs bajo demanda)
const getPhotos = (category) => photoNames[category].map(name => asset(name));
const getMessage = (category) => photoMessages[category];

// Foto principal para el slide final
const mainPhoto = asset("main_photo.jpg");

// Array global para almacenar todas las fotos del slideshow (para lightbox)
let allPhotos = [];

// ==================== GENERACIÓN DINÁMICA DE SLIDES ====================
function generateSlides() {
    const container = document.getElementById('slidesContainer');
    let slideIndex = 0;
    let html = '';

    // Slide 0: Intro
    html += `
        <div class="slide intro-slide" data-slide="${slideIndex}" data-type="intro">
            <div class="intro-dove">🕊️</div>
            <div class="intro-memorial-text">En Amorosa Memoria</div>
            <div class="intro-name">Ana del Carmen Pulgarín</div>
            <div class="intro-dates">
                <span>2 de Agosto, 1956</span>
                <span class="heart">♡</span>
                <span>28 de Enero, 2026</span>
            </div>
            <div class="decorative-flowers">✿ ❀ ✿</div>
        </div>
    `;
    slideIndex++;

    // Función helper para agregar fotos al array global
    function addPhotosToGlobal(photos) {
        photos.forEach(photo => {
            if (!allPhotos.includes(photo)) {
                allPhotos.push(photo);
            }
        });
    }

    // SECCIÓN 1: Cumpleaños 50 - Grid de 6 fotos (2x3)
    let photos = getPhotos('cumpleanos50');
    addPhotosToGlobal(photos);
    html += createGridSlide(photos, getMessage('cumpleanos50'), slideIndex, 'grid-6');
    slideIndex++;

    // SECCIÓN 2: Momentos en familia - Grid de 4 fotos (2x2)
    photos = getPhotos('momentosFamilia');
    addPhotosToGlobal(photos);
    html += createGridSlide(photos, getMessage('momentosFamilia'), slideIndex, 'grid-4');
    slideIndex++;

    // SECCIÓN 3: Vida cotidiana - 3 fotos horizontal
    photos = getPhotos('vidaCotidiana');
    addPhotosToGlobal(photos);
    html += createGridSlide(photos, getMessage('vidaCotidiana'), slideIndex, 'grid-3');
    slideIndex++;

    // SECCIÓN 4: Día de las Madres - Collage grande (12 fotos en 2 slides)
    const diaMadresAll = getPhotos('diaMadres');
    const diaMadresFirst = diaMadresAll.slice(0, 6);
    const diaMadresSecond = diaMadresAll.slice(6);

    addPhotosToGlobal(diaMadresFirst);
    html += createGridSlide(diaMadresFirst, "Día de las Madres - Tu sonrisa lo iluminaba todo", slideIndex, 'grid-6');
    slideIndex++;

    addPhotosToGlobal(diaMadresSecond);
    html += createGridSlide(diaMadresSecond, getMessage('diaMadres'), slideIndex, 'grid-6');
    slideIndex++;

    // Slide de mensaje/dedicatoria (mitad del slideshow)
    html += `
        <div class="slide message-slide" data-slide="${slideIndex}" data-type="message">
            <div class="message-flower">🌸</div>
            <div class="message-content">
                <p class="message-line">En tu corazón siempre hubo amor y respeto<br>por tu familia y amigos.</p>
                <p class="message-line">Gracias por tus enseñanzas, por acercarnos a Dios<br>y por tu amor incondicional.</p>
                <div class="message-signature">Te amamos, madre querida,<br>mamita de nuestro corazón</div>
            </div>
        </div>
    `;
    slideIndex++;

    // SECCIÓN 5: Momentos tranquilos - 4 fotos
    photos = getPhotos('momentosTranquilos');
    addPhotosToGlobal(photos);
    html += createGridSlide(photos, getMessage('momentosTranquilos'), slideIndex, 'grid-4');
    slideIndex++;

    // SECCIÓN 6: Cumpleaños con hija - 2 fotos lado a lado
    photos = getPhotos('cumpleanosHija');
    addPhotosToGlobal(photos);
    html += createGridSlide(photos, getMessage('cumpleanosHija'), slideIndex, 'grid-2');
    slideIndex++;

    // SECCIÓN 7: Besos con hijos/nietos - 3 fotos
    photos = getPhotos('besosHijosNietos');
    addPhotosToGlobal(photos);
    html += createGridSlide(photos, getMessage('besosHijosNietos'), slideIndex, 'grid-3');
    slideIndex++;

    // SECCIÓN 8: Momento de paz - 1 foto destacada
    photos = getPhotos('momentosPaz');
    addPhotosToGlobal(photos);
    html += createSingleSlide(photos[0], getMessage('momentosPaz'), slideIndex);
    slideIndex++;

    // SECCIÓN 9: Más celebraciones - 3 fotos
    photos = getPhotos('celebraciones');
    addPhotosToGlobal(photos);
    html += createGridSlide(photos, getMessage('celebraciones'), slideIndex, 'grid-3');
    slideIndex++;

    // SECCIÓN 10: Reuniones familiares - 4 fotos webp
    photos = getPhotos('reunionesFamiliares');
    addPhotosToGlobal(photos);
    html += createGridSlide(photos, getMessage('reunionesFamiliares'), slideIndex, 'grid-4');
    slideIndex++;

    // SECCIÓN 11: Familia completa al aire libre - 2 fotos webp
    photos = getPhotos('familiaCompleta');
    addPhotosToGlobal(photos);
    html += createGridSlide(photos, getMessage('familiaCompleta'), slideIndex, 'grid-2');
    slideIndex++;

    // SECCIÓN 12: Con nieto - 1 foto destacada webp
    photos = getPhotos('conNieto');
    addPhotosToGlobal(photos);
    html += createSingleSlide(photos[0], getMessage('conNieto'), slideIndex);
    slideIndex++;

    // SECCIÓN 13: Selfie familiar - 1 foto destacada
    photos = getPhotos('selfieFamiliar');
    addPhotosToGlobal(photos);
    html += createSingleSlide(photos[0], getMessage('selfieFamiliar'), slideIndex);
    slideIndex++;

    // SECCIÓN 14: Quinceaños - 1 foto especial
    photos = getPhotos('quinceanos');
    addPhotosToGlobal(photos);
    html += createSingleSlide(photos[0], getMessage('quinceanos'), slideIndex);
    slideIndex++;

    // SECCIÓN 15: Generaciones - 2 fotos
    photos = getPhotos('generaciones');
    addPhotosToGlobal(photos);
    html += createGridSlide(photos, getMessage('generaciones'), slideIndex, 'grid-2');
    slideIndex++;

    // SECCIÓN 16: Última foto especial
    photos = getPhotos('ultimaFoto');
    addPhotosToGlobal(photos);
    html += createSingleSlide(photos[0], getMessage('ultimaFoto'), slideIndex);
    slideIndex++;

    // Slide del versículo
    html += `
        <div class="slide verse-slide" data-slide="${slideIndex}" data-type="verse">
            <div class="verse-container">
                <div class="verse-icon">✝</div>
                <p class="verse-text">"Estimada es a Jehová<br>la muerte de sus santos."</p>
                <p class="verse-reference">— Salmos 116:15</p>
            </div>
        </div>
    `;
    slideIndex++;

    // Slide "Por siempre en nuestros corazones"
    html += `
        <div class="slide final-slide" data-slide="${slideIndex}" data-type="final">
            <div class="final-portrait">
                <div class="portrait-glow"></div>
                <div class="portrait-frame">
                    <img src="${mainPhoto}" alt="Ana del Carmen Pulgarín">
                </div>
            </div>
            <div class="final-eternal">Por siempre en nuestros corazones</div>
            <div class="final-name">Ana del Carmen Pulgarín</div>
            <div class="final-dates">1956 ♡ 2026</div>
            <div class="final-flowers">🌹</div>
        </div>
    `;
    slideIndex++;

    // Slide de galería - último slide (con lazy loading real)
    // Usamos data-src en vez de src para evitar cargar todas las imágenes
    let galleryPhotosHtml = allPhotos.map((src, i) => `
        <div class="gallery-thumb" data-photo-src="${src}" data-photo-index="${i}">
            <img data-src="${src}" alt="Recuerdo ${i + 1}" loading="lazy">
        </div>
    `).join('');

    html += `
        <div class="slide gallery-slide" data-slide="${slideIndex}" data-type="gallery">
            <div class="gallery-header">
                <div class="gallery-icon">📷</div>
                <div class="gallery-title">Galería de Recuerdos</div>
                <div class="gallery-subtitle">${allPhotos.length} momentos especiales</div>
            </div>
            <div class="gallery-thumbs-container">
                <div class="gallery-thumbs" id="galleryThumbs">
                    ${galleryPhotosHtml}
                </div>
            </div>
            <div class="gallery-hint">Toca cualquier foto para verla en grande</div>
        </div>
    `;

    container.innerHTML = html;

    return slideIndex + 1;
}

function createGridSlide(photos, message, index, gridType) {
    let photosHtml = photos.map((src, i) => `
        <div class="grid-photo" style="--delay: ${i * 0.15}s" data-photo-src="${src}">
            <img src="${src}" alt="Recuerdo ${i + 1}">
        </div>
    `).join('');

    return `
        <div class="slide photo-slide ${gridType}-slide" data-slide="${index}" data-type="grid">
            <div class="photo-grid ${gridType}">
                ${photosHtml}
            </div>
            <div class="photo-message">${message}</div>
        </div>
    `;
}

function createSingleSlide(src, message, index) {
    return `
        <div class="slide photo-slide single-slide" data-slide="${index}" data-type="single">
            <div class="photo-wrapper">
                <div class="photo-container">
                    <div class="photo-frame"><div class="photo-inner" data-photo-src="${src}">
                        <img src="${src}" alt="Recuerdo">
                    </div></div>
                </div>
                <div class="photo-message">${message}</div>
            </div>
        </div>
    `;
}

// ==================== PANTALLA DE INICIO ====================
function createAutoplayOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'autoplay-overlay';
    overlay.id = 'autoplayOverlay';
    overlay.innerHTML = `
        <div class="autoplay-content">
            <div class="autoplay-dove">🕊️</div>
            <div class="autoplay-title">En Memoria de Ana del Carmen</div>
            <div class="autoplay-subtitle">1956 — 2026</div>
            <button class="autoplay-btn" id="autoplayBtn">▶ Comenzar</button>
            <div class="autoplay-hint">Presiona para iniciar el memorial con música</div>
        </div>
    `;
    document.body.appendChild(overlay);

    document.getElementById('autoplayBtn').addEventListener('click', () => {
        overlay.classList.add('hidden');
        setTimeout(() => {
            overlay.remove();
            // Iniciar elementos flotantes solo después de interacción
            startFloatingElements();
            startSlideshow();
        }, 800);
    });
}

// ==================== DETECCIÓN MÓVIL ====================
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;

// ==================== FLOATING ELEMENTS ====================
const floatingContainer = document.getElementById('floatingElements');

// Limitar elementos flotantes para evitar crashes en móvil
const MAX_PETALS = isMobile ? 3 : 8;
const MAX_BOKEHS = isMobile ? 5 : 15;
let petalCount = 0;
let bokehCount = 0;

function createPetal() {
    if (petalCount >= MAX_PETALS) return;
    petalCount++;

    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.style.left = Math.random() * 100 + '%';
    petal.style.top = '-5%';
    floatingContainer.appendChild(petal);

    const duration = 18000 + Math.random() * 12000;
    const startX = parseFloat(petal.style.left);
    const amplitude = 40 + Math.random() * 80;
    const startTime = Date.now();

    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / duration;
        if (progress >= 1) {
            petal.remove();
            petalCount--;
            return;
        }

        const y = -5 + (progress * 115);
        const x = startX + Math.sin(elapsed * 0.001) * amplitude;
        const opacity = progress < 0.1 ? progress * 10 : progress > 0.9 ? (1 - progress) * 10 : 1;

        petal.style.top = y + '%';
        petal.style.left = x + '%';
        petal.style.transform = 'rotate(' + (elapsed * 0.05) + 'deg)';
        petal.style.opacity = opacity * 0.5;
        requestAnimationFrame(animate);
    }
    animate();
}

function createBokeh() {
    if (bokehCount >= MAX_BOKEHS) return;
    bokehCount++;

    const bokeh = document.createElement('div');
    bokeh.className = 'bokeh';
    const size = 30 + Math.random() * 60;
    bokeh.style.width = size + 'px';
    bokeh.style.height = size + 'px';
    bokeh.style.background = 'radial-gradient(circle, rgba(232,196,196,0.3) 0%, transparent 70%)';
    bokeh.style.left = Math.random() * 100 + '%';
    bokeh.style.top = '110%';
    floatingContainer.appendChild(bokeh);

    const duration = 20000 + Math.random() * 15000;
    const startX = parseFloat(bokeh.style.left);
    const startTime = Date.now();

    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / duration;
        if (progress >= 1) {
            bokeh.remove();
            bokehCount--;
            return;
        }

        const y = 110 - (progress * 130);
        const x = startX + Math.sin(elapsed * 0.0008) * 30;
        const opacity = progress < 0.15 ? progress / 0.15 : progress > 0.85 ? (1 - progress) / 0.15 : 1;

        bokeh.style.top = y + '%';
        bokeh.style.left = x + '%';
        bokeh.style.opacity = opacity * 0.5;
        requestAnimationFrame(animate);
    }
    animate();
}

// Variables para los intervalos (se inician después de interacción del usuario)
let petalInterval = null;
let bokehInterval = null;

function startFloatingElements() {
    if (petalInterval || bokehInterval) return; // Ya iniciados

    // Intervalos más largos en móvil para ahorrar recursos
    petalInterval = setInterval(createPetal, isMobile ? 5000 : 2500);
    bokehInterval = setInterval(createBokeh, isMobile ? 2000 : 800);
}

// ==================== SLIDESHOW ====================
let totalSlides, slides, progressBar, progressFill, progressTooltip;
let currentSlideEl, totalSlidesEl, playBtn, hideBtn, controlsPanel, showControlsBtn;
let bgMusic, muteBtn, lightbox, lightboxImg, lightboxClose, lightboxPrev, lightboxNext, lightboxCounter;

try {
    totalSlides = generateSlides();
    slides = document.querySelectorAll('.slide');
    progressBar = document.getElementById('progressBar');
    progressFill = document.getElementById('progressFill');
    progressTooltip = document.getElementById('progressTooltip');
    currentSlideEl = document.getElementById('currentSlide');
    totalSlidesEl = document.getElementById('totalSlides');
    playBtn = document.getElementById('playBtn');
    hideBtn = document.getElementById('hideBtn');
    controlsPanel = document.getElementById('controlsPanel');
    showControlsBtn = document.getElementById('showControlsBtn');
    bgMusic = document.getElementById('bgMusic');
    muteBtn = document.getElementById('muteBtn');

    // Lightbox elements
    lightbox = document.getElementById('lightbox');
    lightboxImg = document.getElementById('lightboxImg');
    lightboxClose = document.getElementById('lightboxClose');
    lightboxPrev = document.getElementById('lightboxPrev');
    lightboxNext = document.getElementById('lightboxNext');
    lightboxCounter = document.getElementById('lightboxCounter');

    if (totalSlidesEl) totalSlidesEl.textContent = totalSlides;
} catch (e) {
    console.error('Error inicializando slideshow:', e);
}

let currentSlide = 0;
let isPlaying = false;
let slideTimer = null;
let audioTimeOnPause = 0; // Para sincronizar audio

// Lightbox state
let currentLightboxIndex = 0;
let currentSlidePhotos = [];

// ==================== DURACIONES ====================
function getSlideDuration(slideEl) {
    const type = slideEl.dataset.type;
    switch(type) {
        case 'intro': return 10000;
        case 'message': return 20000;
        case 'verse': return 18000;
        case 'final': return 25000;
        case 'gallery': return 30000; // Más tiempo para la galería
        case 'single': return 12000;
        case 'grid':
            const gridClass = slideEl.querySelector('.photo-grid')?.className || '';
            if (gridClass.includes('grid-6')) return 18000;
            if (gridClass.includes('grid-4')) return 15000;
            if (gridClass.includes('grid-3')) return 14000;
            if (gridClass.includes('grid-2')) return 12000;
            return 12000;
        default: return 12000;
    }
}

// ==================== SLIDE FUNCTIONS ====================
function clearAllAnimations() {
    document.querySelectorAll('.show').forEach(el => el.classList.remove('show'));
}

function showSlide(index) {
    if (!slides || !slides.length) return;

    slides.forEach(s => s.classList.remove('active'));
    clearAllAnimations();

    if (slides[index]) {
        slides[index].classList.add('active');
    }
    if (currentSlideEl) currentSlideEl.textContent = index + 1;
    if (progressFill) progressFill.style.width = ((index + 1) / totalSlides * 100) + '%';

    setTimeout(() => animateSlide(index), 100);
}

function animateSlide(index) {
    if (!slides || !slides[index]) return;
    const slide = slides[index];
    const type = slide.dataset?.type;

    if (type === 'intro') {
        setTimeout(() => slide.querySelector('.intro-dove')?.classList.add('show'), 100);
        setTimeout(() => slide.querySelector('.intro-memorial-text')?.classList.add('show'), 1200);
        setTimeout(() => slide.querySelector('.intro-name')?.classList.add('show'), 2200);
        setTimeout(() => slide.querySelector('.intro-dates')?.classList.add('show'), 3800);
        setTimeout(() => slide.querySelector('.decorative-flowers')?.classList.add('show'), 5200);
    }
    else if (type === 'message') {
        setTimeout(() => slide.querySelector('.message-flower')?.classList.add('show'), 100);
        setTimeout(() => slide.querySelectorAll('.message-line')[0]?.classList.add('show'), 1500);
        setTimeout(() => slide.querySelectorAll('.message-line')[1]?.classList.add('show'), 5000);
        setTimeout(() => slide.querySelector('.message-signature')?.classList.add('show'), 9000);
    }
    else if (type === 'verse') {
        setTimeout(() => slide.querySelector('.verse-icon')?.classList.add('show'), 100);
        setTimeout(() => slide.querySelector('.verse-text')?.classList.add('show'), 1500);
        setTimeout(() => slide.querySelector('.verse-reference')?.classList.add('show'), 5000);
    }
    else if (type === 'final') {
        setTimeout(() => slide.querySelector('.final-portrait')?.classList.add('show'), 100);
        setTimeout(() => slide.querySelector('.final-eternal')?.classList.add('show'), 2500);
        setTimeout(() => slide.querySelector('.final-name')?.classList.add('show'), 4500);
        setTimeout(() => slide.querySelector('.final-dates')?.classList.add('show'), 6000);
        setTimeout(() => slide.querySelector('.final-flowers')?.classList.add('show'), 7500);
    }
    else if (type === 'grid') {
        const photos = slide.querySelectorAll('.grid-photo');
        photos.forEach((photo, i) => {
            setTimeout(() => photo.classList.add('show'), 200 + (i * 200));
        });
        const msgDelay = 200 + (photos.length * 200) + 500;
        setTimeout(() => slide.querySelector('.photo-message')?.classList.add('show'), msgDelay);
    }
    else if (type === 'single') {
        setTimeout(() => slide.querySelector('.photo-container')?.classList.add('show'), 100);
        setTimeout(() => slide.querySelector('.photo-message')?.classList.add('show'), 1800);
    }
    else if (type === 'gallery') {
        setTimeout(() => slide.querySelector('.gallery-header')?.classList.add('show'), 100);
        setTimeout(() => slide.querySelector('.gallery-thumbs-container')?.classList.add('show'), 800);
        setTimeout(() => slide.querySelector('.gallery-hint')?.classList.add('show'), 1500);
    }
}

function nextSlide() {
    if (!slides || !slides.length) return;

    if (currentSlide < totalSlides - 1) {
        currentSlide++;
        showSlide(currentSlide);
        if (slides[currentSlide]) {
            slideTimer = setTimeout(nextSlide, getSlideDuration(slides[currentSlide]));
        }
    } else {
        isPlaying = false;
        if (playBtn) playBtn.textContent = '↺ REINICIAR';
    }
}

function startSlideshow() {
    if (!slides || !slides.length) return;

    isPlaying = true;
    if (playBtn) playBtn.textContent = '⏸ PAUSAR';

    // Si es reinicio, comenzar desde 0
    if (currentSlide === totalSlides - 1) {
        currentSlide = 0;
        audioTimeOnPause = 0;
    }

    // Sincronizar audio - continuar desde donde se pausó
    if (bgMusic) {
        bgMusic.currentTime = audioTimeOnPause;
        bgMusic.volume = 1;
        bgMusic.play().catch(e => console.log('Audio:', e));
    }

    showSlide(currentSlide);
    if (slides[currentSlide]) {
        slideTimer = setTimeout(nextSlide, getSlideDuration(slides[currentSlide]));
    }
}

function pauseSlideshow() {
    isPlaying = false;
    if (playBtn) playBtn.textContent = '▶ CONTINUAR';
    clearTimeout(slideTimer);

    // Guardar posición del audio para sincronización
    if (bgMusic) {
        audioTimeOnPause = bgMusic.currentTime;
        bgMusic.pause();
    }
}

// ==================== PROGRESS BAR INTERACTIVO ====================
if (progressBar) {
    progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        const targetSlide = Math.floor(percent * totalSlides);

        // Pausar si está reproduciendo
        if (isPlaying) {
            pauseSlideshow();
        }

        // Navegar al slide
        currentSlide = Math.max(0, Math.min(targetSlide, totalSlides - 1));
        showSlide(currentSlide);
    });

    progressBar.addEventListener('mousemove', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        const targetSlide = Math.floor(percent * totalSlides) + 1;

        if (progressTooltip) {
            progressTooltip.textContent = `Slide ${Math.max(1, Math.min(targetSlide, totalSlides))}`;
            progressTooltip.style.left = `${percent * 100}%`;
        }
    });
}

// ==================== LIGHTBOX ====================
function openLightbox(photoSrc) {
    // Pausar slideshow al abrir lightbox
    if (isPlaying) {
        pauseSlideshow();
    }

    // Obtener fotos del slide actual
    const activeSlide = document.querySelector('.slide.active');
    currentSlidePhotos = [];

    // Si es el slide de galería, usar todas las fotos
    if (activeSlide.dataset.type === 'gallery') {
        currentSlidePhotos = [...allPhotos];
    } else {
        activeSlide.querySelectorAll('[data-photo-src]').forEach(el => {
            currentSlidePhotos.push(el.dataset.photoSrc);
        });
    }

    // Encontrar índice de la foto clickeada
    currentLightboxIndex = currentSlidePhotos.indexOf(photoSrc);
    if (currentLightboxIndex === -1) currentLightboxIndex = 0;

    updateLightboxImage();
    lightbox.classList.add('active');
}

function closeLightbox() {
    lightbox.classList.remove('active');
}

function updateLightboxImage() {
    lightboxImg.src = currentSlidePhotos[currentLightboxIndex];
    lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${currentSlidePhotos.length}`;

    // Mostrar/ocultar navegación si solo hay una foto
    lightboxPrev.style.display = currentSlidePhotos.length > 1 ? 'block' : 'none';
    lightboxNext.style.display = currentSlidePhotos.length > 1 ? 'block' : 'none';
}

function lightboxPrevPhoto() {
    currentLightboxIndex = (currentLightboxIndex - 1 + currentSlidePhotos.length) % currentSlidePhotos.length;
    updateLightboxImage();
}

function lightboxNextPhoto() {
    currentLightboxIndex = (currentLightboxIndex + 1) % currentSlidePhotos.length;
    updateLightboxImage();
}

// Lightbox event listeners
if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightboxPrev) lightboxPrev.addEventListener('click', lightboxPrevPhoto);
if (lightboxNext) lightboxNext.addEventListener('click', lightboxNextPhoto);

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        // Cerrar solo si se hace click en el fondo oscuro
        if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
            closeLightbox();
        }
    });
}

// Click en fotos para abrir lightbox - usar event delegation en el container
const slidesContainer = document.getElementById('slidesContainer');
if (slidesContainer) {
    slidesContainer.addEventListener('click', function(e) {
        // Verificar si el lightbox ya está abierto
        if (lightbox && lightbox.classList.contains('active')) {
            return;
        }

    // Buscar si el click fue en una foto o dentro de una foto
    const gridPhoto = e.target.closest('.grid-photo');
    const photoInner = e.target.closest('.photo-inner');
    const galleryThumb = e.target.closest('.gallery-thumb');

    if (gridPhoto) {
        const src = gridPhoto.getAttribute('data-photo-src');
        if (src) {
            e.preventDefault();
            e.stopPropagation();
            openLightbox(src);
        }
    } else if (photoInner) {
        const src = photoInner.getAttribute('data-photo-src');
        if (src) {
            e.preventDefault();
            e.stopPropagation();
            openLightbox(src);
        }
    } else if (galleryThumb) {
        const src = galleryThumb.getAttribute('data-photo-src');
        if (src) {
            e.preventDefault();
            e.stopPropagation();
            openLightbox(src);
        }
    }
    });
}

// ==================== CONTROLES ====================
if (playBtn) playBtn.onclick = () => isPlaying ? pauseSlideshow() : startSlideshow();

if (hideBtn) {
    hideBtn.onclick = () => {
        if (controlsPanel) controlsPanel.classList.add('hidden');
        if (showControlsBtn) showControlsBtn.classList.add('visible');
    };
}

if (showControlsBtn) {
    showControlsBtn.onclick = () => {
        if (controlsPanel) controlsPanel.classList.remove('hidden');
        showControlsBtn.classList.remove('visible');
    };
}

if (muteBtn && bgMusic) {
    muteBtn.onclick = () => {
        bgMusic.muted = !bgMusic.muted;
        muteBtn.textContent = bgMusic.muted ? '🔇' : '🔊';
    };
}

// ==================== KEYBOARD CONTROLS ====================
document.onkeydown = (e) => {
    // Si el lightbox está abierto
    if (lightbox && lightbox.classList.contains('active')) {
        if (e.code === 'Escape') closeLightbox();
        if (e.code === 'ArrowLeft') lightboxPrevPhoto();
        if (e.code === 'ArrowRight') lightboxNextPhoto();
        return;
    }

    if (e.code === 'Space') {
        e.preventDefault();
        isPlaying ? pauseSlideshow() : startSlideshow();
    }
    if (e.code === 'ArrowRight') {
        if (isPlaying) pauseSlideshow();
        currentSlide = Math.min(currentSlide + 1, totalSlides - 1);
        showSlide(currentSlide);
    }
    if (e.code === 'ArrowLeft') {
        if (isPlaying) pauseSlideshow();
        currentSlide = Math.max(currentSlide - 1, 0);
        showSlide(currentSlide);
    }
    if (e.code === 'KeyH') {
        if (controlsPanel) controlsPanel.classList.toggle('hidden');
        if (showControlsBtn) showControlsBtn.classList.toggle('visible');
    }
    if (e.code === 'KeyF') {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen().catch(() => {});
        }
    }
    if (e.code === 'Escape') {
        if (controlsPanel && controlsPanel.classList.contains('hidden')) {
            controlsPanel.classList.remove('hidden');
            if (showControlsBtn) showControlsBtn.classList.remove('visible');
        }
    }
};

// ==================== AUDIO ====================
if (bgMusic) {
    bgMusic.ontimeupdate = () => {
        // Fade out music near end
        if (bgMusic.duration - bgMusic.currentTime < 5) {
            bgMusic.volume = Math.max(0, (bgMusic.duration - bgMusic.currentTime) / 5);
        }
    };

    // Loop audio si termina antes que el slideshow
    bgMusic.onended = () => {
        if (isPlaying) {
            bgMusic.currentTime = 0;
            bgMusic.play();
        }
    };
}

// ==================== LAZY LOADING GALERÍA ====================
let galleryLoaded = false;

function loadGalleryImages() {
    if (galleryLoaded) return;
    galleryLoaded = true;

    const galleryThumbs = document.getElementById('galleryThumbs');
    if (!galleryThumbs) return;

    const images = galleryThumbs.querySelectorAll('img[data-src]');

    // En móvil, cargar de forma más gradual
    if (isMobile) {
        let index = 0;
        const loadNext = () => {
            if (index < images.length) {
                const img = images[index];
                if (img && img.dataset && img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                index++;
                // Cargar siguiente imagen después de un pequeño delay
                setTimeout(loadNext, 100);
            }
        };
        loadNext();
    } else {
        // En desktop, cargar todas
        images.forEach(img => {
            if (img && img.dataset && img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
        });
    }
}

// Observar cuando el slide de galería se vuelve visible - con fallback para navegadores antiguos
try {
    if ('IntersectionObserver' in window) {
        const galleryObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadGalleryImages();
                    galleryObserver.disconnect();
                }
            });
        }, { threshold: 0.1 });

        // Observar el slide de galería
        const gallerySlide = document.querySelector('.gallery-slide');
        if (gallerySlide) {
            galleryObserver.observe(gallerySlide);
        }
    }
} catch (e) {
    console.log('IntersectionObserver no disponible');
}

// ==================== INICIALIZACIÓN ====================
function init() {
    try {
        // Mostrar primer slide (con verificación)
        if (slides && slides.length > 0) {
            slides[0].classList.add('active');
        }

        // Crear overlay de autoplay
        createAutoplayOverlay();
    } catch (e) {
        console.error('Error en inicialización:', e);
    }
}

// Ejecutar inicialización
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
