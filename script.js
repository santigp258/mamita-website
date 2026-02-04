// ==================== CONFIGURACIÓN DE FOTOS ====================
// Organizado por categorías basadas en el análisis visual

const photoCategories = {
    // Celebración cumpleaños 50 de su hija - Fotos grupales con familia
    cumpleanos50: {
        photos: [
            "assets/slideshow/foto_01.jpeg",
            "assets/slideshow/foto_02.jpeg",
            "assets/slideshow/foto_03.jpeg",
            "assets/slideshow/foto_04.jpeg",
            "assets/slideshow/foto_05.jpeg",
            "assets/slideshow/foto_06.jpeg"
        ],
        message: "Siempre celebrando a tus hijos, nietos y toda tu familia"
    },
    // Comiendo en familia
    momentosFamilia: {
        photos: [
            "assets/slideshow/foto_07.jpeg",
            "assets/slideshow/foto_08.jpeg",
            "assets/slideshow/foto_12.jpeg",
            "assets/slideshow/foto_13.jpeg"
        ],
        message: "Los momentos más simples eran los más especiales"
    },
    // En la tienda leyendo
    vidaCotidiana: {
        photos: [
            "assets/slideshow/foto_09.jpeg",
            "assets/slideshow/foto_10.jpeg",
            "assets/slideshow/foto_11.jpeg"
        ],
        message: "Trabajadora incansable, siempre atenta a todo"
    },
    // Día de las Madres - secuencia cortando pastel
    diaMadres: {
        photos: [
            "assets/slideshow/foto_14.jpeg",
            "assets/slideshow/foto_15.jpeg",
            "assets/slideshow/foto_16.jpeg",
            "assets/slideshow/foto_17.jpeg",
            "assets/slideshow/foto_18.jpeg",
            "assets/slideshow/foto_19.jpeg",
            "assets/slideshow/foto_20.jpeg",
            "assets/slideshow/foto_21.jpeg",
            "assets/slideshow/foto_22.jpeg",
            "assets/slideshow/foto_23.jpeg",
            "assets/slideshow/foto_24.jpeg",
            "assets/slideshow/foto_25.jpeg"
        ],
        message: "Feliz Día de las Madres - Tu alegría era contagiosa"
    },
    // En casa sentada, momentos tranquilos
    momentosTranquilos: {
        photos: [
            "assets/slideshow/foto_26.jpeg",
            "assets/slideshow/foto_27.jpeg",
            "assets/slideshow/foto_28.jpeg",
            "assets/slideshow/foto_29.jpeg"
        ],
        message: "En tu hogar siempre hubo paz y amor"
    },
    // Cumpleaños con hija - abrazos
    cumpleanosHija: {
        photos: [
            "assets/slideshow/foto_30.jpeg",
            "assets/slideshow/foto_31.jpeg"
        ],
        message: "Tu abrazo era el refugio más seguro"
    },
    // Besos con nieta
    besosNieta: {
        photos: [
            "assets/slideshow/foto_32.jpeg",
            "assets/slideshow/foto_33.jpeg",
            "assets/slideshow/foto_34.jpeg"
        ],
        message: "Los besos de abuela quedan grabados en el alma"
    },
    // Sentada en sofá rojo - paz
    momentosPaz: {
        photos: [
            "assets/slideshow/foto_35.jpeg"
        ],
        message: "Tu paz interior reflejaba tu fe inquebrantable"
    },
    // Más cumpleaños/celebraciones
    celebraciones: {
        photos: [
            "assets/slideshow/foto_36.jpeg",
            "assets/slideshow/foto_37.jpeg",
            "assets/slideshow/foto_38.jpeg"
        ],
        message: "Cada celebración era una bendición"
    }
};

// Foto principal para el slide final
const mainPhoto = "assets/slideshow/main_photo.webp";

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

    // SECCIÓN 1: Cumpleaños 50 - Grid de 6 fotos (2x3)
    html += createGridSlide(photoCategories.cumpleanos50.photos, photoCategories.cumpleanos50.message, slideIndex, 'grid-6');
    slideIndex++;

    // SECCIÓN 2: Momentos en familia - Grid de 4 fotos (2x2)
    html += createGridSlide(photoCategories.momentosFamilia.photos, photoCategories.momentosFamilia.message, slideIndex, 'grid-4');
    slideIndex++;

    // SECCIÓN 3: Vida cotidiana - 3 fotos horizontal
    html += createGridSlide(photoCategories.vidaCotidiana.photos, photoCategories.vidaCotidiana.message, slideIndex, 'grid-3');
    slideIndex++;

    // SECCIÓN 4: Día de las Madres - Collage grande (12 fotos en 2 slides)
    const diaMadresFirst = photoCategories.diaMadres.photos.slice(0, 6);
    const diaMadresSecond = photoCategories.diaMadres.photos.slice(6);

    html += createGridSlide(diaMadresFirst, "Día de las Madres - Tu sonrisa lo iluminaba todo", slideIndex, 'grid-6');
    slideIndex++;

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
    html += createGridSlide(photoCategories.momentosTranquilos.photos, photoCategories.momentosTranquilos.message, slideIndex, 'grid-4');
    slideIndex++;

    // SECCIÓN 6: Cumpleaños con hija - 2 fotos lado a lado
    html += createGridSlide(photoCategories.cumpleanosHija.photos, photoCategories.cumpleanosHija.message, slideIndex, 'grid-2');
    slideIndex++;

    // SECCIÓN 7: Besos con nieta - 3 fotos
    html += createGridSlide(photoCategories.besosNieta.photos, photoCategories.besosNieta.message, slideIndex, 'grid-3');
    slideIndex++;

    // SECCIÓN 8: Momento de paz - 1 foto destacada
    html += createSingleSlide(photoCategories.momentosPaz.photos[0], photoCategories.momentosPaz.message, slideIndex);
    slideIndex++;

    // SECCIÓN 9: Más celebraciones - 3 fotos
    html += createGridSlide(photoCategories.celebraciones.photos, photoCategories.celebraciones.message, slideIndex, 'grid-3');
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

    // Slide final
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

    container.innerHTML = html;
    return slideIndex + 1;
}

function createGridSlide(photos, message, index, gridType) {
    let photosHtml = photos.map((src, i) => `
        <div class="grid-photo" style="--delay: ${i * 0.15}s">
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
                    <div class="photo-frame"><div class="photo-inner">
                        <img src="${src}" alt="Recuerdo">
                    </div></div>
                </div>
                <div class="photo-message">${message}</div>
            </div>
        </div>
    `;
}

// ==================== FLOATING ELEMENTS ====================
const floatingContainer = document.getElementById('floatingElements');

function createPetal() {
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.style.left = Math.random() * 100 + '%';
    petal.style.top = '-5%';
    floatingContainer.appendChild(petal);

    let progress = 0;
    const duration = 18000 + Math.random() * 12000;
    const startX = parseFloat(petal.style.left);
    const amplitude = 40 + Math.random() * 80;
    const startTime = Date.now();

    function animate() {
        const elapsed = Date.now() - startTime;
        progress = elapsed / duration;
        if (progress >= 1) { petal.remove(); return; }

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
        if (progress >= 1) { bokeh.remove(); return; }

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

setInterval(createPetal, 2500);
setInterval(createBokeh, 800);

// ==================== SLIDESHOW ====================
const totalSlides = generateSlides();
const slides = document.querySelectorAll('.slide');
const progressFill = document.getElementById('progressFill');
const currentSlideEl = document.getElementById('currentSlide');
const totalSlidesEl = document.getElementById('totalSlides');
const playBtn = document.getElementById('playBtn');
const hideBtn = document.getElementById('hideBtn');
const controlsPanel = document.getElementById('controlsPanel');
const bgMusic = document.getElementById('bgMusic');
const muteBtn = document.getElementById('muteBtn');

totalSlidesEl.textContent = totalSlides;

let currentSlide = 0;
let isPlaying = false;
let slideTimer = null;

// Duraciones por tipo de slide
function getSlideDuration(slideEl) {
    const type = slideEl.dataset.type;
    switch(type) {
        case 'intro': return 10000;
        case 'message': return 20000;
        case 'verse': return 18000;
        case 'final': return 25000;
        case 'single': return 12000;
        case 'grid':
            // Más tiempo para grids con más fotos
            const gridClass = slideEl.querySelector('.photo-grid')?.className || '';
            if (gridClass.includes('grid-6')) return 18000;
            if (gridClass.includes('grid-4')) return 15000;
            if (gridClass.includes('grid-3')) return 14000;
            if (gridClass.includes('grid-2')) return 12000;
            return 12000;
        default: return 12000;
    }
}

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
        // Animar cada foto del grid con delay escalonado
        const photos = slide.querySelectorAll('.grid-photo');
        photos.forEach((photo, i) => {
            setTimeout(() => photo.classList.add('show'), 200 + (i * 200));
        });
        // Mensaje después de que aparezcan las fotos
        const msgDelay = 200 + (photos.length * 200) + 500;
        setTimeout(() => slide.querySelector('.photo-message')?.classList.add('show'), msgDelay);
    }
    else if (type === 'single') {
        setTimeout(() => slide.querySelector('.photo-container')?.classList.add('show'), 100);
        setTimeout(() => slide.querySelector('.photo-message')?.classList.add('show'), 1800);
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

    bgMusic.currentTime = 0;
    bgMusic.volume = 1;
    bgMusic.play().catch(e => console.log('Audio:', e));

    if (currentSlide === totalSlides - 1) {
        currentSlide = 0;
    }

    showSlide(currentSlide);
    slideTimer = setTimeout(nextSlide, getSlideDuration(slides[currentSlide]));
}

function pauseSlideshow() {
    isPlaying = false;
    playBtn.textContent = '▶ REPRODUCIR';
    clearTimeout(slideTimer);
    bgMusic.pause();
}

// Event listeners
playBtn.onclick = () => isPlaying ? pauseSlideshow() : startSlideshow();
hideBtn.onclick = () => controlsPanel.classList.toggle('hidden');
muteBtn.onclick = () => {
    bgMusic.muted = !bgMusic.muted;
    muteBtn.textContent = bgMusic.muted ? '🔇' : '🔊';
};

// Keyboard controls
document.onkeydown = (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        isPlaying ? pauseSlideshow() : startSlideshow();
    }
    if (e.code === 'ArrowRight') {
        pauseSlideshow();
        currentSlide = Math.min(currentSlide + 1, totalSlides - 1);
        showSlide(currentSlide);
    }
    if (e.code === 'ArrowLeft') {
        pauseSlideshow();
        currentSlide = Math.max(currentSlide - 1, 0);
        showSlide(currentSlide);
    }
    if (e.code === 'KeyH') controlsPanel.classList.toggle('hidden');
    if (e.code === 'KeyF') {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
    }
};

// Fade out music at end
bgMusic.ontimeupdate = () => {
    if (bgMusic.duration - bgMusic.currentTime < 5) {
        bgMusic.volume = Math.max(0, (bgMusic.duration - bgMusic.currentTime) / 5);
    }
};

// Show first slide on load
slides[0].classList.add('active');
