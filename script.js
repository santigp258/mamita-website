// ==================== ERROR HANDLER GLOBAL ====================
window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('Error:', msg, 'at', url, lineNo);
    return true;
};

window.addEventListener('unhandledrejection', function(event) {
    console.error('Promise rejection:', event.reason);
    event.preventDefault();
});

// ==================== CONFIGURACIÓN ====================
var CDN_BASE = "https://res.cloudinary.com/dus5lm40j/image/upload/v1770259370/mamita/";

function asset(path) {
    return CDN_BASE + path;
}

// ==================== CONFIGURACIÓN DE FOTOS ====================
var photoNames = {
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

var photoMessages = {
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

function getPhotos(category) {
    return photoNames[category].map(function(name) {
        return asset(name);
    });
}

function getMessage(category) {
    return photoMessages[category];
}

// ==================== VARIABLES GLOBALES (sin inicializar) ====================
var allPhotos = [];
var totalSlides = 0;
var slides = null;
var currentSlide = 0;
var isPlaying = false;
var slideTimer = null;
var audioTimeOnPause = 0;
var currentLightboxIndex = 0;
var currentSlidePhotos = [];
var petalInterval = null;
var bokehInterval = null;
var petalCount = 0;
var bokehCount = 0;
// galleryLoaded eliminado - lazy loading en showSlide
var isMobile = false;
var appInitialized = false;

// DOM elements - se inicializan después de click en Comenzar
var floatingContainer, progressBar, progressFill, progressTooltip;
var currentSlideEl, totalSlidesEl, playBtn, hideBtn, controlsPanel, showControlsBtn;
var bgMusic, muteBtn, lightbox, lightboxImg, lightboxClose, lightboxPrev, lightboxNext, lightboxCounter;
var slidesContainer;

// ==================== SOLO MOSTRAR OVERLAY INICIAL ====================
function showInitialOverlay() {
    var overlay = document.createElement('div');
    overlay.className = 'autoplay-overlay';
    overlay.id = 'autoplayOverlay';
    overlay.innerHTML =
        '<div class="autoplay-content">' +
            '<div class="autoplay-dove">🕊️</div>' +
            '<div class="autoplay-title">En Memoria de Ana del Carmen</div>' +
            '<div class="autoplay-subtitle">1956 — 2026</div>' +
            '<button class="autoplay-btn" id="autoplayBtn">▶ Comenzar</button>' +
            '<div class="autoplay-hint">Presiona para iniciar el memorial con música</div>' +
        '</div>';
    document.body.appendChild(overlay);

    var btn = document.getElementById('autoplayBtn');
    if (btn) {
        btn.addEventListener('click', function() {
            // Ocultar overlay
            overlay.classList.add('hidden');

            // Después de la animación, inicializar TODO
            setTimeout(function() {
                overlay.remove();
                initializeApp();
            }, 800);
        });
    }
}

// ==================== INICIALIZACIÓN COMPLETA (después de click) ====================
function initializeApp() {
    if (appInitialized) return;
    appInitialized = true;

    try {
        // Detección móvil
        isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;

        // Obtener elementos del DOM primero
        floatingContainer = document.getElementById('floatingElements');
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
        lightbox = document.getElementById('lightbox');
        lightboxImg = document.getElementById('lightboxImg');
        lightboxClose = document.getElementById('lightboxClose');
        lightboxPrev = document.getElementById('lightboxPrev');
        lightboxNext = document.getElementById('lightboxNext');
        lightboxCounter = document.getElementById('lightboxCounter');
        slidesContainer = document.getElementById('slidesContainer');

        // Generar slides de forma diferida para no bloquear
        setTimeout(function() {
            totalSlides = generateSlides();
            slides = document.querySelectorAll('.slide');

            if (totalSlidesEl) totalSlidesEl.textContent = totalSlides;

            // Mostrar primer slide (sin imágenes, es el intro)
            if (slides && slides.length > 0) {
                slides[0].classList.add('active');
            }

            // Configurar event listeners
            setupEventListeners();

            // Iniciar elementos flotantes (diferido)
            setTimeout(function() {
                startFloatingElements();
            }, 500);

            // Iniciar slideshow (diferido)
            setTimeout(function() {
                startSlideshow();
            }, 100);

        }, 50);

    } catch (e) {
        console.error('Error en inicialización:', e);
    }
}

// ==================== GENERACIÓN DE SLIDES ====================
function generateSlides() {
    var container = document.getElementById('slidesContainer');
    if (!container) return 0;

    var slideIndex = 0;
    var h = []; // Array para construir HTML

    function addPhotosToGlobal(photos) {
        for (var i = 0; i < photos.length; i++) {
            if (allPhotos.indexOf(photos[i]) === -1) {
                allPhotos.push(photos[i]);
            }
        }
    }

    // Intro
    h.push('<div class="slide intro-slide" data-slide="' + slideIndex + '" data-type="intro">');
    h.push('<div class="intro-dove">🕊️</div>');
    h.push('<div class="intro-memorial-text">En Amorosa Memoria</div>');
    h.push('<div class="intro-name">Ana del Carmen Pulgarín</div>');
    h.push('<div class="intro-dates"><span>2 de Agosto, 1956</span><span class="heart">♡</span><span>28 de Enero, 2026</span></div>');
    h.push('<div class="decorative-flowers">✿ ❀ ✿</div>');
    h.push('</div>');
    slideIndex++;

    // Fotos
    var categories = [
        ['cumpleanos50', 'grid-6'],
        ['momentosFamilia', 'grid-4'],
        ['vidaCotidiana', 'grid-3']
    ];

    for (var c = 0; c < categories.length; c++) {
        var cat = categories[c][0];
        var grid = categories[c][1];
        var photos = getPhotos(cat);
        addPhotosToGlobal(photos);
        h.push(createGridSlide(photos, getMessage(cat), slideIndex, grid));
        slideIndex++;
    }

    // Día de las Madres (dividido en 2)
    var diaMadresAll = getPhotos('diaMadres');
    var diaMadresFirst = diaMadresAll.slice(0, 6);
    var diaMadresSecond = diaMadresAll.slice(6);
    addPhotosToGlobal(diaMadresFirst);
    h.push(createGridSlide(diaMadresFirst, "Día de las Madres - Tu sonrisa lo iluminaba todo", slideIndex, 'grid-6'));
    slideIndex++;
    addPhotosToGlobal(diaMadresSecond);
    h.push(createGridSlide(diaMadresSecond, getMessage('diaMadres'), slideIndex, 'grid-6'));
    slideIndex++;

    // Mensaje
    h.push('<div class="slide message-slide" data-slide="' + slideIndex + '" data-type="message">');
    h.push('<div class="message-flower">🌸</div>');
    h.push('<div class="message-content">');
    h.push('<p class="message-line">En tu corazón siempre hubo amor y respeto<br>por tu familia y amigos.</p>');
    h.push('<p class="message-line">Gracias por tus enseñanzas, por acercarnos a Dios<br>y por tu amor incondicional.</p>');
    h.push('<div class="message-signature">Te amamos, madre querida,<br>mamita de nuestro corazón</div>');
    h.push('</div></div>');
    slideIndex++;

    // Más categorías
    var categories2 = [
        ['momentosTranquilos', 'grid-4'],
        ['cumpleanosHija', 'grid-2'],
        ['besosHijosNietos', 'grid-3']
    ];
    for (var c2 = 0; c2 < categories2.length; c2++) {
        var cat2 = categories2[c2][0];
        var grid2 = categories2[c2][1];
        var photos2 = getPhotos(cat2);
        addPhotosToGlobal(photos2);
        h.push(createGridSlide(photos2, getMessage(cat2), slideIndex, grid2));
        slideIndex++;
    }

    // Singles
    var singles = ['momentosPaz', 'celebraciones', 'reunionesFamiliares', 'familiaCompleta', 'conNieto', 'selfieFamiliar', 'quinceanos', 'generaciones', 'ultimaFoto'];
    var singleGrids = ['single', 'grid-3', 'grid-4', 'grid-2', 'single', 'single', 'single', 'grid-2', 'single'];

    for (var s = 0; s < singles.length; s++) {
        var sCat = singles[s];
        var sGrid = singleGrids[s];
        var sPhotos = getPhotos(sCat);
        addPhotosToGlobal(sPhotos);
        if (sGrid === 'single') {
            h.push(createSingleSlide(sPhotos[0], getMessage(sCat), slideIndex));
        } else {
            h.push(createGridSlide(sPhotos, getMessage(sCat), slideIndex, sGrid));
        }
        slideIndex++;
    }

    // Versículo
    h.push('<div class="slide verse-slide" data-slide="' + slideIndex + '" data-type="verse">');
    h.push('<div class="verse-container">');
    h.push('<div class="verse-icon">✝</div>');
    h.push('<p class="verse-text">"Estimada es a Jehová<br>la muerte de sus santos."</p>');
    h.push('<p class="verse-reference">— Salmos 116:15</p>');
    h.push('</div></div>');
    slideIndex++;

    // Final - también con lazy loading
    var mainPhoto = asset("main_photo.jpg");
    h.push('<div class="slide final-slide" data-slide="' + slideIndex + '" data-type="final">');
    h.push('<div class="final-portrait"><div class="portrait-glow"></div>');
    h.push('<div class="portrait-frame"><img data-src="' + mainPhoto + '" alt="Ana del Carmen Pulgarín"></div></div>');
    h.push('<div class="final-eternal">Por siempre en nuestros corazones</div>');
    h.push('<div class="final-name">Ana del Carmen Pulgarín</div>');
    h.push('<div class="final-dates">1956 ♡ 2026</div>');
    h.push('<div class="final-flowers">🌹</div>');
    h.push('</div>');
    slideIndex++;

    // Galería (sin imágenes src para no cargar todo)
    h.push('<div class="slide gallery-slide" data-slide="' + slideIndex + '" data-type="gallery">');
    h.push('<div class="gallery-header">');
    h.push('<div class="gallery-icon">📷</div>');
    h.push('<div class="gallery-title">Galería de Recuerdos</div>');
    h.push('<div class="gallery-subtitle">' + allPhotos.length + ' momentos especiales</div>');
    h.push('</div>');
    h.push('<div class="gallery-thumbs-container"><div class="gallery-thumbs" id="galleryThumbs">');
    for (var g = 0; g < allPhotos.length; g++) {
        h.push('<div class="gallery-thumb" data-photo-src="' + allPhotos[g] + '" data-photo-index="' + g + '">');
        h.push('<img data-src="' + allPhotos[g] + '" alt="Recuerdo ' + (g + 1) + '" loading="lazy">');
        h.push('</div>');
    }
    h.push('</div></div>');
    h.push('<div class="gallery-hint">Toca cualquier foto para verla en grande</div>');
    h.push('</div>');

    container.innerHTML = h.join('');
    return slideIndex + 1;
}

function createGridSlide(photos, message, index, gridType) {
    var photosHtml = '';
    for (var i = 0; i < photos.length; i++) {
        // Usar data-src en vez de src para lazy loading
        photosHtml += '<div class="grid-photo" style="--delay: ' + (i * 0.15) + 's" data-photo-src="' + photos[i] + '">' +
            '<img data-src="' + photos[i] + '" alt="Recuerdo ' + (i + 1) + '">' +
        '</div>';
    }

    return '<div class="slide photo-slide ' + gridType + '-slide" data-slide="' + index + '" data-type="grid">' +
            '<div class="photo-grid ' + gridType + '">' +
                photosHtml +
            '</div>' +
            '<div class="photo-message">' + message + '</div>' +
        '</div>';
}

function createSingleSlide(src, message, index) {
    // Usar data-src en vez de src para lazy loading
    return '<div class="slide photo-slide single-slide" data-slide="' + index + '" data-type="single">' +
            '<div class="photo-wrapper">' +
                '<div class="photo-container">' +
                    '<div class="photo-frame"><div class="photo-inner" data-photo-src="' + src + '">' +
                        '<img data-src="' + src + '" alt="Recuerdo">' +
                    '</div></div>' +
                '</div>' +
                '<div class="photo-message">' + message + '</div>' +
            '</div>' +
        '</div>';
}

// ==================== EVENT LISTENERS ====================
function setupEventListeners() {
    if (progressBar) {
        progressBar.addEventListener('click', function(e) {
            var rect = progressBar.getBoundingClientRect();
            var percent = (e.clientX - rect.left) / rect.width;
            var targetSlide = Math.floor(percent * totalSlides);
            if (isPlaying) pauseSlideshow();
            currentSlide = Math.max(0, Math.min(targetSlide, totalSlides - 1));
            showSlide(currentSlide);
        });

        progressBar.addEventListener('mousemove', function(e) {
            var rect = progressBar.getBoundingClientRect();
            var percent = (e.clientX - rect.left) / rect.width;
            var targetSlide = Math.floor(percent * totalSlides) + 1;
            if (progressTooltip) {
                progressTooltip.textContent = 'Slide ' + Math.max(1, Math.min(targetSlide, totalSlides));
                progressTooltip.style.left = (percent * 100) + '%';
            }
        });
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', lightboxPrevPhoto);
    if (lightboxNext) lightboxNext.addEventListener('click', lightboxNextPhoto);

    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
                closeLightbox();
            }
        });
    }

    if (slidesContainer) {
        slidesContainer.addEventListener('click', function(e) {
            if (lightbox && lightbox.classList.contains('active')) return;

            var gridPhoto = e.target.closest('.grid-photo');
            var photoInner = e.target.closest('.photo-inner');
            var galleryThumb = e.target.closest('.gallery-thumb');

            var src = null;
            if (gridPhoto) src = gridPhoto.getAttribute('data-photo-src');
            else if (photoInner) src = photoInner.getAttribute('data-photo-src');
            else if (galleryThumb) src = galleryThumb.getAttribute('data-photo-src');

            if (src) {
                e.preventDefault();
                e.stopPropagation();
                openLightbox(src);
            }
        });
    }

    if (playBtn) {
        playBtn.onclick = function() {
            if (isPlaying) pauseSlideshow();
            else startSlideshow();
        };
    }

    if (hideBtn) {
        hideBtn.onclick = function() {
            if (controlsPanel) controlsPanel.classList.add('hidden');
            if (showControlsBtn) showControlsBtn.classList.add('visible');
        };
    }

    if (showControlsBtn) {
        showControlsBtn.onclick = function() {
            if (controlsPanel) controlsPanel.classList.remove('hidden');
            showControlsBtn.classList.remove('visible');
        };
    }

    if (muteBtn && bgMusic) {
        muteBtn.onclick = function() {
            bgMusic.muted = !bgMusic.muted;
            muteBtn.textContent = bgMusic.muted ? '🔇' : '🔊';
        };
    }

    document.onkeydown = function(e) {
        if (lightbox && lightbox.classList.contains('active')) {
            if (e.code === 'Escape') closeLightbox();
            if (e.code === 'ArrowLeft') lightboxPrevPhoto();
            if (e.code === 'ArrowRight') lightboxNextPhoto();
            return;
        }

        if (e.code === 'Space') {
            e.preventDefault();
            if (isPlaying) pauseSlideshow();
            else startSlideshow();
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
                document.documentElement.requestFullscreen().catch(function() {});
            }
        }
        if (e.code === 'Escape') {
            if (controlsPanel && controlsPanel.classList.contains('hidden')) {
                controlsPanel.classList.remove('hidden');
                if (showControlsBtn) showControlsBtn.classList.remove('visible');
            }
        }
    };

    if (bgMusic) {
        bgMusic.ontimeupdate = function() {
            if (bgMusic.duration - bgMusic.currentTime < 5) {
                bgMusic.volume = Math.max(0, (bgMusic.duration - bgMusic.currentTime) / 5);
            }
        };

        bgMusic.onended = function() {
            if (isPlaying) {
                bgMusic.currentTime = 0;
                bgMusic.play();
            }
        };
    }

    // NO usar IntersectionObserver - las imágenes se cargan en showSlide
}

// ==================== FLOATING ELEMENTS ====================
function createPetal() {
    if (!floatingContainer) return;
    var MAX_PETALS = isMobile ? 3 : 8;
    if (petalCount >= MAX_PETALS) return;
    petalCount++;

    var petal = document.createElement('div');
    petal.className = 'petal';
    petal.style.left = Math.random() * 100 + '%';
    petal.style.top = '-5%';
    floatingContainer.appendChild(petal);

    var duration = 18000 + Math.random() * 12000;
    var startX = parseFloat(petal.style.left);
    var amplitude = 40 + Math.random() * 80;
    var startTime = Date.now();

    function animate() {
        var elapsed = Date.now() - startTime;
        var progress = elapsed / duration;
        if (progress >= 1) {
            petal.remove();
            petalCount--;
            return;
        }

        var y = -5 + (progress * 115);
        var x = startX + Math.sin(elapsed * 0.001) * amplitude;
        var opacity = progress < 0.1 ? progress * 10 : progress > 0.9 ? (1 - progress) * 10 : 1;

        petal.style.top = y + '%';
        petal.style.left = x + '%';
        petal.style.transform = 'rotate(' + (elapsed * 0.05) + 'deg)';
        petal.style.opacity = opacity * 0.5;
        requestAnimationFrame(animate);
    }
    animate();
}

function createBokeh() {
    if (!floatingContainer) return;
    var MAX_BOKEHS = isMobile ? 5 : 15;
    if (bokehCount >= MAX_BOKEHS) return;
    bokehCount++;

    var bokeh = document.createElement('div');
    bokeh.className = 'bokeh';
    var size = 30 + Math.random() * 60;
    bokeh.style.width = size + 'px';
    bokeh.style.height = size + 'px';
    bokeh.style.background = 'radial-gradient(circle, rgba(232,196,196,0.3) 0%, transparent 70%)';
    bokeh.style.left = Math.random() * 100 + '%';
    bokeh.style.top = '110%';
    floatingContainer.appendChild(bokeh);

    var duration = 20000 + Math.random() * 15000;
    var startX = parseFloat(bokeh.style.left);
    var startTime = Date.now();

    function animate() {
        var elapsed = Date.now() - startTime;
        var progress = elapsed / duration;
        if (progress >= 1) {
            bokeh.remove();
            bokehCount--;
            return;
        }

        var y = 110 - (progress * 130);
        var x = startX + Math.sin(elapsed * 0.0008) * 30;
        var opacity = progress < 0.15 ? progress / 0.15 : progress > 0.85 ? (1 - progress) / 0.15 : 1;

        bokeh.style.top = y + '%';
        bokeh.style.left = x + '%';
        bokeh.style.opacity = opacity * 0.5;
        requestAnimationFrame(animate);
    }
    animate();
}

function startFloatingElements() {
    if (petalInterval || bokehInterval) return;
    petalInterval = setInterval(createPetal, isMobile ? 5000 : 2500);
    bokehInterval = setInterval(createBokeh, isMobile ? 2000 : 800);
}

// ==================== SLIDE FUNCTIONS ====================
function getSlideDuration(slideEl) {
    if (!slideEl || !slideEl.dataset) return 12000;
    var type = slideEl.dataset.type;
    switch(type) {
        case 'intro': return 10000;
        case 'message': return 20000;
        case 'verse': return 18000;
        case 'final': return 25000;
        case 'gallery': return 30000;
        case 'single': return 12000;
        case 'grid':
            var grid = slideEl.querySelector('.photo-grid');
            var gridClass = grid ? grid.className : '';
            if (gridClass.indexOf('grid-6') !== -1) return 18000;
            if (gridClass.indexOf('grid-4') !== -1) return 15000;
            if (gridClass.indexOf('grid-3') !== -1) return 14000;
            if (gridClass.indexOf('grid-2') !== -1) return 12000;
            return 12000;
        default: return 12000;
    }
}

function clearAllAnimations() {
    var elements = document.querySelectorAll('.show');
    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove('show');
    }
}

// Cargar UNA imagen con delay
function loadSingleImage(img) {
    if (img && img.dataset && img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
    }
}

// Cargar imágenes de un slide de forma gradual (una por una)
function loadSlideImages(slide, callback) {
    if (!slide) {
        if (callback) callback();
        return;
    }

    var images = slide.querySelectorAll('img[data-src]');
    if (images.length === 0) {
        if (callback) callback();
        return;
    }

    var index = 0;
    function loadNext() {
        if (index < images.length) {
            loadSingleImage(images[index]);
            index++;
            // Cargar siguiente imagen después de 50ms
            setTimeout(loadNext, 50);
        } else {
            if (callback) callback();
        }
    }
    loadNext();
}

function showSlide(index) {
    if (!slides || !slides.length) return;

    for (var i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    clearAllAnimations();

    if (slides[index]) {
        slides[index].classList.add('active');
        // Cargar imágenes del slide actual de forma gradual
        loadSlideImages(slides[index]);
    }
    if (currentSlideEl) currentSlideEl.textContent = index + 1;
    if (progressFill) progressFill.style.width = ((index + 1) / totalSlides * 100) + '%';

    setTimeout(function() { animateSlide(index); }, 100);
}

function animateSlide(index) {
    if (!slides || !slides[index]) return;
    var slide = slides[index];
    var type = slide.dataset ? slide.dataset.type : null;

    if (type === 'intro') {
        setTimeout(function() { var el = slide.querySelector('.intro-dove'); if(el) el.classList.add('show'); }, 100);
        setTimeout(function() { var el = slide.querySelector('.intro-memorial-text'); if(el) el.classList.add('show'); }, 1200);
        setTimeout(function() { var el = slide.querySelector('.intro-name'); if(el) el.classList.add('show'); }, 2200);
        setTimeout(function() { var el = slide.querySelector('.intro-dates'); if(el) el.classList.add('show'); }, 3800);
        setTimeout(function() { var el = slide.querySelector('.decorative-flowers'); if(el) el.classList.add('show'); }, 5200);
    }
    else if (type === 'message') {
        setTimeout(function() { var el = slide.querySelector('.message-flower'); if(el) el.classList.add('show'); }, 100);
        setTimeout(function() { var els = slide.querySelectorAll('.message-line'); if(els[0]) els[0].classList.add('show'); }, 1500);
        setTimeout(function() { var els = slide.querySelectorAll('.message-line'); if(els[1]) els[1].classList.add('show'); }, 5000);
        setTimeout(function() { var el = slide.querySelector('.message-signature'); if(el) el.classList.add('show'); }, 9000);
    }
    else if (type === 'verse') {
        setTimeout(function() { var el = slide.querySelector('.verse-icon'); if(el) el.classList.add('show'); }, 100);
        setTimeout(function() { var el = slide.querySelector('.verse-text'); if(el) el.classList.add('show'); }, 1500);
        setTimeout(function() { var el = slide.querySelector('.verse-reference'); if(el) el.classList.add('show'); }, 5000);
    }
    else if (type === 'final') {
        setTimeout(function() { var el = slide.querySelector('.final-portrait'); if(el) el.classList.add('show'); }, 100);
        setTimeout(function() { var el = slide.querySelector('.final-eternal'); if(el) el.classList.add('show'); }, 2500);
        setTimeout(function() { var el = slide.querySelector('.final-name'); if(el) el.classList.add('show'); }, 4500);
        setTimeout(function() { var el = slide.querySelector('.final-dates'); if(el) el.classList.add('show'); }, 6000);
        setTimeout(function() { var el = slide.querySelector('.final-flowers'); if(el) el.classList.add('show'); }, 7500);
    }
    else if (type === 'grid') {
        var photos = slide.querySelectorAll('.grid-photo');
        for (var i = 0; i < photos.length; i++) {
            (function(idx, photo) {
                setTimeout(function() { photo.classList.add('show'); }, 200 + (idx * 200));
            })(i, photos[i]);
        }
        var msgDelay = 200 + (photos.length * 200) + 500;
        setTimeout(function() { var el = slide.querySelector('.photo-message'); if(el) el.classList.add('show'); }, msgDelay);
    }
    else if (type === 'single') {
        setTimeout(function() { var el = slide.querySelector('.photo-container'); if(el) el.classList.add('show'); }, 100);
        setTimeout(function() { var el = slide.querySelector('.photo-message'); if(el) el.classList.add('show'); }, 1800);
    }
    else if (type === 'gallery') {
        setTimeout(function() { var el = slide.querySelector('.gallery-header'); if(el) el.classList.add('show'); }, 100);
        setTimeout(function() { var el = slide.querySelector('.gallery-thumbs-container'); if(el) el.classList.add('show'); }, 800);
        setTimeout(function() { var el = slide.querySelector('.gallery-hint'); if(el) el.classList.add('show'); }, 1500);
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

    if (currentSlide === totalSlides - 1) {
        currentSlide = 0;
        audioTimeOnPause = 0;
    }

    // Manejar audio de forma segura
    if (bgMusic) {
        try {
            bgMusic.currentTime = audioTimeOnPause;
            bgMusic.volume = 1;
            var playPromise = bgMusic.play();
            if (playPromise !== undefined) {
                playPromise.catch(function(e) {
                    console.log('Audio no pudo reproducirse:', e);
                });
            }
        } catch (e) {
            console.log('Error con audio:', e);
        }
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

    if (bgMusic) {
        audioTimeOnPause = bgMusic.currentTime;
        bgMusic.pause();
    }
}

// ==================== LIGHTBOX ====================
function openLightbox(photoSrc) {
    if (isPlaying) pauseSlideshow();

    var activeSlide = document.querySelector('.slide.active');
    currentSlidePhotos = [];

    if (activeSlide && activeSlide.dataset && activeSlide.dataset.type === 'gallery') {
        currentSlidePhotos = allPhotos.slice();
    } else if (activeSlide) {
        var elements = activeSlide.querySelectorAll('[data-photo-src]');
        for (var i = 0; i < elements.length; i++) {
            currentSlidePhotos.push(elements[i].dataset.photoSrc);
        }
    }

    currentLightboxIndex = currentSlidePhotos.indexOf(photoSrc);
    if (currentLightboxIndex === -1) currentLightboxIndex = 0;

    updateLightboxImage();
    if (lightbox) lightbox.classList.add('active');
}

function closeLightbox() {
    if (lightbox) lightbox.classList.remove('active');
}

function updateLightboxImage() {
    if (lightboxImg && currentSlidePhotos[currentLightboxIndex]) {
        lightboxImg.src = currentSlidePhotos[currentLightboxIndex];
    }
    if (lightboxCounter) {
        lightboxCounter.textContent = (currentLightboxIndex + 1) + ' / ' + currentSlidePhotos.length;
    }
    if (lightboxPrev) lightboxPrev.style.display = currentSlidePhotos.length > 1 ? 'block' : 'none';
    if (lightboxNext) lightboxNext.style.display = currentSlidePhotos.length > 1 ? 'block' : 'none';
}

function lightboxPrevPhoto() {
    currentLightboxIndex = (currentLightboxIndex - 1 + currentSlidePhotos.length) % currentSlidePhotos.length;
    updateLightboxImage();
}

function lightboxNextPhoto() {
    currentLightboxIndex = (currentLightboxIndex + 1) % currentSlidePhotos.length;
    updateLightboxImage();
}

// Lazy loading se maneja en loadSlideImages()

// ==================== PUNTO DE ENTRADA ====================
// SOLO mostrar el overlay inicial cuando el DOM esté listo
// Todo lo demás se carga después de hacer click en "Comenzar"
document.addEventListener('DOMContentLoaded', showInitialOverlay);
