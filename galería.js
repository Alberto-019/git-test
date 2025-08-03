// Ajusta esto según tu carpeta de imágenes
// Objeto que asigna autores por número de imagen
const autoresPorImagen = {
    1: "Alberto García",
    2: "Alberto García",
    3: "Alberto García",
    4: "Alberto García",
    5: "Alberto García",
    6: "Alberto García",
    7: "Alberto García",
    8: "Alberto García",
    9: "Alberto García",
    10: "Alberto García",
    11: "Alberto García",
    12: "Alberto García",
    13: "Alberto García",
    14: "Valeria Pascacio",
    15: "Alberto García",
    16: "Alberto García",
    17: "Alberto García",
    18: "Alberto García",
    19: "Danae Nava",
    20: "Danae Nava",
    21: "Alberto García",
    22: "Alberto García",
    23: "Alberto García",
    24: "Alberto García",
    25: "Alberto García",
    26: "Alberto García",
    27: "Alberto García",
    28: "Alberto García",
    29: "Alberto García",
    30: "Alberto García",
    31: "Alberto García",
    32: "Alberto García",
    33: "Alberto García",
    34: "",
    35: "Fernanda Daza",
    36: "Adrián Talavera",
    37: "Adrián Talavera",
    38: "Alberto García",
    39: "Alberto García",
    40: "Alberto García",
    41: "Fernanda Daza",
    42: "",
    43: "Alberto García",
    44: "Alberto García",
    45: "Alberto García",
    46: "Alberto García",
    47: "Alberto García",
    48: "Alberto García",
    49: "Alberto García",
    50: "Alberto García",
    51: "Alberto García",
    52: "Alberto García",
    53: "Jairi Yamel",
    54: "Jairi Yamel",
    55: "Jairi Yamel",
    56: "Jairi Yamel",
    57: "Jairi Yamel",
    58: "Jairi Yamel",
    59: "Jairi Yamel",
    60: "Jairi Yamel",
    61: "Alberto García",
    62: "Alberto García",
    63: "Azucena García",
    64: "Azucena García",
    65: "Azucena García",
    66: "Fernanda Daza",
    67: "Azucena García",
    68: "Azucena García",
    69: "Azucena García",
    70: "Azucena García",
    71: "Azucena García",
    72: "Fernanda Daza",
    73: "Fernanda Daza",
    74: "Fernanda Daza",
    75: "Fernanda Daza",
    76: "Fernanda Daza",
    77: "Fernanda Daza",
    78: "Fernanda Daza",
    79: "Fernanda Daza",
    80: "Alberto García",
    81: "Azucena García",
    82: "Azucena García",
    83: "Azucena García",
    84: "Azucena García",
    85: "Azucena García",
    86: "Azucena García",
    87: "Azucena García",
    88: "Alberto García",
    89: "Azucena García",
    90: "Azucena García",
    91: "Azucena García",
    92: "Azucena García",
    93: "Azucena García",
    94: "Azucena García",
    95: "Azucena García",
    96: "Azucena García",
    97: "Azucena García",
    98: "Azucena García",
    99: "Alberto García",
    100: "Sara Nava",
    101: "Sara Nava",
    102: "Sara Nava",
    103: "Sara Nava",
    104: "Alberto García",
    105: "Alberto García",
    106: "Alberto García",
    107: "Alberto García",
    108: "Alberto García",
    109: "Alberto García",
    110: "Alberto García",
    111: "Alberto García",
    112: "Alberto García",
    113: "Ixtapa y Zihuatanejo",
    114: "Ixtapa y Zihuatanejo",
    115: "Ixtapa y Zihuatanejo",
    116: "Ixtapa y Zihuatanejo",
    117: "Ixtapa y Zihuatanejo",
    118: "Ixtapa y Zihuatanejo",
    119: "Ixtapa y Zihuatanejo",
    120: "Ixtapa y Zihuatanejo",
    // Agrega más si quieres (hasta 120 si quieres personalizarlas todas)
};

// Genera las imágenes y asigna autor según el número
const todasLasImagenes = Array.from({ length: 120 }, (_, i) => {
    const numero = i + 1;
    return {
        src: `img${numero}.jpg`,
        creador: autoresPorImagen[numero] || "Autor desconocido",
        numero: numero
    };
});
const porPagina = 30;

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('prev').addEventListener('click', handleNavigationButton);
    document.getElementById('next').addEventListener('click', handleNavigationButton);
    loadPageFromHash();
});

window.addEventListener('hashchange', loadPageFromHash);

function loadPageFromHash() {
    let page = 1;
    if (window.location.hash) {
        page = parseInt(window.location.hash.substring(1));
    }
    loadPage(page);
}

function handleNavigationButton(event) {
    event.preventDefault();
    const page = parseInt(event.target.getAttribute('data-page'));
    if (!isNaN(page)) {
        window.location.hash = page;
        window.scrollTo({ top: 0 });
    }
}

function loadPage(page) {
    const inicio = (page - 1) * porPagina;
    const fin = inicio + porPagina;
    const imagenesPagina = todasLasImagenes.slice(inicio, fin);

    const container = document.querySelector('.image-list');
    container.innerHTML = '';

    imagenesPagina.forEach((imgData) => {
        const template = document.getElementById('image-template');
        const clone = document.importNode(template.content, true);
        clone.querySelector('img').src = imgData.src;
        clone.querySelector('.info').textContent = `Imagen ${imgData.numero} | ${imgData.creador}`;
        container.appendChild(clone);
    });
    updateButton('prev', page > 1 ? page - 1 : null);
    updateButton('next', fin < todasLasImagenes.length ? page + 1 : null);
}


function updateButton(id, page) {
    const button = document.getElementById(id);
    if (page) {
        button.setAttribute('data-page', page);
        button.disabled = false;
        button.classList.remove('disabled');
    } else {
        button.removeAttribute('data-page');
        button.disabled = true;
        button.classList.add('disabled');
    }
}

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const prevBtn = document.getElementById("prev-lightbox");
const nextBtn = document.getElementById("next-lightbox");
let currentIndex = -1;

// Manejador de clic en imágenes (delegado)
document.querySelector('.image-list').addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
        const src = e.target.src;
        currentIndex = todasLasImagenes.findIndex(img => src.includes(img.src));
        if (currentIndex !== -1) {
            showLightboxImage(currentIndex);
        }
    }
});

function showLightboxImage(index) {
    lightboxImg.src = todasLasImagenes[index].src;
    lightbox.style.display = "flex";
}


// Cerrar lightbox
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = "none";
    }
});

// Navegar a la imagen anterior
prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (currentIndex > 0) {
        currentIndex--;
        showLightboxImage(currentIndex);
    }
});

// Navegar a la imagen siguiente
nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (currentIndex < todasLasImagenes.length - 1) {
        currentIndex++;
        showLightboxImage(currentIndex);
    }
});

// Opcional: Navegación con flechas del teclado
document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {
        if (e.key === "ArrowLeft" && currentIndex > 0) {
            currentIndex--;
            showLightboxImage(currentIndex);
        } else if (e.key === "ArrowRight" && currentIndex < todasLasImagenes.length - 1) {
            currentIndex++;
            showLightboxImage(currentIndex);
        } else if (e.key === "Escape") {
            lightbox.style.display = "none";
        }
    }
});

// Botón de cerrar con la X
document.getElementById("close-lightbox").addEventListener("click", () => {
    lightbox.style.display = "none";
});
