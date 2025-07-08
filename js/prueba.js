const track = document.getElementById('productSliderTrack');

async function loadClothingProducts() {
  try {
    const [menRes, womenRes] = await Promise.all([
      fetch('https://dummyjson.com/products/category/mens-shirts'),
      fetch('https://dummyjson.com/products/category/womens-dresses')
    ]);

    const menData = await menRes.json();
    const womenData = await womenRes.json();

    const clothingProducts = [...menData.products, ...womenData.products].slice(0, 8);

    clothingProducts.forEach(product => {
      const card = document.createElement('div');
      card.classList.add('product-card');
      card.innerHTML = `
          <img src="${product.thumbnail}" alt="${product.title}">
          <h3>${product.title}</h3>
          <p>$${product.price}</p>
          <small>${product.description.slice(0, 40)}...</small>
        `;
      track.appendChild(card);
    });
  } catch (error) {
    console.error('Error al cargar ropa:', error);
  }
}

loadClothingProducts();


const themeSwitch = () => {
  const themeToggleButton = document.getElementById('themeSwitch');
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggleButton.checked = true;
  } else {
    document.body.classList.add('light-theme');
    themeToggleButton.checked = false;
  }

  themeToggleButton.addEventListener('change', () => {
    if (themeToggleButton.checked) {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    }
  });
};

document.addEventListener('DOMContentLoaded', themeSwitch);




const productosPorPagina = 6;
let totalDeProductos = [];

const gridproducts = async () => {
// selecciónamos los elementos
const grid = document.querySelector('.grid-products');
const paginación = document.querySelector('.pagination-buttons');
const seccion = document.getElementById('seccion-grid');
// removemos la clase d-none
seccion.classList.remove('d-none');

try {
    const [resMen, reseWomen] = await Promise.all([
        apiComerce('products/category/mens-shirts'),
        apiComerce('products/category/womens-dresses')
    ]);

    totalDeProductos = [...resMen.data.products, ...reseWomen.data.products];
    // Math.ceil redondea hacia arriba al número entero más cercano.
    const totalPaginas = Math.ceil(totalDeProductos.length / productosPorPagina);
    

    const renderPagina = (pagina) => {
      // limpiamos el grid
      grid.innerHTML = '';

      const inicio = (pagina -1) * productosPorPagina;
      const productosPagina = totalDeProductos.slice(inicio, inicio + productosPorPagina);
     


      productosPagina.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');

        card.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p><strong>${product.price}</strong></p>
        <p class="small text-muted">${product.description.slice(0, 40)}...</p>
        <div class="cantidad-control d-flex justify-content-center  my-2">

         <button class="btn btn-polish btn-sm btn-restar">-</button>
         <span class="mx-2 cantidad">1</span>
 

         <button class="btn btn-polish btn-sm btn-sumar">+</button>
        </div>
        <button class="btn btn-success btn-agregar mt-2">Agregar al carrito</button>
        `;

       // lógica cantidad y agregar
       let cantidad = 1;
       const cantidadSpan = card.querySelector('.cantidad');
       card.querySelector('.btn-restar').addEventListener('click', () => {
        if (cantidad > 1) cantidadSpan.textContent = --cantidad;
       });
       card.querySelector('.btn-sumar').addEventListener('click', () => {
         cantidadSpan.textContent = ++cantidad;
       });
       card.querySelector('.btn-agregar').addEventListener('click', () => {
        console.log(`🛒 ${product.title} x${cantidad}`)
       });

       grid.appendChild(card);
      })

    };
        
    // generar bótones
    paginación.innerHTML = '';
    for (let i = 1; i<= totalPaginas; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      btn.classList.add('btn', 'btn-outline-dark', 'btn-sm', 'mx-1');

      btn.addEventListener('click', () => renderPagina(i));
      paginación.appendChild(btn);
    };

    renderPagina(1);

  } catch (error) {
    console.error('Error al cargar productos con paginación:', error);
  }
 
};
// Invocamos la función
gridproducts();







function cargarFormularioContacto() {
  const section = document.getElementById('contact-section');
  section.innerHTML = `
    <div class="form-wrapper mx-auto">
      <h3 class="text-center mb-4">Contáctanos:</h3>
      <form>
        <div class="mb-3">
          <label for="nombre" class="form-label">Nombre</label>
          <input type="text" class="form-control" id="nombre">
        </div>
        <div class="mb-3">
          <label for="correo" class="form-label">Correo</label>
          <input type="email" class="form-control" id="correo">
        </div>
        <div class="mb-3">
          <label for="mensaje" class="form-label">Mensaje</label>
          <textarea class="form-control" id="mensaje" rows="4"></textarea>
        </div>
        <button type="submit" class="btn btn-polish w-100">Enviar</button>
      </form>
    </div>
  `;
  section.classList.remove('d-none'); // Mostrar sección
}

cargarFormularioContacto();













// Función principal del carrito
const agregaralCarrito = () => {
  // Ocultar otras secciones
  slaiderProducts.classList.add('d-none');
  cardProducts.classList.add('d-none');
  sectionContact.classList.add('d-none');
  gridProducts.classList.add('d-none');
  shoppingCart.classList.remove('d-none');

  const listaCarrito = shoppingCart.querySelector('.lista-carrito');
  const totalTexto = shoppingCart.querySelector('.total-carrito');
  const mensajePago = shoppingCart.querySelector('.mensaje-pago');

  listaCarrito.innerHTML = '';
  mensajePago.classList.add('d-none');

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

  totalTexto.textContent = `Total: $${total.toFixed(2)}`;
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











