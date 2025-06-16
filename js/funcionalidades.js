const themeSwitch = () => {
    // Referencia al checkobox del interruptor
    const themeToggle = document.getElementById('themeSwitch');

    // Revisa  si hay un tema guarado en localStorage
    const currentTheme = localStorage.getItem('theme') || 'light';


    // Al cargar la página, aplica el tema guarado
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme'); // Activa el tema oscuro
        themeToggle.checked = true;
        // Mueve el switch a 'on'    
    } else {
        document.body.classList.add('light-theme');  // Por defecto  'claro'
        themeToggle.checked = false; // Switch en modo 'off'
    }

    // Evento para cambiar el tema al hacer clic en el interruptor
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            // Activar el modo oscuro
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme'); // ← Correcto
            localStorage.setItem('theme', 'dark'); // Guarda el tema oscuro
        } else {
            // Activar el modo claro
            document.body.classList.remove('dark-theme');
            document.body.classList.add('ligth-theme');
            localStorage.setItem('theme', 'light'); // Guarda el tema claro
        }
    })
};

// Ejectua el la función cuando el DOM esté cargando
document.addEventListener('DOMContentLoaded', themeSwitch);



















