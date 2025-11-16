// === Traducciones NAVBAR ===
const traduccionesNavbar = {
  es: {
    inicio: 'Inicio',
    productos: 'Productos',
    contacto: 'Contacto',
  },
  en: {
    inicio: 'Home',
    productos: 'Products',
    contacto: 'Contact',
  },
  pl: {
    inicio: 'Strona główna',
    productos: 'Produkty',
    contacto: 'Kontakt',
  }
};

// === Traducciones FOOTER ===
const traduccionesFooter = {
  es: {
    redes: 'Síguenos en redes sociales:',
    pagos: 'Aceptamos',
    derechos: '© 2025 Derechos Reservados invierno.com'
  },
  en: {
    redes: 'Follow us on social media:',
    pagos: 'We accept:',
    derechos: '© 2025 All rights reserved invierno.com'
  },
  pl: {
    redes: 'Śledź nas w mediach społecznościowych:',
    pagos: 'Akceptujemy:',
    derechos: '© 2025 Wszelkie prawa zastrzeżone invierno.com'
  }
};

// === Traducciones SECCIONES PRINCIPALES ===
const textos = {
  es: {
    Productos_Desctados: 'Productos Destacados',
    Ropa_para_Hombre_y_Mujer: 'Ropa para Hombre y Mujer'
  },
  en: {
    Productos_Desctados: 'Featured Products',
    Ropa_para_Hombre_y_Mujer: 'Clothing for Men and Women'
  },
  pl: {
    Productos_Desctados: 'Wyróżnione produkty',
    Ropa_para_Hombre_y_Mujer: 'Odzież dla mężczyzn i kobiet'
  }
};

// === Traducciones FORMULARIO DE CONTACTO ===
const traduccionesContacto = {
  es: {
    contacto_titulo: 'Contáctanos:',
    contacto_nombre: 'Nombre',
    contacto_correo: 'Correo',
    contacto_mensaje: 'Mensaje',
    contacto_enviar: 'Enviar'
  },
  en: {
    contacto_titulo: 'Contact us:',
    contacto_nombre: 'Name',
    contacto_correo: 'Email',
    contacto_mensaje: 'Message',
    contacto_enviar: 'Send'
  },
  pl: {
    contacto_titulo: 'Skontaktuj się z nami:',
    contacto_nombre: 'Imię',
    contacto_correo: 'Email',
    contacto_mensaje: 'Wiadomość',
    contacto_enviar: 'Wyślij'
  }
};

const traduccionesCart = {
  es: {
    cartTitle: 'Tu Carrito',
    totalText: 'Total',
    payButton: 'Pagar',
    emptyCart: 'Tu carrito está vacío',
    pagoExitoso: '✅ Pago exitoso'
  },
  en: {
    cartTitle: 'Your Cart',
    totalText: 'Total',
    payButton: 'Pay',
    emptyCart: 'Your cart is empty',
    pagoExitoso: '✅ Payment successful'
  },
  pl: {
    cartTitle: 'Twój Koszyk',
    totalText: 'Razem',
    payButton: 'Zapłać',
    emptyCart: 'Twój koszyk jest pusty',
    pagoExitoso: '✅ Płatność zakończona'
  }
};


const mensajesFormulario = {
  es: {
    nombreRequerido: 'Por favor ingresa tu nombre.',
    correoRequerido: 'Por favor ingresa tu correo.',
    correoInvalido: 'El correo no es válido.',
    mensajeRequerido: 'Por favor escribe un mensaje.',
    exito: '✅ Mensaje enviado con éxito',
  },

  en: {
    nombreRequerido: 'Please enter your name.',
    correoRequerido: 'Please enter your email.',
    correoInvalido: 'Invalid email address.',
    mensajeRequerido: 'Please write a message.',
    exito: '✅ Message sent successfully!'
  },

  pl: {
    nombreRequerido: 'Proszę podać swoje imię.',
    correoRequerido: 'Proszę podać swój adres e-mail.',
    correoInvalido: 'Nieprawidłowy adres e-mail.',
    mensajeRequerido: 'Proszę napisać wiadomość.',
    exito: '✅ Wiadomość została wysłana pomyślnie!'
  }
};


function traducirCarrito(idioma = 'es') {
  const textos = traduccionesCart[idioma] || traduccionesCart['es'];

  // 🛒 Título del carrito
  const titulo = document.querySelector('#shopping-cart h2');
  if (titulo) titulo.textContent = textos.cartTitle;

  // 💰 Texto del total (manteniendo el monto actual)
  const totalTexto = document.querySelector('.total-carrito');
  if (totalTexto) {
    const monto = totalTexto.textContent.match(/\$\d+(?:\.\d{2})?/)?.[0] || "$0.00";
    totalTexto.textContent = `${textos.totalText}: ${monto}`;
  }

  // ✅ Botón de pagar
  const botonPagar = document.getElementById('btn-pagar');
  if (botonPagar) botonPagar.textContent = textos.payButton;

  // 💬 Mensaje de pago exitoso
  const mensajePago = document.querySelector('.mensaje-pago');
  if (mensajePago && mensajePago.textContent.trim() !== '') {
    mensajePago.textContent = textos.pagoExitoso;
  }

  // 🧺 Mensaje de carrito vacío si no hay productos
  const listaCarrito = document.querySelector('.lista-carrito');
  const mensajeVacio = document.querySelector('.mensaje-carrito-vacio');
  if (listaCarrito && mensajeVacio && listaCarrito.children.length === 0) {
    mensajeVacio.textContent = textos.emptyCart;
  }
}



// === CONFIGURACIÓN DE IDIOMA ===
const langLabels = ['es', 'en', 'pl'];
let currentIndex = 0;

// Cargar idioma desde localStorage
const savedIdioma = localStorage.getItem('idioma');
if (savedIdioma) {
  const index = langLabels.indexOf(savedIdioma);
  currentIndex = index !== -1 ? index : 0;
}

// === FUNCIONES DE TRADUCCIÓN ===

// Cambiar estilo visual del idioma activo
const updateLabel = () => {
  const spans = document.querySelectorAll('#languageSwitch + label span');
  spans.forEach((span, i) => {
    span.style.fontWeight = i === currentIndex ? 'bold' : 'normal';
    span.style.color = i === currentIndex ? 'gray' : 'white';
  });
};

// Navbar
const cambiarIdiomaNavbar = (idioma) => {
  const t = traduccionesNavbar[idioma];
  if (!t) return;

  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  if (navLinks.length >= 3) {
    navLinks[0].textContent = t.inicio;
    navLinks[1].textContent = t.productos;
    navLinks[2].textContent = t.contacto;
  }
};

// Footer
const cambiarIdiomaFooter = (idioma) => {
  const t = traduccionesFooter[idioma];
  if (!t) return;

  const redes = document.getElementById('footerRedes');
  const pagos = document.getElementById('footerPagos');
  const derechos = document.getElementById('footerDerechos');

  if (redes) redes.textContent = t.redes;
  if (pagos) pagos.textContent = t.pagos;
  if (derechos) derechos.textContent = t.derechos;
};

// Secciones principales
const cambiarIdiomaTextos = (idioma) => {
  const t = textos[idioma];
  if (!t) return;

  const sliderTitle = document.querySelector('.slider-title');
  const cardTitle = document.querySelector('.card-title');

  if (sliderTitle) sliderTitle.textContent = t.Productos_Desctados;
  if (cardTitle) cardTitle.textContent = t.Ropa_para_Hombre_y_Mujer;
};

// Formulario de contacto
const cambiarIdiomaContacto = (idioma) => {
  const t = traduccionesContacto[idioma];
  if (!t) return;

  document.querySelectorAll('[data-key]').forEach(el => {
    const key = el.getAttribute('data-key');
    if (t[key]) el.textContent = t[key];
  });
};

// Cambiar idioma general
const actualizarIdioma = () => {
  const idioma = langLabels[currentIndex];
  localStorage.setItem('idioma', idioma);

  cambiarIdiomaNavbar(idioma);
  cambiarIdiomaFooter(idioma);
  cambiarIdiomaTextos(idioma);
  cambiarIdiomaContacto(idioma);
  traducirCarrito(idioma);
};

// === EVENTOS ===

// Cambio de idioma por botón
const languageSwitch = document.getElementById('languageSwitch');
languageSwitch.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % langLabels.length;
  updateLabel();
  actualizarIdioma();
});

// Al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  updateLabel();
  actualizarIdioma();
});




















































