// import { products } from "./products.js";   <== importare la lista prodotti in modo locale
//SLIDE SHOW HERO
const slide = document.querySelector(".overlay");

let images = [];
images[0] = "url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')";
images[1] = "url('https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')";
images[2] = "url('https://images.unsplash.com/photo-1589363460779-cd717d2ed8fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80')";
images[3] = "url('https://media.istockphoto.com/photos/fits-perfect-picture-id938463764')";

let x = 0;
function changeImage() {
  slide.style.backgroundImage = images[x];
  x=x+1;
  if (x > 3){
    x = 0;
 }
}

window.addEventListener('DOMContentLoaded', (event) => {
  setInterval(changeImage, 3000);
});



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
    const localStorageValue = localStorage.getItem("totCartitems");
    if (localStorageValue) {
      cartList = JSON.parse(localStorageValue);
    }

    cartList.push(
      productList.find(
        (product) => parseInt(e.currentTarget.id) === product.id
      )
    );
    setCartProductsNum();
    showModal();
    localStorage.setItem("totCartitems", JSON.stringify(cartList));
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
  productList = data;
  
  return renderProducts(data);
};

let productList = [];
const wrapperProducts = document.querySelector(".wrapper__products");


//Parte inerente alla logica del carrello
let cartList= [];

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

const parsedTotCardItemsLen =
  JSON.parse(localStorage.getItem("totCartitems"))?.length || 0;

cartProductsNum.textContent = `Numero prodotti: ${parsedTotCardItemsLen || 0}`;
// localStorageTot > 0 ? cartProductsNum.textContent = `Numero prodotti: ${localStorageTot}` : cartProductsNum.textContent = `Carrello vuoto`;


getProductsList();

clearCartBtn.addEventListener("click", () => {
  cartList.length = 0;
  setCartProductsNum();
});