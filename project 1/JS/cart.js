// alert("connected")

if (document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded", ready)
}else{
ready();
}

function ready(){
    // const addItemBtn = document.getElementsByClassName("add-item")[0];
    //add listener 
//    addItemBtn.addEventListener("click", openModal);
//    console.log(addItemBtn); 
displayCartItems();
displayCartItems();
cartTotalHandler();

const removeCartBtn = document.getElementsByClassName("cart-items-remove");
for(let i = 0; i < removeCartBtn.length; i++) {
    const current = removeCartBtn[i];
    current.addEventListener("click", removeCartHandler);
}
//add listener 
   
// addItemBtn.addEventListener("click", openAddModal);
//    console.log(addItemBtn); 

const increamentCartQtyinput =
 document.getElementsByClassName("cart-items-qty")[0]
increamentCartQtyinput.addEventListener("change", increamentCartQtyHandler);
 console.log("increamentCartQtyinput");
 for (let i = 0; i < increamentCartQtyinput.length; i++) {
    const current = increamentCartQtyinput[i];
    current.addEventListener("change", increamentCartQtyHandler);
  }
}
    function removeCartHandler(e){
        const cartItemsElement = e.target.parentElement.parentElement;
       for (let i = 0; i < increamentCartQtyinput.length; i++) {

       }
        
       const title = cartItemsElement.getElementsByClassName("cart-title")[0].textContent;
        removeCartItem(title);
        // console.log(title);
        const copy = cartItems.slice();
        const filteredCartItems = copy.filter((item) => item.title.toLowercase() != "Mercedes 08 black".toLowerCase());
        console.log(filteredCartItems);

        // update local storage with the new data
        localStorage.setItems("cartItems", JSON.stringify(filteredCartItems));
    alertMsg ("item removed", "success");
    }


    function removeCartItem(title){
    const cartItems = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];
        // create a copy of the original
    const copy = cartItems.slice();
    const filteredCartItems = copy.filter((item)=> item.title.toLowerCase() != title.toLowerCase());
        // console.log(filteredCartItems);
    localStorage.setItem("cartItems", JSON.stringify(filteredCartItems));
    alertMsg("item removed", "success");
    }

    function format(price){
        const formatter = new Intl.NumberFormat(undefined,{
            style: "currency",
            currency: "NGN",
        });
        return formatter.format(price);
    }

 function getCartItems(){
    let cartItems;
    if (localStorage.getItem("cartItems") === "null") {
        cartItems = [];
} else {
    cartItems = JSON.parse(localStorage.getItem("cartItems"));
}
return cartItems;
}   
    

function displayCartCount(){
    const noOfCartItems = getCartItems();
    //const cart = document.getElementsByTagName
    const cartCount = document.getElementsByClassName("cart-count")[0];
    cartCount.textContent = noOfCartItems ? noOfCartItems.length : 0; 
    // console.log(noOfcartItems)
}

function displayCartItems (){
    const cartItems = getCartItems();
    const cart = document.getElementsByTagName("tbody")[0];
    // clear the cartcontent to appenf new list
    cart.innerHTML = "";
    for(let i = 0; i < cartItems.length; i++) {
        const current = cartItems[i];
        const tr = document.createElement("tr")
        tr.className = "cart-items"
        tr.innerHTML = `
        <td class="cart-items-title">
        
        <img src=${current.imgUrl} alt="cart-items"/>
    <span class="cart-title">${current.title}</span>
    </td>
    <td class="cart-items-price"> ₦${current.price}</td>
<td class="cart-items-qty-container">
    <input type="number" class="btn cart-items-qty" value=${current.qty}/>
    <button class="btn cart-items-remove">REMOVE</button>
</td>
`;
// append tr to the tbody
cart.appendChild(tr)
    }
}

function cartTotalHandler(){
    const cartItems = getCartItems();
    const total = cartItems.map((item) => item.price * item.qty).reduce((acc, curr) => acc + curr, 0);
    const cartTotalElement = document.getElementsByClassName("cart-total")[0];
    cartTotalElement.innerHTML = total ? `Total: ${format(total)}`: null;
}

function increamentCartQtyHandler(e){
    // console.log("click");
    const qty = e.target.value;
    if (qty =="" || +qty <= o){
        e.target.value = 1;
    }
    
    const parentElement = e.target.parentElement.parentElement;
    // console.log(e.target.value);
const title = parentElement.getElementsByClassName("cart-title")[0].textContent
const cartItems = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")): [];
const copy = [...cartItems];
// get item index
const index = copy.findIndex(
    (item)=> item.title.toLowerCase() == title.toLowerCase()
    );
const foundItem = copy[index];
foundItem.qty = e.target.value;
// save back the updated copy
localStorage.setItem("cartItems", JSON.stringify(copy))
location.reload();
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
function alertMsg(message, status){
    const alertElem = document.getElementsByClassName("alert")[0]
    const alertMsg = document.getElementById("alert-msg")
    alertElem.classList.add("open", status);
    alertMsg.textContent = message;
    
    // close alert moda                                                                                                                                                                                                                                                                                                                                                                                                                                                                  l after 3secs.
    setTimeout(() => {
        alertElem.classList.remove("open", status);
        }, 3000);
    }
