const apiComerce = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  }
})

// Creamos el instersion observer
const createObserver = () => {
  // Selecciónamos las imágenes 
  const img = document.querySelectorAll('img[data-src]');

  // Configuración el intersionObserver
  const options =  {
    rootMargin: '300px',
    threshold: 0.1,
  };

  // Callback que se ejecuta cuando la imágen entra en el área visible
  const callback = (entries, observer) => {
     entries.forEach(entry => {
         // Si la imagen esta visible 
         if (entry.isIntersecting) {
          const img = entry.target;
          const dataSrc = img.dataset.src;

           // Carga la imagen y elimina el data-src
           if (dataSrc) {
            img.src = dataSrc;
            img.removeAttribute('data-src');
           }

            // Deja de observar la imágen
            observer.unobserve(img);
         }
        
    })
};

 // Crea y comienza a observar las imágenes
 const observer = new IntersectionObserver(callback, options);

 img.forEach(img => observer.observe(img));

};

// Ejecutamos la función una vez que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', createObserver);

const track = document.getElementById('productSliderTrack');

const loadClothingProducts = async () => {
  // 👉 Mostrar los 8 skeletons
  track.innerHTML = ''; // Limpia lo anterior

  for (let i = 0; i < 8; i++) {
    const skeleton = document.createElement('div');
    skeleton.classList.add('loading-card-slider');
    track.appendChild(skeleton);
  }

  try {
    const [menRes, womenRes] = await Promise.all([
      apiComerce('products/category/mens-shirts'),
      apiComerce('products/category/womens-dresses')
    ]);

    const menData = menRes.data;
    const womenData = womenRes.data;

    const clothingProducts = [...menData.products, ...womenData.products].slice(0, 8);

    // 👉 Reemplazar skeletons por productos reales
    track.innerHTML = '';

    clothingProducts.forEach(product => {
      const card = document.createElement('div');
      card.classList.add('product-card', 'loaded'); // Agrega fondo blanco al cargar
      card.innerHTML = `
        <img data-src="${product.thumbnail}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>$${product.price.toFixed(2)}</p>
        <small>${product.description.slice(0, 40)}...</small>
      `;
      track.appendChild(card);
    });

    createObserver(); // Lazy load imágenes
  } catch (error) {
    console.error('Error al cargar ropa:', error);
  }
};


const loadFeaturedProducts = async () => {
  const menCard = document.getElementById('menProduct');
  const womenCard = document.getElementById('womenProduct');

  // Mostrar skeleton
  menCard.classList.remove('loaded');
  womenCard.classList.remove('loaded');
  menCard.innerHTML = `<div class="loading-card"></div>`;
  womenCard.innerHTML = `<div class="loading-card"></div>`;

  try {
    const [menRes, womenRes] = await Promise.all([
      apiComerce('products/category/mens-shirts'),
      apiComerce('products/category/womens-dresses'),
    ]);

    const menProduct = menRes.data.products[3];
    const womenProduct = womenRes.data.products[3];

    // Mostrar contenido
    menCard.innerHTML = `
      <img data-src="${menProduct.thumbnail}" alt="${menProduct.title}" />
      <h3>${menProduct.title}</h3>
      <p>$${menProduct.price.toFixed(2)}</p>
    `;
    womenCard.innerHTML = `
      <img data-src="${womenProduct.thumbnail}" alt="${womenProduct.title}" />
      <h3>${womenProduct.title}</h3>
      <p>$${womenProduct.price.toFixed(2)}</p>
    `;

    // Activar fondo blanco
    menCard.classList.add('loaded');
    womenCard.classList.add('loaded');

    createObserver();
  } catch (error) {
    console.error('Error al cargar productos de hombre y mujer:', error);
  }
};

const mostrarSkeletonPrductos = () => {
   const grid = gridProducts.querySelector('.grid-products');
   grid.classList.remove('loaded');
   grid.innerHTML = '';
   for (let i = 0; i < 8; i++) {
    const skeleton = document.createElement('div');
    skeleton.classList.add('loading-card-grid');
    grid.appendChild(skeleton);
   }  
};

const ocultarSkeletonProductos = () => {
  const grid = gridProducts.querySelector('.grid-products');
  const skeletons = grid.querySelectorAll('.loading-card-grid');
  skeletons.forEach(skeleton => skeleton.remove());
};





loadFeaturedProducts();
const productosPorPagina = 8;
let totalDeProductos = []; // Global

const mostrarGridProducts = async () => {
  // Ocultar otras secciones, mostrar grid
  slaiderProducts.classList.add('d-none');
  cardProducts.classList.add('d-none');
  sectionContact.classList.add('d-none');
  shoppingCart.classList.add('d-none');
  gridProducts.classList.remove('d-none');

  const grid = gridProducts.querySelector('.grid-products');

  // Mostrar skeletons y quitar fondo blanco
   mostrarSkeletonPrductos(); // ✅ Limpio y reutilizable+

  try {
    // Carga productos de las categorías
    const [resMen, resWomen] = await Promise.all([
      apiComerce('products/category/mens-shirts'),
      apiComerce('products/category/womens-dresses')
    ]);

    const menProducts = resMen.data.products;
    const womenProducts = resWomen.data.products;

    // Mezclar y limitar cantidad
    totalDeProductos = [...menProducts, ...womenProducts]
      .sort(() => Math.random() - 0.5)
      .slice(0, productosPorPagina);

    ocultarSkeletonProductos();

    // Mostrar productos reales
    totalDeProductos.forEach(product => {
      const card = document.createElement('div');
      card.classList.add('product-card');
      card.innerHTML = `
        <img data-src="${product.thumbnail}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p><strong>$${product.price}</strong></p>
        <p class="small text-muted">${product.description.slice(0, 40)}...</p>
        <div class="cantidad-control d-flex justify-content-center my-2">
          <button class="btn btn-sm btn-polish btn-restar">-</button>
          <span class="mx-2 cantidad">1</span>
          <button class="btn btn-sm btn-polish btn-sumar">+</button>
        </div>
        <button class="btn btn-sm btn-polish btn-agregar mt-2">Agregar al carrito</button>
      `;

      let cantidad = 1;
      const cantidadSpan = card.querySelector('.cantidad');

      card.querySelector('.btn-restar').addEventListener('click', () => {
        if (cantidad > 1) {
          cantidad--;
          cantidadSpan.textContent = cantidad;
        }
      });

      card.querySelector('.btn-sumar').addEventListener('click', () => {
        cantidad++;
        cantidadSpan.textContent = cantidad;
      });

      card.querySelector('.btn-agregar').addEventListener('click', () => {
        const existente = productosSeleccionados.find(p => p.id === product.id);
        if (existente) {
          existente.cantidad += cantidad;
        } else {
          productosSeleccionados.push({
            id: product.id,
            title: product.title,
            price: product.price,
            cantidad: cantidad
          });
        }
        agregaralCarrito(); // Actualiza y muestra el carrito
      });

      grid.appendChild(card);
    });

    // Activar fondo blanco final
    grid.classList.add('loaded');

    createObserver();
  } catch (error) {
    console.error('Error al cargar productos:', error);
  }
};

mostrarGridProducts();


const cargarFormularioContacto = () => {
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
        <div id="mensaje-exito" class="alert alert-success mt-4 d-none" data-key="contacto_exito">
      </form>
    </div>
  `;

  section.classList.remove('d-none');
  const idiomaActual = localStorage.getItem('idioma') || 'es';
  cambiarIdiomaContacto(idiomaActual);

  const form = document.getElementById('form-contacto');
  const mensajeExito = document.getElementById('mensaje-exito');

  const nombre = document.getElementById('nombre');
  const correo = document.getElementById('correo');
  const mensaje = document.getElementById('mensaje');

  const errorNombre = document.getElementById('error-nombre');
  const errorCorreo = document.getElementById('error-correo');
  const errorMensaje = document.getElementById('error-mensaje');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

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
      mostrarError(correo, errorCorreo, 'Por favor ingresa tu correo.');
    } else if (!correoValido.test(correo.value.trim())) {
      mostrarError(correo, errorCorreo, 'El correo no es válido.');
    }

    if (!mensaje.value.trim()) {
      mostrarError(mensaje, errorMensaje, 'Por favor escribe un mensaje.');
    }

    if (hayErrores) return;

    mensajeExito.textContent = '✅ ¡Mensaje enviado con éxito!';
    mensajeExito.classList.remove('d-none');
    form.reset();

    setTimeout(() => {
      mensajeExito.classList.add('d-none');
    }, 3000);
  });
};



// Recuperar productos del carrito guardados en localStorage
const guardado = localStorage.getItem('carrito');
const productosSeleccionados = guardado ? JSON.parse(guardado) : [];

// 🔄 Función para actualizar el contador del carrito
const  actualizarContadorCarrito = () => {
  const totalCantidad = productosSeleccionados.reduce((acc, p) => acc + p.cantidad, 0);
  const contador = document.getElementById('contador-carrito');
  if (contador) {
    contador.textContent = totalCantidad;
    contador.style.display = totalCantidad > 0 ? 'inline-block' : 'none';
  }
}

// Función principal del carrito-l
const agregaralCarrito = () => {
  // Ocultar otras secciones
  slaiderProducts.classList.add('d-none');
  cardProducts.classList.add('d-none');
  sectionContact.classList.add('d-none');
  gridProducts.classList.add('d-none');
  shoppingCart.classList.remove('d-none');

  listaCarrito.innerHTML = '';
  mensajePago.classList.add('d-none');

  const idioma = localStorage.getItem('idioma') || 'es';
  const textos = traduccionesCart[idioma] || traduccionesCart['es'];

  let total = 0;

  productosSeleccionados.forEach(producto => {
    const item = document.createElement('li');
    item.innerHTML = `
      ${producto.title} - $${producto.price} x ${producto.cantidad}
      <button class="btn btn-outline-light btn-sm btn-borrar" data-id="${producto.id}">❌</button>
    `;
    listaCarrito.appendChild(item);

    const precio = Number(producto.price) || 0;
    const cantidad = Number(producto.cantidad) || 0;
    total += precio * cantidad;
  });

  totalTexto.textContent = `${textos.totalText}: $${total.toFixed(2)}`;

  // Guardar en localStorage y actualizar contador
  localStorage.setItem('carrito', JSON.stringify(productosSeleccionados));
  actualizarContadorCarrito();
};

// Evento para borrar productos del carrito
shoppingCart.addEventListener('click', e => {
  if (e.target.classList.contains('btn-borrar')) {
    const id = parseInt(e.target.dataset.id);
    const index = productosSeleccionados.findIndex(p => p.id === id);
    if (index !== -1) {
      productosSeleccionados.splice(index, 1);
      localStorage.setItem('carrito', JSON.stringify(productosSeleccionados));
      agregaralCarrito();
    }
  }
});

// Evento para botón de pagar
document.getElementById('btn-pagar').addEventListener('click', () => {
  if (productosSeleccionados.length === 0) return;
  productosSeleccionados.length = 0;
  localStorage.removeItem('carrito');
  agregaralCarrito();
  const mensajePago = shoppingCart.querySelector('.mensaje-pago');
  mensajePago.classList.remove('d-none');
});

// Ejemplo de cómo agregar productos desde una tarjeta
const crearTarjetaProducto = (producto) =>  {
  const card = document.createElement('div');
  card.classList.add('product-card');
  card.innerHTML = `
    <h4>${producto.title}</h4>
    <p>$${producto.price}</p>
    <button class="btn-agregar">Agregar al carrito</button>
  `;

  card.querySelector('.btn-agregar').addEventListener('click', () => {
    const existente = productosSeleccionados.find(p => p.id === producto.id);
    if (existente) {
      existente.cantidad += 1;
    } else {
      productosSeleccionados.push({
        id: producto.id,
        title: producto.title,
        price: producto.price,
        cantidad: 1
      });
    }

    localStorage.setItem('carrito', JSON.stringify(productosSeleccionados));
    agregaralCarrito();
  });

  return card;
}

// ✅ Al cargar la página, actualizar el contador
actualizarContadorCarrito();
