const traduccionesNavbar = {
  es: {
    inicio: 'Inicio',
    productos: 'Productos',
    contacto: 'Contacto',
  },
  en: {
    inicio: 'Home',
    productos: 'Products',
    contacto: 'Contac',
  },
  pl: {
     inicio: 'Strona główna',
     productos: 'Produkty',
     contacto: 'Kontakt',
  }
};

const traduccionesFooter = {
  es: {
    redes: 'Síguenos en redes sociales:',
    pagos: 'Aceptamos',
    derechos: '© 2025 Derechos Reservados invierno.com'
  },
  en: {
    redes:  'Follow us on social media:',
    pagos: 'We accept:',
    derechos: '© 2025 All rights reserved invierno.com'
  },
  pl: {
    redes: 'Śledź nas w mediach społecznościowych:',
    pagos: 'Akceptujemy:',
    derechos: '© 2025 Wszelkie prawa zastrzeżone invierno.com'
  }
};

const cambiarIdiomaNavbar = (idioma) => {
      const t = traduccionesNavbar[idioma];
      if (!t) return;

      // Seleccionamos por orden en lugar de href
      const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

      if (navLinks.length >= 3) {
        navLinks[0].textContent = t.inicio;
        navLinks[1].textContent = t.productos;
        navLinks[2].textContent = t.contacto;

      }
};

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

const langLabels = ['es', 'en', 'pl'];
let currentIndex = 0;

const saveIdioma = localStorage.getItem('idioma');
if (saveIdioma) {
    const index = langLabels.indexOf(saveIdioma)
    currentIndex = index !== -1 ? index : 0;
}

const updateLabel = () => {
  const spans = document.querySelectorAll('#languageSwitch + label span');
  spans.forEach((span, i) => {
    if (i === currentIndex) {
      span.style.fontWeight = 'bold';
      span.style.color = 'gray';
    } else {
      span.style.fontWeight = 'normal';
      span.style.color = 'white';
    }
  });
}

const actualizarIdioma = () => {
  const idioma = langLabels[currentIndex];
  localStorage.setItem('idioma', idioma);
  cambiarIdiomaNavbar(idioma);
  cambiarIdiomaFooter(idioma);

};

const languageSwitch  = document.getElementById('languageSwitch');
languageSwitch.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % langLabels.length;
  updateLabel();
  actualizarIdioma();
});

document.addEventListener('DOMContentLoaded', () => {
  updateLabel();
  actualizarIdioma();
  






});

































































  