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
