// Función para actualizar colores de todos los elementos incluyendo los dinámicos
const updateTexts = () => {
    const theme = localStorage.getItem('theme') || 'light';
    const color = theme === 'light' ? 'black' : 'white';
    document.querySelectorAll(
        'h3, label.form-label, input, textarea, .invalid-feedback, #mensaje-exito, .total-carrito'
    ).forEach(el => {
        if (el) el.style.color = color;
    });
};

// Función principal del switch de tema
const themeSwitch = () => {
    const themeToggle = document.getElementById('themeSwitch');
    if (!themeToggle) return;

    let currentTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(currentTheme + '-theme');
    themeToggle.checked = currentTheme === 'dark';

    updateTexts();

    themeToggle.addEventListener('change', () => {
        const theme = themeToggle.checked ? 'dark' : 'light';
        document.body.classList.remove('light-theme', 'dark-theme');
        document.body.classList.add(theme + '-theme');
        localStorage.setItem('theme', theme);
        updateTexts();
    });
};

// Llamar al cargar la página
document.addEventListener('DOMContentLoaded', themeSwitch);












