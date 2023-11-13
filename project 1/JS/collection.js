if (document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded", ready)
}else{
ready();
}
function ready() {
    displayUIItems();

    const addItemBtn = document.getElementsByClassName("add-item")[0];

    
    // addlistener 
   addItemBtn.addEventListener("click", openModal);
//    console.log(addItemBtn); 
// displayUIItems();
}
displayCartCount();
const addItemBtn = document.getElementsByClassName("add-item")[0];
  addItemBtn.addEventListener("click", openAddModal);
const removeCartBtn = document.getElementsByClassName("cart-items-remove");
for(let i=0; i<removeCartBtn.length; i++){
    const current = removeCartBtn[i];
    current.addEventListener("click", removeCartHandler);


  const closeModalBtn = document.getElementsByClassName("fa-times")[0];
//add listener
closeModalBtn.addEventListener("click", closeAddModal);

const submitItem = document.getElementById("submitItem");
submitItem.addEventListener("click", submitItemHandler)

const collectionItemsBtns = document.getElementsByClassName("collection-items-btn");
// console.log(collectionItem) 
for(let i=0; i<collectionItemsBtns.length; i++){
 const currentBtn = collectionItemsBtns[i];
currentBtn.addEventListener("click", addToCartHandler);
//  console.log(customElement)
}
}

function openAddModal() {
    const addModal = document.getElementsByClassName("add-modal")[0];
//add open class
addModal.classList.add("open");
}

function closeAddModal() {
    const modal = document.getElementsByClassName("add-modal")[0];
//add open class
modal.classList.remove("open");
}
//submitItemsHandler
function submitItemHandler(e){
//previous browser default form submission behaviour
e.preventDefault();
//collect form values and remove trailling whitespaces
const title = document.getElementById("title").value.trim ();
const price = document.getElementById("price").value.trim (); 
const desc = document.getElementById("desc").value.trim ();
const imgUrl = document.getElementById("imgUrl").value.trim();
//validation
if (!title || !price || !desc || !imgUrl){
alertMsg("All fields are required", "danger");
    return;
}

const record = {
    id: parseInt(Math.random() * 100000),
    title: title,
       price,
       desc,
       imgUrl,
    };
    // console.log(title, price, desc, imgUrl);
    // console.log(record);
    addItemToStore(record);
    
    // reset input value
    document.getElementById("title").value.trim = "";
    document.getElementById("price").value = "";
     document.getElementById("desc").value = "";
    document.getElementById("imgUrl").value = "";
}

function alertMsg (message, status){
    const alertElem = document.getElementsByClassName("alert")[0];
    const alertMsg = document.getElementById("alert-msg");
    alertElem.classList.add("open", status);
alertMsg.textContent = message;
// close alert modal after 3sec.
setTimeout(()=> {
    alertElem.classList.remove("open", status);
},3000);
}

function addItemToStore(item){
    console.log(item);
    const items = localStorage.getItem("items")
? JSON.parse(localStorage.getItem("items"))
: [];
const copy = [...items]; //items.slice()
// check ifitem is alreadypresent
const itemExist = copy.find((product) => product.title.toLowerCase() === item.title.tolowerCase());
console.log(itemExist, "itemExist");
if(itemExist){
    alertMsg("item with the same title alredy present", "danger");
    return;
}
// add item to array
copy.push(item); //alternative const newList
console.log(copy, "copy");
//add to localstorage
localStorage.setItem("items", JSON.stringify(copy));

document.getElementById("title").value = "";
document.getElementById("price").value = "";
 document.getElementById("desc").value = "";
document.getElementById("imgUrl").value = "";
// close modal
closeAddModal();
displayUIItems();
// location.reload();
}


//display items on UI
function getStoreItems(){
    const items = localStorage.getItem("items") 
    ? JSON.parse(localStorage.getItem("items")) : [];
    return items;
}
function format(price){
    const formatter = new Intl.NumberFormat(undefined,{
        style:"currency",
        currency: "NGN",
    });
    return formatter.format(price);
}

function displayUIItems(){
    const items = getStoreItems();
    const collection = document.getElementsByClassName("collection")[0];

    items.forEach((item) => {
        const collectionItem = document.createElement("div");
        collectionItem.className = "collection-item";
        collectionItem.innerHTML = `
<div style="constwidth: 100%; height: 300px">
<img 
src=${item.imgUrl}
alt="items"
width="320px"
class="collection-img"
/>
</div>
<h4 class="collection-items-title">${item.title}</h4>
<div class="collection-items-footer">
<span class="collection-items-price">${format(item.price)}</span>
<button class="btn collection-items-btn">ADD TO CART</button>
</div>
`;

collection.appendChild(collectionItem);
});
}

function displayItems(){
    // const items = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];

}

// add to cart handler
function addToCartHandler(e){
    // collect items value
    const collectionItem = e.target.parentElement.parentElement;
    // /-//-9+mnjhy 6t//Element;
     const title = collectionItem.getElementsByClassName("collection-items-title")[0].textContent;
     const price = collectionItem.getElementsByClassName("collection-items-price")[0].textContent;
     const imgUrl = collectionItem.getElementsByClassName("collection-img")[0].src;
   
    let cartItem = {
        title,
        imgUrl,
        price: toPriceDigits(price),
        qty: 1,
    };
    addCartItemToStore(cartItem)
}
function toPriceDigits(p){
    const pDotIndex = price.indexof('.');
    const pWithoutDecimal = p.substring(0, pDotIndex);
    const pWithoutSymbolAndSpace = pWithoutDecimal.slice(3).trim();
const pWithOnlyDigits = pWithoutSymbolAndSpace.match(/[0-9]+/g).join("");
return pWithOnlyDigits;d
}
// function addCartItemToStore(cartItem){
//     const cartItems = localStorage.getItem('catItems') ? JSON.parse(localStorage.getItem("cartItems")) : [];
// const copy = [...cartItems];
// const itemExist = copy.find((item)=> item.title.toLowerCase() === cartItem.toLowerCase())
// if(itemExist){
// alertMsg("Item with same title already exist in cart", "danger");
// return;
// }
// // add new item to copy array and store back
// copy.push(cartItem)
// save back in local storage
// localStorage.setItem("cartitemms", JSON.stringify(copy));
// alert success message
// display cart count

displayCartCount()
alertMsg("Items added to cart", "success");



function getCartItems(){
    let cartItems;
    if(localStorage.getItem("cartitems") === "null") {
cartItems = [];
} else {
cartItems = JSON.parse(localStorage.getItem("cartItems"));
}
return cartItems;
}
function displayCartCount(){
    const noOfCartItems = getCartItems();
    const cartCount = document.getElementsByClassName("cart-count")[0];
    cartCount.textContent = noOfCartItems ? noOfCartItems.length: 0; 
    // console.log(noOfcartItems)
}
function toPriceDigits(p){
    const pDotIndex = p.indexof(".");
    const pWithoutDecimal = p.substring(0, pDotIndex);
     // console.log(pWithoutDecimal);
     const pWithoutSymbolAndSpace = pWithoutDecimal.slice(3).trim();
    //  console.log(pWithoutSymbolAndSpace).trim;
     const pWithOnlyDigits = +pWithoutSymbolAndSpace.match(/[0-9]+/g).join("");  
    return pWithOnlyDigits;
    }
// function alertMsg(message, status){
//     const alertElem = document.getElementsByClassName("alert")[0]
//     const alertMsg = document.getElementById("alert-msg")
//     alertElem.classList.add("open", status);
//     alertMsg.textContent = message;
    
//     // close alert moda                                                                                                                                                                                                                                                                                                                                                                                                                                                                  l after 3secs.
//     setTimeout(() => {
//         alertElem.classList.remove("open", status);
//         }, 3000);
//     }
    
