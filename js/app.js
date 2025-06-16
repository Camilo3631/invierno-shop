const apiComerce = axios.create({
    baseURL: 'https://dummyjson.com',
    headers: {
        'Content-Type': 'application/json',
    }
})

const track = document.getElementById('productSliderTrack');

const loadClothingProducts =  async () => {
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


loadFeaturedProducts()



















