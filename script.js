/* ==========================================================================
   SOPORTE TÉCNICO MTY 2600  INTERACTIVIDAD
   Aquí se concentra el comportamiento de la página; la apariencia está en CSS.
   Para añadir un servicio nuevo: crea una tarjeta en HTML y un objeto en serviceData.
   ========================================================================== */

"use strict";

/* Base estable para recursos locales en GitHub Pages (incluye la subruta del repositorio). */
const SITE_SCRIPT_URL = document.currentScript ? document.currentScript.src : window.location.href;
const SITE_ASSETS_BASE = new URL("assets/", SITE_SCRIPT_URL);

/* 1. CATÁLOGO DE FICHAS DE SERVICIOS.
   Cada propiedad (computo, hardware, software, etc.) es el identificador interno.
   Debe coincidir con data-service-id en la tarjeta HTML.
   - number: etiqueta pequeña que aparece sobre el título.
   - title y lead: nombre y resumen del servicio.
   - details: arreglo de puntos que se muestra como lista.
   - process y note: explicación del proceso y aviso adicional.
   - images: arreglo de pares [URL, texto alternativo].
   Puedes editar los textos aquí sin reconstruir la función que dibuja las fichas. */
const serviceData = {
    computo: {
        number: "01 / CÓMPUTO",
        title: "Computadoras y laptops",
        lead: "Evaluación técnica para identificar fallas, mejorar el rendimiento y prolongar la vida útil de equipos de escritorio y portátiles.",
        details: [
            "Diagnóstico de fallas de encendido y funcionamiento.",
            "Mantenimiento preventivo y limpieza interna.",
            "Revisión de temperatura, ventilación y rendimiento.",
            "Orientación para reparación o actualización del equipo."
        ],
        process: "Se revisan los síntomas y el estado general del equipo. Después se explican los hallazgos y las opciones posibles antes de realizar trabajos adicionales.",
        images: [
            ["assets/service-images/computo-1.jpg", 'Interior de computadora con iluminación RGB'],
            ["assets/service-images/computo-2.jpg", 'Técnico revisando un equipo'],
            ["assets/service-images/computo-3.jpg", 'Computadora de escritorio y componentes'],
            ["assets/service-images/computo-4.jpg", 'Laptop para trabajo y diagnóstico'],
        ],
        note: "La reparación y el tiempo de servicio dependen del diagnóstico, el estado del equipo y la disponibilidad de refacciones."
    },
    hardware: {
        number: "02 / HARDWARE",
        title: "Hardware y periféricos",
        lead: "Instalación, sustitución y configuración de componentes internos y dispositivos externos para que el equipo funcione de forma adecuada.",
        details: [
            "Instalación o actualización de memoria RAM y unidades de almacenamiento.",
            "Revisión de componentes y compatibilidad.",
            "Configuración de impresoras, monitores y periféricos.",
            "Conexión y pruebas básicas después de la instalación."
        ],
        process: "Se comprueba la compatibilidad del componente o periférico con el equipo y se definen las pruebas necesarias para verificar su funcionamiento.",
        images: [
            ["assets/service-images/hardware-1.jpg", 'Tarjeta gráfica y componentes'],
            ["assets/service-images/hardware-2.jpg", 'Monitor y periféricos de computadora'],
            ["assets/service-images/hardware-3.jpg", 'Componentes internos de equipo'],
            ["assets/service-images/hardware-4.jpg", 'Componentes y accesorios informáticos'],
        ],
        note: "Antes de adquirir componentes, conviene confirmar modelo, compatibilidad y disponibilidad."
    },
    software: {
        number: "03 / SOFTWARE",
        title: "Sistemas operativos y software",
        lead: "Asistencia para instalar, configurar y resolver incidencias de sistemas operativos y aplicaciones de uso personal o profesional.",
        details: [
            "Instalación y configuración de sistemas operativos compatibles.",
            "Instalación de aplicaciones y controladores.",
            "Diagnóstico de errores, bloqueos y problemas de inicio.",
            "Recomendaciones de actualización y buenas prácticas."
        ],
        process: "Se identifica el sistema, el mensaje de error y el uso del equipo. Las acciones se proponen de acuerdo con la compatibilidad y la información disponible.",
        images: [
            ["assets/service-images/software-1.jpg", 'Windows 11'],
            ["assets/service-images/software-3.jpg", 'macOS con fondo de escritorio distintivo'],
            ["assets/service-images/software-2.jpg", 'Linux con el pingüino Tux'],
            ["assets/service-images/software-4.jpg", 'Microsoft Office: Word, Excel y PowerPoint'],
        ],
        note: "La instalación de software con licencia requiere que el cliente disponga de una licencia válida cuando corresponda."
    },
    redes: {
        number: "04 / CONECTIVIDAD",
        title: "Redes y conectividad",
        lead: "Configuración y revisión de redes cableadas e inalámbricas para mejorar la conexión entre equipos, dispositivos y servicios.",
        details: [
            "Configuración básica de routers y puntos de acceso Wi-Fi.",
            "Revisión de cobertura y problemas de conectividad.",
            "Organización y diagnóstico de cableado de red.",
            "Conexión de equipos y dispositivos en hogares o negocios."
        ],
        process: "Se revisa el alcance del espacio, los equipos disponibles y el tipo de conexión. Con esa información se identifican posibles ajustes o necesidades de instalación.",
        images: [
            ["assets/service-images/redes-1.jpg", 'Infraestructura de red y servidores'],
            ["assets/service-images/redes-2.jpg", 'Router y conectividad inalámbrica'],
            ["assets/service-images/redes-3.jpg", 'Conexiones y cableado de red'],
            ["assets/service-images/redes-4.jpg", 'Equipo de conectividad'],
        ],
        note: "El rendimiento inalámbrico puede variar por la distribución del inmueble, interferencias y el servicio contratado."
    },
    datos: {
        number: "05 / INFORMACIÓN",
        title: "Recuperación de datos",
        lead: "Evaluación inicial y orientación para intentar recuperar archivos importantes desde medios de almacenamiento con fallas o borrados accidentales.",
        details: [
            "Evaluación de discos y unidades de almacenamiento.",
            "Orientación ante borrado accidental o errores de lectura.",
            "Recomendaciones para respaldos y prevención de pérdida.",
            "Identificación de señales que requieren atención especializada."
        ],
        process: "Se recopila información sobre el dispositivo y el incidente. Si el medio presenta ruidos, golpes o fallas físicas, se recomienda evitar su uso para no agravar el daño.",
        images: [
            ["assets/service-images/datos-1.jpg", 'Estación de trabajo para recuperación de datos'],
            ["assets/service-images/datos-2.jpg", 'Circuitos electrónicos y almacenamiento'],
            ["assets/service-images/datos-3.jpg", 'Pantalla con datos y código'],
            ["assets/service-images/datos-4.jpg", 'Unidad de almacenamiento y computadora'],
        ],
        note: "La recuperación no puede garantizarse en todos los casos. Si los datos son críticos, evita seguir utilizando la unidad y solicita una evaluación."
    },
    web: {
        number: "06 / DESARROLLO",
        title: "Desarrollo Web y Hosting",
        lead: "Creación y puesta en línea de sitios web adaptables a móviles, con estructura clara, estilos personalizados e interactividad.",
        details: [
            "Diseño y maquetación con HTML y CSS.",
            "Interactividad del lado del navegador con JavaScript.",
            "Integración de formularios y secciones informativas.",
            "Orientación para dominio, alojamiento y publicación."
        ],
        process: "Se definen objetivo, público, contenido y funciones. Después se organiza la estructura del sitio y se implementa el diseño para distintos tamaños de pantalla.",
        images: [
            ["assets/service-images/web-1.jpg", 'Trabajo digital y diseño web'],
            ["assets/service-images/web-2.jpg", 'Diseño de páginas web'],
            ["assets/service-images/web-3.jpg", 'Diseño de sitio web en pantalla'],
            ["assets/service-images/web-4.jpg", 'Desarrollo web y experiencia digital'],
        ],
        note: "El alcance, las fechas y los costos se establecen según las páginas, funciones, contenido y servicios externos requeridos."
    },
    acceso: {
        number: "07 / CONTROL DE ACCESO",
        title: "Accesos magnéticos y videoporteros",
        lead: "Soluciones para controlar entradas y facilitar la comunicación entre visitantes y ocupantes de una vivienda, oficina o negocio.",
        details: [
            "Orientación sobre cerraduras electromagnéticas y accesorios.",
            "Instalación y configuración de videoporteros compatibles.",
            "Revisión de puntos de acceso y necesidades de uso.",
            "Pruebas de funcionamiento y explicación básica del sistema."
        ],
        process: "Se evalúan la puerta, el suministro eléctrico, el tipo de acceso y las necesidades de los usuarios para definir los equipos compatibles.",
        images: [
            ["assets/service-images/acceso-1.jpg", 'Sistema de acceso electrónico'],
            ["assets/service-images/acceso-2.jpg", 'Instalación de control de acceso'],
            ["assets/service-images/acceso-3.jpg", 'Seguridad digital y control de acceso'],
            ["assets/service-images/acceso-4.jpg", 'Dispositivos de seguridad electrónica'],
        ],
        note: "La instalación depende de las condiciones físicas de la puerta, la infraestructura existente y la compatibilidad de los dispositivos."
    },
    cctv: {
        number: "08 / VIDEOVIGILANCIA",
        title: "Cámaras de seguridad CCTV",
        lead: "Planificación y configuración de sistemas de videovigilancia para observar accesos, áreas de trabajo y espacios de interés.",
        details: [
            "Orientación para seleccionar cámaras y grabadores.",
            "Planeación de ubicación y ángulos de visión.",
            "Configuración de grabación y visualización compatible.",
            "Revisión de conectividad para acceso remoto cuando el sistema lo permita."
        ],
        process: "Se identifican las áreas que se desean vigilar, la iluminación, el cableado posible y las necesidades de almacenamiento antes de elegir los componentes.",
        images: [
            ["assets/service-images/cctv-1.jpg", 'Cámara de videovigilancia'],
            ["assets/service-images/cctv-2.jpg", 'Sistema de cámaras de seguridad'],
            ["assets/service-images/cctv-3.jpg", 'Cámara de seguridad exterior'],
            ["assets/service-images/cctv-4.jpg", 'Equipo de vigilancia y monitoreo'],
        ],
        note: "La cobertura final depende de la ubicación, iluminación, resolución, lente, cableado y capacidad del grabador."
    },
    cfe: {
        number: "09 / GESTORÍA",
        title: "Trámites y gestoría ante CFE",
        lead: "Orientación y apoyo administrativo para identificar los pasos y la documentación que puede requerirse en gestiones relacionadas con el servicio eléctrico.",
        details: [
            "Orientación inicial sobre el trámite que se desea realizar.",
            "Revisión de la información y documentación disponible.",
            "Ayuda para organizar datos necesarios para una solicitud.",
            "Seguimiento informativo conforme al alcance acordado."
        ],
        process: "Primero se identifica el tipo de gestión y se consulta qué requisitos aplican. Los requisitos pueden cambiar según el trámite y la situación del servicio.",
        images: [
            ["assets/service-images/cfe-1.jpg", 'Líneas de transmisión eléctrica'],
            ["assets/service-images/cfe-2.jpg", 'Infraestructura de energía'],
            ["assets/service-images/cfe-3.jpg", 'Paneles solares y generación eléctrica'],
            ["assets/service-images/cfe-4.jpg", 'Equipo técnico y sistemas eléctricos'],
        ],
        note: "La resolución depende de la autoridad y de los requisitos oficiales aplicables. No se garantiza aprobación ni se sustituye la atención oficial de CFE."
    }

};

/* 1.1 VALIDACIÓN DE LAS 36 IMÁGENES LOCALES.
   Cada servicio tiene cuatro archivos propios extraídos de la imagen de referencia
   aprobada. Los nombres de archivo incluyen servicio y posición, por lo que no se
   reutiliza una fotografía entre fichas y no dependemos de servidores externos. */
const allGalleryPaths = Object.values(serviceData).flatMap(service => service.images.map(image => image[0]));
if (allGalleryPaths.length !== 36 || new Set(allGalleryPaths).size !== 36) {
    console.error("La galería debe contener exactamente 36 archivos de imagen únicos.");
}
Object.entries(serviceData).forEach(([serviceId, service]) => {
    if (service.images.length !== 4) {
        console.error(`El servicio ${serviceId} no tiene exactamente cuatro imágenes.`);
    }
});

/* 2. Guardamos referencias a elementos frecuentes del HTML. */
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");
const detailSection = document.getElementById("detalle-servicio");
const detailContent = document.getElementById("serviceDetailContent");
const closeDetailButton = document.getElementById("closeDetail");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const backTopButton = document.getElementById("backTop");

/* 3. Crea elementos de texto de forma segura.
   Se utiliza textContent para evitar interpretar textos como código HTML. */
/**
 * Crea un elemento HTML de texto.
 * @param {string} tagName - Etiqueta que se creará, por ejemplo "p", "h2" o "li".
 * @param {string} className - Clase CSS opcional para aplicar estilos.
 * @param {string} text - Texto visible; se inserta con textContent por seguridad.
 * @returns {HTMLElement} El elemento listo para incorporarse al documento.
 */
function createTextElement(tagName, className, text) {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    element.textContent = text;
    return element;
}

/* 4. Construye la ficha de un servicio y la inserta en el panel de detalle.
   La estructura visual está definida en styles.css; aquí se agregan los datos. */
/**
 * Genera y muestra la ficha completa del servicio seleccionado.
 * @param {string} serviceId - Clave del servicio dentro de serviceData; debe coincidir
 * con el atributo data-service-id de la tarjeta correspondiente.
 * Esta función construye el contenido, prepara la galería y activa la vista de detalle.
 */
function showServiceDetails(serviceId) {
    const service = serviceData[serviceId];

    // Si la clave no existe, no intentamos construir una ficha vacía.
    if (!service) return;

    // Limpiar el contenido anterior permite reutilizar el mismo panel para los nueve servicios.
    detailContent.replaceChildren();

    const layout = document.createElement("div");
    layout.className = "detail-layout";

    const copy = document.createElement("div");
    copy.className = "detail-copy";
    copy.append(
        createTextElement("p", "service-number", service.number),
        createTextElement("h2", "", service.title),
        createTextElement("p", "detail-lead", service.lead),
        createTextElement("h3", "", "¿Qué incluye?")
    );

    // La lista se genera a partir del arreglo details de cada servicio.
    const list = document.createElement("ul");
    list.className = "detail-list";
    service.details.forEach((item) => {
        list.appendChild(createTextElement("li", "", item));
    });
    copy.appendChild(list);
    copy.appendChild(createTextElement("h3", "", "¿Cómo se atiende?"));
    copy.appendChild(createTextElement("p", "", service.process));
    copy.appendChild(createTextElement("div", "detail-note", service.note));

    // Galería de imágenes relacionada con el servicio seleccionado.
    const gallery = document.createElement("div");
    gallery.className = "detail-gallery";
    const figure = document.createElement("figure");

    service.images.forEach((imageData, index) => {
        const image = document.createElement("img");
        image.src = new URL(imageData[0], SITE_SCRIPT_URL).href;
        image.alt = imageData[1];
        image.loading = index === 0 ? "eager" : "lazy";
        image.decoding = "async";

        // Las fotografías se incluyen dentro del ZIP y no requieren internet.
        // Si alguien borra accidentalmente un archivo, se usa una ilustración local
        // del mismo servicio y posición para evitar dejar un recuadro vacío.
        const fallbackPath = new URL(`assets/fallbacks/${serviceId}-${index + 1}.svg`, SITE_SCRIPT_URL).href;
        image.addEventListener("error", () => {
            if (image.dataset.usingFallback === "true") {
                // Protección final si incluso el archivo local fue movido o borrado.
                image.alt = `${service.title} — ilustración no disponible`;
                image.removeAttribute("src");
                image.classList.add("image-fallback-unavailable");
                return;
            }
            image.dataset.usingFallback = "true";
            image.src = fallbackPath;
        });

        figure.appendChild(image);
    });

    figure.appendChild(createTextElement("figcaption", "", "Imágenes ilustrativas; los equipos y las instalaciones pueden variar."));
    gallery.appendChild(figure);

    // El botón de contacto lleva el servicio seleccionado al formulario.
    const contactButton = createTextElement("a", "button button-primary", "Consultar este servicio →");
    contactButton.href = "#contacto";
    contactButton.addEventListener("click", () => {
        const serviceSelect = document.getElementById("servicio");
        if (serviceSelect) {
            const matchingOption = Array.from(serviceSelect.options).find((option) =>
                option.text.toLowerCase().includes(service.title.toLowerCase())
                || service.title.toLowerCase().includes(option.text.toLowerCase())
            );
            // Algunos nombres del catálogo son abreviados; si no hay coincidencia, se conserva la selección actual.
            if (matchingOption) serviceSelect.value = matchingOption.value || matchingOption.text;
        }
    });
    copy.appendChild(contactButton);

    layout.append(copy, gallery);
    detailContent.appendChild(layout);

    // Mostrar la sección y desplazarla a la vista para que el usuario note el cambio.
    detailSection.hidden = false;
    // Registra la ficha en el historial para que la flecha Atrás la cierre sin salir del sitio.
    if (!document.body.classList.contains("service-detail-mode")) {
        history.pushState({ serviceDetailOpen: true }, "", window.location.pathname + window.location.search + "#servicio-" + encodeURIComponent(serviceId));
    }
    // Activa una vista exclusiva: el catálogo, pie y demás secciones desaparecen; la cabecera permanece visible.
    // El usuario consulta únicamente el servicio seleccionado, como si fuera otra pantalla.
    document.body.classList.add("service-detail-mode");
    document.body.style.overflow = "hidden";
    detailSection.scrollTop = 0;
    closeDetailButton?.focus();
}

/* 5. EVENTOS PARA ABRIR DETALLES.
   Se asigna un controlador a cada botón .service-open. El atributo data-service-id
   indica qué objeto de serviceData debe mostrarse al pulsar el botón. */
document.querySelectorAll(".service-open").forEach((button) => {
    button.addEventListener("click", () => showServiceDetails(button.dataset.serviceId));
});

/* 5.1. FILTROS DEL CATÁLOGO.
   Cada botón de filtro lee data-filter y lo compara con data-category de las tarjetas.
   La opción "todos" muestra todas las tarjetas; las demás muestran su categoría. */
/* Cada botón muestra únicamente
   las tarjetas de su categoría sin eliminar los datos ni la ficha de servicio. */
document.querySelectorAll(".service-filter").forEach((filterButton) => {
    filterButton.addEventListener("click", () => {
        const selected = filterButton.dataset.filter;
        document.querySelectorAll(".service-filter").forEach((button) => {
            button.setAttribute("aria-pressed", String(button === filterButton));
        });
        document.querySelectorAll(".service-card").forEach((card) => {
            card.hidden = selected !== "todos" && card.dataset.category !== selected;
        });
    });
});


/* 6. También se puede abrir la ficha al pulsar la fotografía o el texto principal
   de una tarjeta. El botón ya tiene su propio evento; este filtro evita duplicarlo. */
document.querySelectorAll(".service-card").forEach((card) => {
    card.addEventListener("click", (event) => {
        if (event.target.closest(".service-open")) return;

        const clickedArea = event.target.closest(
            ".service-image, .service-number, h3, .service-body > p"
        );
        if (!clickedArea) return;

        const openButton = card.querySelector(".service-open");
        if (openButton) showServiceDetails(openButton.dataset.serviceId);
    });
});

/* 7. Función única para cerrar la ficha y restaurar el catálogo. */
/**
 * Cierra la ficha del servicio activo y devuelve al usuario al catálogo.
 * Restaura el desplazamiento normal de la página y quita la clase de modo detalle.
 */
function closeServiceDetails(options = {}) {
    if (!detailSection || detailSection.hidden) return;

    const { scrollToServices = true, restoreHistory = true } = options;
    detailSection.hidden = true;
    document.body.classList.remove("service-detail-mode");
    document.body.style.overflow = "";

    // Si se cerró mediante un botón o navegación interna, limpia el estado añadido.
    // En popstate no se vuelve a modificar el historial.
    if (restoreHistory && history.state?.serviceDetailOpen) {
        history.back();
    } else if (window.location.hash.startsWith("#servicio-")) {
        history.replaceState(history.state, "", window.location.pathname + window.location.search);
    }

    if (scrollToServices) {
        document.getElementById("servicios")?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}

// El botón «Cerrar ficha» utiliza la misma función que la tecla Escape.
if (closeDetailButton) {
    closeDetailButton.addEventListener("click", () => closeServiceDetails());
}

/* 7.1. La flecha Atrás del navegador cierra la ficha de servicio. */
window.addEventListener("popstate", () => {
    if (detailSection && !detailSection.hidden) {
        closeServiceDetails({ scrollToServices: false, restoreHistory: false });
    }
});

/* 7.2. El logotipo siempre devuelve al inicio, incluso desde una ficha. */
const brandLink = document.querySelector(".header .brand");
if (brandLink) {
    brandLink.addEventListener("click", (event) => {
        event.preventDefault();
        if (detailSection && !detailSection.hidden) {
            closeServiceDetails({ scrollToServices: false, restoreHistory: false });
        }
        history.replaceState(null, "", window.location.pathname + window.location.search + "#inicio");
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/* 7.3. El menú de cabecera sigue operativo en las fichas y lleva a la sección elegida. */
if (navigation) {
    navigation.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = decodeURIComponent(link.getAttribute("href").slice(1));
            const target = document.getElementById(targetId);
            if (!target) return;
            event.preventDefault();

            navigation.classList.remove("open");
            if (menuToggle) {
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Abrir menú");
            }
            if (detailSection && !detailSection.hidden) {
                closeServiceDetails({ scrollToServices: false, restoreHistory: false });
            }
            history.replaceState(null, "", window.location.pathname + window.location.search + "#" + targetId);
            requestAnimationFrame(() => target.scrollIntoView({ behavior: "smooth", block: "start" }));
        });
    });
}

/* 8. Escape (Esc) cierra la ficha solo cuando está abierta. */
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.body.classList.contains("service-detail-mode")) {
        closeServiceDetails();
    }
});

/* 9. Menú adaptable: alterna la clase open y actualiza aria-expanded para accesibilidad. */
if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    });

    // En móvil, al elegir un enlace se cierra el menú para dejar visible el contenido.
    navigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navigation.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Abrir menú");
        });
    });
}

/* 10. FORMULARIO DE CONTACTO.
   No guarda información en una base de datos ni la envía a un servidor propio.
   Valida los campos, arma un mensaje legible y abre WhatsApp con el texto precargado.
   Cambia WHATSAPP_NUMBER si el negocio utiliza otro número internacional. */
if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Evita que el navegador recargue la página al enviar el formulario.

        if (!contactForm.reportValidity()) return;

        const formData = new FormData(contactForm);
        const name = formData.get("nombre").toString().trim();
        const email = formData.get("correo").toString().trim();
        const service = formData.get("servicio").toString().trim();
        const message = formData.get("mensaje").toString().trim();

        const whatsappMessage = [
            "Hola, Soporte Técnico MTY 2600.",
            "",
            `Nombre: ${name}`,
            `Correo: ${email}`,
            `Servicio de interés: ${service}`,
            `Solicitud: ${message}`
        ].join("\n");

        const whatsappNumber = "528120217154";
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

        if (formStatus) formStatus.textContent = "Se abrirá WhatsApp para que revises y envíes el mensaje.";
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    });
}

/* 11. Año actual automático: no hace falta editar el pie de página cada enero. */
const yearElement = document.getElementById("year");
if (yearElement) yearElement.textContent = new Date().getFullYear();

/* 12. Mostrar el botón "volver al inicio" solo después de desplazarse hacia abajo. */
/**
 * Actualiza la visibilidad del botón «volver arriba» según el desplazamiento vertical.
 * Se llama al desplazarse y también puede ejecutarse al inicializar la página.
 */
function updateBackToTop() {
    if (backTopButton) {
        backTopButton.classList.toggle("visible", window.scrollY > 450);
    }
}
window.addEventListener("scroll", updateBackToTop, { passive: true });
updateBackToTop();

if (backTopButton) {
    backTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/* 13. Aparición suave de secciones.
   IntersectionObserver evita comprobar continuamente la posición de cada elemento.
   Si el navegador no lo soporta, el contenido permanece visible por defecto. */
document.documentElement.classList.add("js-ready");
if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target); // Se anima una sola vez por elemento.
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
} else {
    document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
}

/* 14. Navegación activa según la sección visible.
   Es una mejora visual opcional: resalta Presentación, Servicios, Nosotros o Contacto. */
const sectionsForNav = ["presentacion", "servicios", "nosotros", "contacto"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

if ("IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            navigation?.querySelectorAll(".nav-link").forEach((link) => {
                link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
            });
        });
    }, { rootMargin: "-35% 0px -55% 0px" });

    sectionsForNav.forEach((section) => navObserver.observe(section));
}
