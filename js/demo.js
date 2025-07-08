




// 🛒 Arreglo global para guardar los productos que el usuario agrega al carrito
const productosSeleccionados = [];

// 🧾 Función principal para mostrar el carrito y calcular el total
const agregaralCarrito = () => {
  // 🔕 Oculta todas las demás secciones
  slaiderProducts.classList.add('d-none');
  cardProducts.classList.add('d-none');
  sectionContact.classList.add('d-none');
  gridProducts.classList.add('d-none');
  shoppingCart.classList.remove('d-none'); // 👀 Muestra la sección del carrito

  listaCarrito.innerHTML = '';             // 🧹 Limpia la lista del carrito
  mensajePago.classList.add('d-none');     // 🔕 Oculta mensaje de pago exitoso (por si ya estaba visible)

  const idioma = localStorage.getItem('idioma') || 'es';     // 🌍 Idioma del usuario
  const textos = traduccionesCart[idioma] || traduccionesCart['es'];  // ✅ Previene undefined

  let total = 0;

  productosSeleccionados.forEach(product => {
    const price = Number(product.price);
    const amount = Number(product.amount);

    // ✅ Validación de datos
    if (isNaN(price) || isNaN(amount) || price <= 0 || amount <= 0) {
      console.warn('❌ Producto con datos inválidos (omitido):', product);
      return;
    }

    const item = document.createElement('li');
    item.innerHTML = `
      ${product.title} - $${price} x ${amount}
      <button class="btn btn-outline-light btn-sm btn-borrar" data-id="${product.id}">❌</button>
    `;
    listaCarrito.appendChild(item);

    total += price * amount;
  });

  // ✅ Siempre muestra el texto traducido correctamente, incluso si está vacío
  totalTexto.textContent = `${textos.totalText}: $${total.toFixed(2)}`;
};

// ❌ Evento para eliminar productos del carrito
shoppingCart.addEventListener('click', e => {
  if (e.target.classList.contains('btn-borrar')) {
    const id = parseInt(e.target.dataset.id);
    const index = productosSeleccionados.findIndex(p => p.id === id);
    if (index !== -1) {
      productosSeleccionados.splice(index, 1);
      agregaralCarrito(); // 🔄 Actualiza el carrito
    }
  }
});

// 💳 Evento del botón "Pagar"
document.getElementById('btn-pagar').addEventListener('click', () => {
  if (productosSeleccionados.length === 0) return;

  productosSeleccionados.length = 0;  // 🧼 Vacía el carrito
  agregaralCarrito();                 // 🔄 Refresca la vista

  const mensajePago = shoppingCart.querySelector('.mensaje-pago');
  mensajePago.classList.remove('d-none'); // ✅ Muestra mensaje de pago
});

// 🧱 Función para crear una tarjeta de producto visualmente
function crearTarjetaProducto(producto) {
  const card = document.createElement('div');
  card.classList.add('product-card');

  card.innerHTML = `
    <h4>${producto.title}</h4>
    <p>$${producto.price}</p>
    <button class="btn-agregar">Agregar al carrito</button>
  `;

  // 🛒 Evento: al hacer clic en "Agregar al carrito"
  card.querySelector('.btn-agregar').addEventListener('click', () => {
    const price = Number(producto.price);

    if (isNaN(price) || price <= 0) {
      alert('⚠️ El producto no tiene un precio válido. No se puede agregar.');
      console.warn('❌ Producto ignorado:', producto);
      return;
    }

    const existente = productosSeleccionados.find(p => p.id === producto.id);

    if (existente) {
      existente.amount += 1;
    } else {
      productosSeleccionados.push({
        id: producto.id,
        title: producto.title,
        price: price,
        amount: 1
      });
    }

    agregaralCarrito(); // 🔄 Muestra el carrito actualizado
  });

  return card;
}




const cargarFormularioContacto = () => {
  // Selecciona la sección donde se insertará el formulario
const section = document.getElementById('contact-section');
// Inserta el HTML del formulario de contacto
section.innerHTML = `
  <div class="form-wrapper mx-auto">
    <h3 class="text-center mb-4" data-key="contacto_titulo">Contáctanos:</h3>
    <form>
      <div class="mb-3">
        <label for="nombre" class="form-label" data-key="contacto_nombre">Nombre</label>
        <input type="text" class="form-control" id="nombre" required>
      </div>
      <div class="mb-3">
        <label for="correo" class="form-label" data-key="contacto_correo">Correo</label>
        <input type="email" class="form-control" id="correo" required>
      </div>
      <div class="mb-3">
        <label for="mensaje" class="form-label" data-key="contacto_mensaje">Mensaje</label>
        <textarea class="form-control" id="mensaje" rows="4" required></textarea>
      </div>
      <button type="submit" class="btn btn-polish w-100" data-key="contacto_enviar">Enviar</button>
    </form>
  </div>
`;
  // Muestra la sección del formulario
section.classList.remove('d-none');

// Aplica traducción inmediata si hay soporte multilenguaje
const idiomaActual = localStorage.getItem('idioma') || 'es';
cambiarIdiomaContacto(idiomaActual);

// ✅ VALIDACIÓN después de insertar el formulario
const form = document.getElementById('form-contacto');
const mensajeExito = document.getElementById('mensaje-exito');

form.addEventListener('submit', (e) => {
  e.preventDefault(); // Previene el envío real

  const nombre = document.getElementById('nombre').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();

  // Validación de correo simple
  const correoValido = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;

  if (!nombre || !correo || !mensaje) {
    alert('Por favor completa todos los campos');
    return;
  }

  if (!correoValido.test(correo)) {
    alert('Por favor ingresa un correo válido.');
    return;
  }
  
   // ✅ Todo correcto: mostrar mensaje de éxito
   mensajeExito.classList.remove('d-none');
   form.reset();
});
};

const cargarFormularioContacto2 = () => {
  const section = document.getElementById('contact-section');

  section.innerHTML = `
    <div class="form-wrapper mx-auto">
      <h3 class="text-center mb-4" data-key="contacto_titulo">Contáctanos:</h3>
      <form id="form-contacto" novalidate>
        <div class="mb-3">
          <label for="nombre" class="form-label" data-key="contacto_nombre">Nombre</label>
          <input type="text" class="form-control" id="nombre">
          <div class="invalid-feedback text-center fw-bold" id="error-nombre"></div>
        </div>
        <div class="mb-3">
          <label for="correo" class="form-label" data-key="contacto_correo">Correo</label>
          <input type="email" class="form-control" id="correo">
          <div class="invalid-feedback text-center fw-bold" id="error-correo"></div>
        </div>
        <div class="mb-3">
          <label for="mensaje" class="form-label" data-key="contacto_mensaje">Mensaje</label>
          <textarea class="form-control" id="mensaje" rows="4"></textarea>
          <div class="invalid-feedback text-center fw-bold" id="error-mensaje"></div>
        </div>
        <button type="submit" class="btn btn-polish w-100" data-key="contacto_enviar">Enviar</button>
      </form>
    </div>
  `;

  section.classList.remove('d-none');

  const idiomaActual = localStorage.getItem('idioma') || 'es';
  cambiarIdiomaContacto(idiomaActual);

  const form = document.getElementById('form-contacto');
  const mensajeExito = document.getElementById('mensaje-exito');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre');
    const correo = document.getElementById('correo');
    const mensaje = document.getElementById('mensaje');

    const errorNombre = document.getElementById('error-nombre');
    const errorCorreo = document.getElementById('error-correo');
    const errorMensaje = document.getElementById('error-mensaje');

    // Limpiar errores previos
    [nombre, correo, mensaje].forEach(input => input.classList.remove('is-invalid'));
    [errorNombre, errorCorreo, errorMensaje].forEach(div => div.textContent = '');

    let hayErrores = false;
    const correoValido = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;

    const mostrarError = (input, div, mensaje) => {
      input.classList.add('is-invalid');
      div.textContent = mensaje;
      hayErrores = true;

      setTimeout(() => {
        input.classList.remove('is-invalid');
        div.textContent = '';
      }, 3000); // Desaparece después de 3 segundos
    };

    if (!nombre.value.trim()) {
      mostrarError(nombre, errorNombre, 'Por favor ingresa tu nombre.');
    }

    if (!correo.value.trim()) {
      mostrarError(correo, errorCorreo, 'Por favor ingresa tu correo.');
    } else if (!correoValido.test(correo.value.trim())) {
      mostrarError(correo, errorCorreo, 'El correo no es válido.');
    }

    if (!mensaje.value.trim()) {
      mostrarError(mensaje, errorMensaje, 'Por favor escribe un mensaje.');
    }

    if (hayErrores) return;

    // Éxito
    mensajeExito.classList.remove('d-none');
    form.reset();
  });
};



