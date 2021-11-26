import {productsList, renderProducts, wrapperProducts} from "./script.js"

const lowpriceBtn = document.querySelector("#lowpriceBtn");
const highpriceBtn = document.querySelector("#highpriceBtn");
const alphaBtn = document.querySelector("#alphaBtn");

function removeDuplicates() {
    document.querySelectorAll(".product")
    .forEach((product)=> wrapperProducts.removeChild(product));
}

function sortAbc() {
    const sortItem = productsList.sort((a, b) =>{
    const textA = a.title;
    const textB = b.title;
    if (textA < textB) {
     return -1;
    }
    if (textA > textB){
     return 1;
    }
    return 0;
   });
   removeDuplicates();
   renderProducts(sortItem);
}



function sortLowPrice() {
    productsList.sort((a, b) => a.price - b.price);
    removeDuplicates();
    renderProducts(productsList);
};



function sortHighPrice() {
    productsList.sort((a, b)=>b.price - a.price);
    removeDuplicates();
    renderProducts(productsList);
};



alphaBtn.addEventListener("click", sortAbc);
lowpriceBtn.addEventListener("click", sortLowPrice);
highpriceBtn.addEventListener("click", sortHighPrice);