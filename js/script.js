// import { products } from "./products.js";   <== importare la lista prodotti in modo locale

// MODALE AGGIUNZIONE AL CARRELLO
const modal = document.querySelector(".modal");
const numberProduct = document.querySelector("#numberProduct");
function showModal() {
  modal.style.display = 'block';
    numberProduct.textContent=`Numero prodotti: ${cartList.length}`;
  setTimeout(function(){
    modal.style.display = 'none';
}, 1000); {once:true}
}

//
function setCartProductsNum() {
  cartProductsNum.textContent = `Numero prodotti: ${cartList.length}`;
}

//FUNZIONE GLOBALE CHE CREA I PRODOTTI
function createProduct(parent, imgUrl, productTitle, textPrice, idProduct) {
  const product = document.createElement("div");
  product.className = "product";
  product.setAttribute("id", idProduct);

  createImg(product, imgUrl, productTitle);
  createText(product, productTitle, textPrice);
  parent.appendChild(product);

  product.addEventListener("click", (e) => {
    cartList.push(
      productsList.find(
        (product) => parseInt(e.currentTarget.id) === product.id
      )
    );
    setCartProductsNum();
    showModal();
    localStorage.setItem("totCartitems", cartList.length);
  });
}


function createImg(parent, imgUrl, productTitle) {
  const image = document.createElement("img");
  image.src = imgUrl;
  image.alt = productTitle;

  parent.appendChild(image);
}

function createText(parent, productTitle, textPrice) {
  const title = document.createElement("h4");
  title.textContent = productTitle;

  const price = document.createElement("strong");
  price.textContent = `${textPrice} $`;

  parent.append(title, price);
}

// fetch("https://fakestoreapi.com/products") // <== importare la lista prodotti in modo remoto
//   .then((response) => response.json())
//   .then((data) => {
//     products = data;
//     renderProducts();
//   });


function renderProducts(listItem) {
  listItem.map((product) => {
    createProduct(wrapperProducts, product.image, product.title, product.price, product.id);
  });
}


const getProductsList = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  productsList = data;
  
  return renderProducts(data);
};

let productsList = [];
const wrapperProducts = document.querySelector(".wrapper__products");


//Parte inerente alla logica del carrello
let cartList = [];

const localStorageTot = localStorage.getItem("totCartitems");
const cartBtn = document.querySelector(".cartBtn");
const cartProductsNum = document.querySelector(".cartProductsNum");
const clearCartBtn = document.querySelector(".clearCart");

//Flusso generale
// if (localStorageTot > 0) {
//   cartProductsNum.textContent = `Numero prodotti: ${localStorageTot}`;
// } else {
//   cartProductsNum.textContent = `Carrello vuoto`;
// }

localStorageTot > 0 ? cartProductsNum.textContent = `Numero prodotti: ${localStorageTot}` : cartProductsNum.textContent = `Carrello vuoto`;
getProductsList();

clearCartBtn.addEventListener("click", () => {
  cartList.length = 0;
  setCartProductsNum();
});





export {productsList, renderProducts};