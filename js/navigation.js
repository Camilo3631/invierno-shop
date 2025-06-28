
window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);


function navigator() {
      // Imprimimos en la consola el objeto location 
      console.log({ location});

      if (location.hash.startsWith('#productos')) {
          productosPage();
      }
       else if (location.hash.startsWith('#contacto')) {
        contactoPage();  
      } 
      else if (location.hash.startsWith('#shopping-cart')) {
        shoppingCartPage();
      }    
      else {
        homePage();    
      };

   





};

// Generemos un arrow function para la pagina del homePage
const homePage = () => {

  // Secciones visibles en el home
  slaiderProducts.classList.remove('d-none');
  cardProducts.classList.remove('d-none');

  // Secciones ocultas en el home
  gridProducts.classList.add('d-none');
  shoppingCart.classList.add('d-none');
  sectionContact.classList.add('d-none');

  loadFeaturedProducts();
  loadClothingProducts();

};

const productosPage = () => {
  // Secciones ocultas en el productoSPage
  slaiderProducts.classList.add('d-none');
  cardProducts.classList.add('d-none');
  shoppingCart.classList.add('d-none');
  sectionContact.classList.add('d-none');

  mostrarGridProducts();
}

const contactoPage = () => {
 // Secciones ocultas en el contactPage
 slaiderProducts.classList.add('d-none');
 cardProducts.classList.add('d-none');
 shoppingCart.classList.add('d-none');
 gridProducts.classList.add('d-none');


 cargarFormularioContacto();













}



const shoppingCartPage = () => {
   // Secciones ocultas en el shopingcardPage
   slaiderProducts.classList.add('d-none');
   cardProducts.classList.add('d-none');



   agregaralCarrito();







}