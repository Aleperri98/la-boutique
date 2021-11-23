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

//

function createProduct(parent, imgUrl, productTitle, textPrice) {
  const product = document.createElement("div");
  product.className = "product";

  createImg(product, imgUrl, productTitle);
  createText(product, productTitle, textPrice);
  parent.appendChild(product);
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

let products = [];
const wrapperProducts = document.querySelector(".wrapper__products");

function renderProducts(listItem) {
  listItem.map((product) => {
    createProduct(wrapperProducts, product.image, product.title, product.price);
  });
}


const getProductsList = async() => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  
  return renderProducts(data);
};

getProductsList();

