// Instancia de Axios para la FakeStore API
const apiComerce = axios.create({
    baseURL: 'https://fakestoreapi.com',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  
  // Referencia al contenedor del slider
  const track = document.getElementById('productSliderTrack');
  
  // Skeletons para carga
  const mostrarSkeletonSlider = () => {
    track.innerHTML = '';
    for (let i = 0; i < 4; i++) {
      const skeleton = document.createElement('div');
      skeleton.classList.add('skeleton', 'me-3', 'p-2');
      skeleton.style.minWidth = '200px';
      skeleton.style.height = '250px';
      skeleton.style.borderRadius = '10px';
      skeleton.innerHTML = `
        <div class="skeleton-img skeleton" style="height: 150px; border-radius: 8px;"></div>
        <div class="skeleton-text skeleton mt-3"></div>
        <div class="skeleton-text skeleton w-50 mt-2"></div>
      `;
      track.appendChild(skeleton);
    }
  };
  
  // Carga de productos para el slider (ropa sin bolsos)
  const loadClothingProducts = async () => {
    try {
      mostrarSkeletonSlider();
  
      const [menRes, womenRes] = await Promise.all([
        apiComerce("products/category/men's clothing"),
        apiComerce("products/category/women's clothing")
      ]);
  
      const allClothing = [...menRes.data, ...womenRes.data];
  
      // Filtro para eliminar mochilas, bolsos, etc.
      const filteredClothing = allClothing
        .filter(p =>
          !/bag|backpack|mochila|bolso|purse|handbag/i.test(p.title) &&
          !/bag|backpack|mochila|bolso|purse|handbag/i.test(p.description)
        )
        .slice(0, 8); // Máximo 8 productos
  
      track.innerHTML = '';
  
      filteredClothing.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card', 'me-3', 'p-2');
        card.style.minWidth = '200px';
        card.style.height = '250px';
        card.style.border = '1px solid #ccc';
        card.style.borderRadius = '10px';
        card.style.overflow = 'hidden';
  
        card.innerHTML = `
          <div style="
            height: 160px;
            width: 100%;
            border-radius: 8px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f5f5f5;
          ">
            <img src="${product.image}" alt="${product.title}" style="
              max-height: 100%;
              max-width: 100%;
              object-fit: contain;
            ">
          </div>
          <h5 class="mt-2" style="font-size: 1rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            ${product.title}
          </h5>
          <p class="text-muted mb-0" style="font-size: 0.9rem; color: green;">$${product.price}</p>
          <small style="font-size: 0.8rem; color: #666;">
            ${product.description.slice(0, 40)}...
          </small>
        `;
        track.appendChild(card);
      });
  
      document.querySelector('.product-slider').classList.remove('d-none');
  
    } catch (error) {
      console.error('Error al cargar ropa:', error);
      track.innerHTML = '<p class="text-danger">Error al cargar productos.</p>';
    }
  };
  
  // Carga de productos destacados
  const loadFeaturedProducts = async () => {
    try {
      const [menRes, womenRes] = await Promise.all([
        apiComerce("products/category/men's clothing"),
        apiComerce("products/category/women's clothing")
      ]);
  
      if (!Array.isArray(menRes.data) || !Array.isArray(womenRes.data)) {
        throw new Error('No se encontraron productos');
      }
  
      const menProduct = menRes.data[3];
      const womenProduct = womenRes.data[3];
  
      const menCard = document.getElementById('menProduct');
      const womenCard = document.getElementById('womenProduct');
  
      menCard.innerHTML = `
        <div style="
          height: 160px;
          width: 100%;
          border-radius: 8px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f5f5f5;
        ">
          <img src="${menProduct.image}" alt="${menProduct.title}" style="
            max-height: 100%;
            max-width: 100%;
            object-fit: contain;
          ">
        </div>
        <h5 class="mt-2" style="font-size: 1rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
          ${menProduct.title}
        </h5>
        <p class="text-muted mb-0" style="font-size: 0.9rem; color: green;">$${menProduct.price}</p>
        <small style="font-size: 0.8rem; color: #666;">
          ${menProduct.description.slice(0, 40)}...
        </small>
      `;
  
      womenCard.innerHTML = `
        <div style="
          height: 160px;
          width: 100%;
          border-radius: 8px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f5f5f5;
        ">
          <img src="${womenProduct.image}" alt="${womenProduct.title}" style="
            max-height: 100%;
            max-width: 100%;
            object-fit: contain;
          ">
        </div>
        <h5 class="mt-2" style="font-size: 1rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
          ${womenProduct.title}
        </h5>
        <p class="text-muted mb-0" style="font-size: 0.9rem; color: green;">$${womenProduct.price}</p>
        <small style="font-size: 0.8rem; color: #666;">
          ${womenProduct.description.slice(0, 40)}...
        </small>
      `;
  
    } catch (error) {
      console.error('Error al cargar productos destacados:', error);
  
      const menCard = document.getElementById('menProduct');
      const womenCard = document.getElementById('womenProduct');
  
      if (menCard) menCard.innerHTML = '<p class="text-danger">Error al cargar producto</p>';
      if (womenCard) womenCard.innerHTML = '<p class="text-danger">Error al cargar producto</p>';
    }
  };
  
  // Ejecutar ambas funciones al cargar
  loadClothingProducts();
  loadFeaturedProducts();


  const productosPorPagina = 8;
  let totalDeProductos = [];
  
  const mostrarGridProducts = async () => {
    // Ocultar otras secciones, mostrar grid
    slaiderProducts.classList.add('d-none');
    cardProducts.classList.add('d-none');
    sectionContact.classList.add('d-none');
    shoppingCart.classList.add('d-none');
    gridProducts.classList.remove('d-none');
  
    try {
      // Obtener productos desde categorías de ropa
      const [resMen, resWomen] = await Promise.all([
        apiComerce("products/category/men's clothing"),
        apiComerce("products/category/women's clothing"),
      ]);
  
      const menProducts = resMen.data;
      const womenProducts = resWomen.data;
  
      // Filtrar para excluir mochilas, bolsos, carteras, etc.
      const ropaFiltrada = [...menProducts, ...womenProducts].filter(p =>
        !/bag|backpack|mochila|bolso|purse|handbag/i.test(p.title) &&
        !/bag|backpack|mochila|bolso|purse|handbag/i.test(p.description)
      );
  
      // Mezclar aleatoriamente y limitar a 8
      totalDeProductos = ropaFiltrada
        .sort(() => Math.random() - 0.5)
        .slice(0, productosPorPagina);
  
      const grid = gridProducts.querySelector('.grid-products');
      grid.innerHTML = '';
  
      totalDeProductos.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.style.border = '1px solid #ccc';
        card.style.borderRadius = '10px';
        card.style.padding = '12px';
        card.style.marginBottom = '16px';
  
        card.innerHTML = `
          <div style="
            height: 160px;
            width: 100%;
            border-radius: 8px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f5f5f5;
          ">
            <img src="${product.image}" alt="${product.title}" style="
              max-height: 100%;
              max-width: 100%;
              object-fit: contain;
            ">
          </div>
          <h5 class="mt-2" style="
            font-size: 1rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-top: 0.75rem;
          ">${product.title}</h5>
          <p class="text-muted mb-0" style="font-size: 0.9rem; color: green;"><strong>$${product.price}</strong></p>
          <small style="font-size: 0.8rem; color: #666;">${product.description.slice(0, 40)}...</small>
          <div class="cantidad-control d-flex justify-content-center my-2">
            <button class="btn btn-sm btn-polish btn-restar">-</button>
            <span class="mx-2 cantidad">1</span>
            <button class="btn btn-sm btn-polish btn-sumar">+</button>
          </div>
          <button class="btn btn-sm btn-polish btn-agregar mt-2">Agregar al carrito</button>
        `;
  
        // Manejo de cantidad
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
              cantidad: cantidad,
            });
          }
          agregaralCarrito(); // Mostrar el carrito actualizado
        });
  
        grid.appendChild(card);
      });
  
    } catch (error) {
      console.error('Error al cargar productos:', error);
      gridProducts.querySelector('.grid-products').innerHTML = '<p class="text-danger">Error al cargar productos.</p>';
    }
  };


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
        </form>
  
    
      <div id="mensaje-exito" class="alert alert-success mt-3 text-center d-none"></div>
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
  
 