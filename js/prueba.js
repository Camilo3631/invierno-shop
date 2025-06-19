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



































