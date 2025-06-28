const apiComerce = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  }
})

const track = document.getElementById('productSliderTrack');

const loadClothingProducts = async () => {
  try {

    const [menRes, womenRes] = await Promise.all([
      apiComerce('products/category/mens-shirts'),
      apiComerce('products/category/womens-dresses')
    ])

    const menData = await menRes.data;
    const womenData = await womenRes.data;

    const clothingProducts = [...menData.products, ...womenData.products].slice(0, 8);

    clothingProducts.forEach(product => {
      const card = document.createElement('div');
      card.classList.add('product-card');
      card.innerHTML = ` 
          <img src="${product.thumbnail}" alt=${product.title}">
          <h3>${product.title}</h3>
          <p>${product.price}</p>
          <small>${product.description.slice(0, 40)}...</small>
          `;
      track.appendChild(card);
    });
  } catch (error) {
    console.error('Error al cargar ropa:', error)
  }
}

loadClothingProducts();

const loadFeaturedProducts = async () => {
  try {
    // Peticiones paralelas para ropa de hombre y mujer
    const [menRes, womenRes] = await Promise.all([
      apiComerce('products/category/mens-shirts'),
      apiComerce('products/category/womens-dresses'),
    ])

    // Seleccion de productos especiíficos
    const menProduct = menRes.data.products[3];
    const womenProduct = womenRes.data.products[3];

    // Referencia a los contendores en el HTML
    const menCard = document.getElementById('menProduct');
    const womenCard = document.getElementById('womenProduct');

    // Card para ropa de hombre
    menCard.innerHTML = `
       <img src="${menProduct.thumbnail}" alt=${menProduct.title}">
       <h3>${menProduct.title}</h3>
       <p>${menProduct.price}</p>
      `;

    // Card para ropa de mujer
    womenCard.innerHTML = `
        <img src="${womenProduct.thumbnail}" alt="${womenProduct.title}">
        <h3>${womenProduct.title}</h3>
        <p>${womenProduct.price}</p>
        `;
  } catch (error) {
    console.error('Error al cargar productos de hombre y mujer:', error);
  }
};


loadFeaturedProducts();
const productosPorPagina = 8;
let totalDeProductos = [];
// global, debe estar fuera

const mostrarGridProducts = async () => {
  // Ocultar otras secciones, mostrar grid
  slaiderProducts.classList.add('d-none');
  cardProducts.classList.add('d-none');
  sectionContact.classList.add('d-none');
  shoppingCart.classList.add('d-none');
  gridProducts.classList.remove('d-none');

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

    const grid = gridProducts.querySelector('.grid-products');
    grid.innerHTML = '';

    totalDeProductos.forEach(product => {
      const card = document.createElement('div');
      card.classList.add('product-card');
      card.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}">
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
      <form>
        <div class="mb-3">
          <label for="nombre" class="form-label" data-key="contacto_nombre">Nombre</label>
          <input type="text" class="form-control" id="nombre">
        </div>
        <div class="mb-3">
          <label for="correo" class="form-label" data-key="contacto_correo">Correo</label>
          <input type="email" class="form-control" id="correo">
        </div>
        <div class="mb-3">
          <label for="mensaje" class="form-label" data-key="contacto_mensaje">Mensaje</label>
          <textarea class="form-control" id="mensaje" rows="4"></textarea>
        </div>
        <button type="submit" class="btn btn-polish w-100" data-key="contacto_enviar">Enviar</button>
      </form>
    </div>
  `;
  section.classList.remove('d-none');

  // Traducir inmediatamente después de insertar el HTML
  const idiomaActual = localStorage.getItem('idioma') || 'es';
  cambiarIdiomaContacto(idiomaActual);
}

const productosSeleccionados = [];
// Función principal del carrito
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
  const textos = traduccionesCart[idioma]; // 👈 Accede

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

 totalTexto.textContent = `${textos.total}: $${total.toFixed(2)}`;
};

// Evento para borrar productos del carrito
shoppingCart.addEventListener('click', e => {
  if (e.target.classList.contains('btn-borrar')) {
    const id = parseInt(e.target.dataset.id);
    const index = productosSeleccionados.findIndex(p => p.id === id);
    if (index !== -1) {
      productosSeleccionados.splice(index, 1);
      agregaralCarrito();
    }
  }
});

// Evento para botón de pagar
document.getElementById('btn-pagar').addEventListener('click', () => {
  if (productosSeleccionados.length === 0) return;
  productosSeleccionados.length = 0;
  agregaralCarrito();
  const mensajePago = shoppingCart.querySelector('.mensaje-pago');
  mensajePago.classList.remove('d-none');
});

// Ejemplo de cómo agregar productos desde una tarjeta
function crearTarjetaProducto(producto) {
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
    agregaralCarrito();
  });

  return card;
}

























