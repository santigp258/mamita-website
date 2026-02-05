// ==================== CONFIGURACIÓN ====================
// CDN de Cloudinary
const CDN_BASE = "https://res.cloudinary.com/dus5lm40j/image/upload/v1770259370/mamita/";

// Helper para construir URLs con CDN
const asset = (path) => CDN_BASE + path;

// ==================== CONFIGURACIÓN DE FOTOS ====================
// Organizado por categorías basadas en el análisis visual

const photoCategories = {
    // Celebración cumpleaños 50 de su hija - Fotos grupales con familia
    cumpleanos50: {
        photos: [
            asset("foto_01.jpg"),
            asset("foto_02.jpg"),
            asset("foto_03.jpg"),
            asset("foto_04.jpg"),
            asset("foto_05.jpg"),
            asset("foto_06.jpg")
        ],
        message: "Siempre celebrando a tus hijos, nietos y toda tu familia"
    },
    // Comiendo en familia
    momentosFamilia: {
        photos: [
            asset("foto_07.jpg"),
            asset("foto_08.jpg"),
            asset("foto_12.jpg"),
            asset("foto_13.jpg")
        ],
        message: "Los momentos más simples eran los más especiales"
    },
    // En la tienda leyendo
    vidaCotidiana: {
        photos: [
            asset("foto_09.jpg"),
            asset("foto_10.jpg"),
            asset("foto_11.jpg")
        ],
        message: "Trabajadora incansable, siempre atenta a todo"
    },
    // Día de las Madres - secuencia cortando pastel
    diaMadres: {
        photos: [
            asset("foto_14.jpg"),
            asset("foto_15.jpg"),
            asset("foto_16.jpg"),
            asset("foto_17.jpg"),
            asset("foto_18.jpg"),
            asset("foto_19.jpg"),
            asset("foto_20.jpg"),
            asset("foto_21.jpg"),
            asset("foto_22.jpg"),
            asset("foto_23.jpg"),
            asset("foto_24.jpg"),
            asset("foto_25.jpg")
        ],
        message: "Feliz Día de las Madres - Tu alegría era contagiosa"
    },
    // En casa sentada, momentos tranquilos
    momentosTranquilos: {
        photos: [
            asset("foto_26.jpg"),
            asset("foto_27.jpg"),
            asset("foto_28.jpg"),
            asset("foto_29.jpg")
        ],
        message: "En tu hogar siempre hubo paz y amor"
    },
    // Cumpleaños con hija - abrazos
    cumpleanosHija: {
        photos: [
            asset("foto_30.jpg"),
            asset("foto_31.jpg")
        ],
        message: "Tu abrazo era el refugio más seguro"
    },
    // Besos con hija/nieta
    besosHijosNietos: {
        photos: [
            asset("foto_32.jpg"),
            asset("foto_33.jpg"),
            asset("foto_34.jpg")
        ],
        message: "Tus besos y cariño para hijos y nietos, amor eterno"
    },
    // Sentada en sofá rojo - paz
    momentosPaz: {
        photos: [
            asset("foto_35.jpg")
        ],
        message: "Tu paz interior reflejaba tu fe inquebrantable"
    },
    // Más cumpleaños/celebraciones
    celebraciones: {
        photos: [
            asset("foto_36.jpg"),
            asset("foto_37.jpg"),
            asset("foto_38.jpg")
        ],
        message: "Cada celebración era una bendición"
    },
    // Reuniones familiares - fotos webp
    reunionesFamiliares: {
        photos: [
            asset("photo_1.jpg"),
            asset("photo_2.jpg"),
            asset("photo_4.jpg"),
            asset("photo_8.jpg")
        ],
        message: "Reunida con toda la familia, el mejor regalo"
    },
    // Familia completa al aire libre
    familiaCompleta: {
        photos: [
            asset("photo_3.jpg"),
            asset("photo_7.jpg")
        ],
        message: "Rodeada de hijos, nietos y toda tu descendencia"
    },
    // Con nieto
    conNieto: {
        photos: [
            asset("photo_9.jpg")
        ],
        message: "El amor de abuela, incondicional y eterno"
    },
    // Selfie familiar - cumpleaños
    selfieFamiliar: {
        photos: [
            asset("foto_39.jpg")
        ],
        message: "Toda la familia unida, tu mayor alegría"
    },
    // Quinceaños - recuerdo especial
    quinceanos: {
        photos: [
            asset("foto_40.jpg")
        ],
        message: "Presente en cada momento especial de tus nietas"
    },
    // Con hijas, nietas y bisnieta
    generaciones: {
        photos: [
            asset("foto_41.jpg"),
            asset("foto_42.jpg")
        ],
        message: "Tres generaciones unidas por tu amor"
    },
    // Última foto especial
    ultimaFoto: {
        photos: [
            asset("ultima.jpg")
        ],
        message: "Hasta siempre, mamita querida"
    }
};

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
    addPhotosToGlobal(photoCategories.cumpleanos50.photos);
    html += createGridSlide(photoCategories.cumpleanos50.photos, photoCategories.cumpleanos50.message, slideIndex, 'grid-6');
    slideIndex++;

    // SECCIÓN 2: Momentos en familia - Grid de 4 fotos (2x2)
    addPhotosToGlobal(photoCategories.momentosFamilia.photos);
    html += createGridSlide(photoCategories.momentosFamilia.photos, photoCategories.momentosFamilia.message, slideIndex, 'grid-4');
    slideIndex++;

    // SECCIÓN 3: Vida cotidiana - 3 fotos horizontal
    addPhotosToGlobal(photoCategories.vidaCotidiana.photos);
    html += createGridSlide(photoCategories.vidaCotidiana.photos, photoCategories.vidaCotidiana.message, slideIndex, 'grid-3');
    slideIndex++;

    // SECCIÓN 4: Día de las Madres - Collage grande (12 fotos en 2 slides)
    const diaMadresFirst = photoCategories.diaMadres.photos.slice(0, 6);
    const diaMadresSecond = photoCategories.diaMadres.photos.slice(6);

    addPhotosToGlobal(diaMadresFirst);
    html += createGridSlide(diaMadresFirst, "Día de las Madres - Tu sonrisa lo iluminaba todo", slideIndex, 'grid-6');
    slideIndex++;

    addPhotosToGlobal(diaMadresSecond);
    html += createGridSlide(diaMadresSecond, photoCategories.diaMadres.message, slideIndex, 'grid-6');
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
    addPhotosToGlobal(photoCategories.momentosTranquilos.photos);
    html += createGridSlide(photoCategories.momentosTranquilos.photos, photoCategories.momentosTranquilos.message, slideIndex, 'grid-4');
    slideIndex++;

    // SECCIÓN 6: Cumpleaños con hija - 2 fotos lado a lado
    addPhotosToGlobal(photoCategories.cumpleanosHija.photos);
    html += createGridSlide(photoCategories.cumpleanosHija.photos, photoCategories.cumpleanosHija.message, slideIndex, 'grid-2');
    slideIndex++;

    // SECCIÓN 7: Besos con hijos/nietos - 3 fotos
    addPhotosToGlobal(photoCategories.besosHijosNietos.photos);
    html += createGridSlide(photoCategories.besosHijosNietos.photos, photoCategories.besosHijosNietos.message, slideIndex, 'grid-3');
    slideIndex++;

    // SECCIÓN 8: Momento de paz - 1 foto destacada
    addPhotosToGlobal(photoCategories.momentosPaz.photos);
    html += createSingleSlide(photoCategories.momentosPaz.photos[0], photoCategories.momentosPaz.message, slideIndex);
    slideIndex++;

    // SECCIÓN 9: Más celebraciones - 3 fotos
    addPhotosToGlobal(photoCategories.celebraciones.photos);
    html += createGridSlide(photoCategories.celebraciones.photos, photoCategories.celebraciones.message, slideIndex, 'grid-3');
    slideIndex++;

    // SECCIÓN 10: Reuniones familiares - 4 fotos webp
    addPhotosToGlobal(photoCategories.reunionesFamiliares.photos);
    html += createGridSlide(photoCategories.reunionesFamiliares.photos, photoCategories.reunionesFamiliares.message, slideIndex, 'grid-4');
    slideIndex++;

    // SECCIÓN 11: Familia completa al aire libre - 2 fotos webp
    addPhotosToGlobal(photoCategories.familiaCompleta.photos);
    html += createGridSlide(photoCategories.familiaCompleta.photos, photoCategories.familiaCompleta.message, slideIndex, 'grid-2');
    slideIndex++;

    // SECCIÓN 12: Con nieto - 1 foto destacada webp
    addPhotosToGlobal(photoCategories.conNieto.photos);
    html += createSingleSlide(photoCategories.conNieto.photos[0], photoCategories.conNieto.message, slideIndex);
    slideIndex++;

    // SECCIÓN 13: Selfie familiar - 1 foto destacada
    addPhotosToGlobal(photoCategories.selfieFamiliar.photos);
    html += createSingleSlide(photoCategories.selfieFamiliar.photos[0], photoCategories.selfieFamiliar.message, slideIndex);
    slideIndex++;

    // SECCIÓN 14: Quinceaños - 1 foto especial
    addPhotosToGlobal(photoCategories.quinceanos.photos);
    html += createSingleSlide(photoCategories.quinceanos.photos[0], photoCategories.quinceanos.message, slideIndex);
    slideIndex++;

    // SECCIÓN 15: Generaciones - 2 fotos
    addPhotosToGlobal(photoCategories.generaciones.photos);
    html += createGridSlide(photoCategories.generaciones.photos, photoCategories.generaciones.message, slideIndex, 'grid-2');
    slideIndex++;

    // SECCIÓN 16: Última foto especial
    addPhotosToGlobal(photoCategories.ultimaFoto.photos);
    html += createSingleSlide(photoCategories.ultimaFoto.photos[0], photoCategories.ultimaFoto.message, slideIndex);
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
    slides.forEach(s => s.classList.remove('active'));
    clearAllAnimations();

    slides[index].classList.add('active');
    currentSlideEl.textContent = index + 1;
    progressFill.style.width = ((index + 1) / totalSlides * 100) + '%';

    setTimeout(() => animateSlide(index), 100);
}

function animateSlide(index) {
    const slide = slides[index];
    const type = slide.dataset.type;

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
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
        showSlide(currentSlide);
        slideTimer = setTimeout(nextSlide, getSlideDuration(slides[currentSlide]));
    } else {
        isPlaying = false;
        playBtn.textContent = '↺ REINICIAR';
    }
}

function startSlideshow() {
    isPlaying = true;
    playBtn.textContent = '⏸ PAUSAR';

    // Si es reinicio, comenzar desde 0
    if (currentSlide === totalSlides - 1) {
        currentSlide = 0;
        audioTimeOnPause = 0;
    }

    // Sincronizar audio - continuar desde donde se pausó
    bgMusic.currentTime = audioTimeOnPause;
    bgMusic.volume = 1;
    bgMusic.play().catch(e => console.log('Audio:', e));

    showSlide(currentSlide);
    slideTimer = setTimeout(nextSlide, getSlideDuration(slides[currentSlide]));
}

function pauseSlideshow() {
    isPlaying = false;
    playBtn.textContent = '▶ CONTINUAR';
    clearTimeout(slideTimer);

    // Guardar posición del audio para sincronización
    audioTimeOnPause = bgMusic.currentTime;
    bgMusic.pause();
}

// ==================== PROGRESS BAR INTERACTIVO ====================
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

    progressTooltip.textContent = `Slide ${Math.max(1, Math.min(targetSlide, totalSlides))}`;
    progressTooltip.style.left = `${percent * 100}%`;
});

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
lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', lightboxPrevPhoto);
lightboxNext.addEventListener('click', lightboxNextPhoto);

lightbox.addEventListener('click', (e) => {
    // Cerrar solo si se hace click en el fondo oscuro
    if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
        closeLightbox();
    }
});

// Click en fotos para abrir lightbox - usar event delegation en el container
document.getElementById('slidesContainer').addEventListener('click', function(e) {
    // Verificar si el lightbox ya está abierto
    if (lightbox.classList.contains('active')) {
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

// ==================== CONTROLES ====================
playBtn.onclick = () => isPlaying ? pauseSlideshow() : startSlideshow();

hideBtn.onclick = () => {
    controlsPanel.classList.add('hidden');
    showControlsBtn.classList.add('visible');
};

showControlsBtn.onclick = () => {
    controlsPanel.classList.remove('hidden');
    showControlsBtn.classList.remove('visible');
};

muteBtn.onclick = () => {
    bgMusic.muted = !bgMusic.muted;
    muteBtn.textContent = bgMusic.muted ? '🔇' : '🔊';
};

// ==================== KEYBOARD CONTROLS ====================
document.onkeydown = (e) => {
    // Si el lightbox está abierto
    if (lightbox.classList.contains('active')) {
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
        controlsPanel.classList.toggle('hidden');
        showControlsBtn.classList.toggle('visible');
    }
    if (e.code === 'KeyF') {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
    }
    if (e.code === 'Escape') {
        if (controlsPanel.classList.contains('hidden')) {
            controlsPanel.classList.remove('hidden');
            showControlsBtn.classList.remove('visible');
        }
    }
};

// ==================== AUDIO ====================
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
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                index++;
                // Cargar siguiente imagen después de un pequeño delay
                setTimeout(loadNext, 50);
            }
        };
        loadNext();
    } else {
        // En desktop, cargar todas
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

// Observar cuando el slide de galería se vuelve visible
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

// ==================== INICIALIZACIÓN ====================
// Mostrar primer slide
slides[0].classList.add('active');

// Crear overlay de autoplay
createAutoplayOverlay();
