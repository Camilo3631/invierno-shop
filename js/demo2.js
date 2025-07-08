
const cargarFormularioContacto = () => {
    const section = document.getElementById('contact-section');
  
     section.innerHTML = `
    <div class="form-wrapper mx-auto">
      <h3 class="text-center mb-4" data-key="contacto_titulo">Contáctanos:</h3>
      <form id="form-contacto" novalidate> 
        <div class="mb-3">
          <label for="nombre" class="form-label" data-key="contacto_nombre">Nombre</label>
          <input type="text"  class="form-control" id="nombre">
          <div class="invalid-feedback text-center fw-bold"  id="error-nombre"></div>
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
      const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                         
 
                       
  
      const mostrarError = (input, div, mensaje) => {
        input.classList.add('is-invalid');
        div.textContent = `❗ ${mensaje}`;
        hayErrores = true;
  
        setTimeout(() => {
          input.classList.remove('is-invalid');
          div.textContent = '';
        }, 3000);
      };
    if (!nombre.value.trim()) {
        mostrarError(nombre, errorNombre, 'Por favor ingresa tu nombre.');
      }
  
      if (!correo.value.trim()) {
        mostrarError(correo, errorCorreo, 'Por favor ingresa tu correo');
      } else if (!correoValido.test(correo.value.trim())) {
        mostrarError(correo, errorCorreo, 'El correo no es valido');
      }
  
      if (!mensaje.value.trim()) {
        mostrarError(mensaje, errorMensaje, 'Por favor escribe un mensaje.');
      }
  
      if (hayErrores) return;
  
      // ✅ Éxito
      mensajeExito.textContent = '✅ ¡Mensaje enviado con éxito!';
      
      
      mensajeExito.classList.remove('d-none');
      form.reset();
  
      setTimeout(() => {
        mensajeExito.classList.add('d-none');
      }, 3000)
    })
  }














// Recuperar productos del carrito guardados previamente en localStorage
const guardado = localStorage.getItem('carrito');
const productosSeleccionados = guardado ? JSON.parse(guardado) : []; // Si no hay nada, empezamos con un array vacío

const actualizarCarrito = () => {
  // Sumar todas las cantidades de los productos en el carrito
  const totalCantidad = productosSeleccionados.reduce((acc, p) => acc + p.amount, 0);
  // Obtener el elemento visual del contador
  const contador = document.getElementById('contador-carrito');

  if (contador) {
    contador.textContent = totalCantidad;
    contador.style.display = totalCantidad > 0 ? 'inline-block' : 'none';
  }
}

// Función para agregarl carrito
const agregaralCarrito = () => {
  // Ocultar las secciónes
  slaiderProducts.classList.add('d-none');
  cardProducts.classList.add('d-none');
  sectionContact.classList.add('d-none');
  gridProducts.classList.add('d-none');
  shoppingCart.classList.remove('d-none');

  listaCarrito.innerHTML = '';
  mensajePago.classList.add('d-none');

  const idioma = localStorage.getItem('idioma') || 'es';
  const textos = traduccionesCart[idioma] || traduccionesCart['es']

  let total = 0;

  productosSeleccionados.forEach(product => {
    const item = document.createElement('li');
    item.innerHTML = `
    ${product.title} - $${product.price} x ${product.amount}
    <button class="btn btn-outline-light btn-sm btn-borrar" data-id="${product.id}">❌</button>
   `;
    listaCarrito.appendChild(item);

    const price = Number(product.price) || 0;
    const amount = Number(product.amount) || 0;
    total += price * amount;
  });

 
  totalTexto.textContent = `${textos.totalText}: $${total.toFixed(2)}`;
 

  // Guardar en localStorage y actualizar contador
  localStorage.setItem('carrito', JSON.stringify(productosSeleccionados));
  actualizarCarrito();
}

// Evento para borrar productos del carrito
shoppingCart.addEventListener('click', e => {
  if (e.target.classList.contains('btn-borrar')) {
    const id = parseInt(e.target.dataset.id);
    const index = productosSeleccionados.findIndex(p => p.id === id);
    if (index !== -1) {
      productosSeleccionados.splice(index, 1)
      localStorage.setItem('carrito', JSON.stringify(productosSeleccionados));
      agregaralCarrito();
    }
  }
})


// Evento para botón de pagar
document.getElementById('btn-pagar').addEventListener('click', () => {
  if (productosSeleccionados.length === 0) return;
  productosSeleccionados.length = 0;
  localStorage.removeItem('carrito');
  agregaralCarrito();
  const mensajePago = shoppingCart.querySelector('.mensaje-pago');
  mensajePago.classList.remove('d-none');
});

// Funcion para agregar al carrito o crear tarjeta
const crearTarjetaProducto = (product) => {
  const card = document.createElement('div');
  card.classList.add('product-card');
  card.innerHTML = `
  <h4>${product.title}</h4>
  <p>${product.price}</p>
  <button class="btn-agregar">Agregar al carrito</button>
  `;

  card.querySelector('.btn-agregar').addEventListener('click', () => {
    const existente = productosSeleccionados.find(p => p.id === product.id);
    if (existente) {
      existente.amount += 1;
    } else {
      productosSeleccionados.push({
        id: product.id,
        title: product.title,
        price: product.price,
        amount: 1,
      });
    }

    localStorage.setItem('carrito', JSON.stringify(productosSeleccionados));
    agregaralCarrito();
    });

    return card;
  }


  // ✅ Al cargar la página, actualizar el contador
  actualizarCarrito();







