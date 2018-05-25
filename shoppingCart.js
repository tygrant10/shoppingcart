// ***********************************
//Shopping Cart Functions

//array to contain all shopping cart items
var cart = [];

//to create item objects for us
var Item = function (name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
};

function addItemToCart(name, price, count) {

    for (var i in cart) {
        if (cart[i].name === name) {
            cart[i].count += count;
            saveCart();
            return;
        }
    }
    var item = new Item(name, price, count);
    cart.push(item);
    saveCart();
};

//Removes one item
function removeItemFromCart(name) {
    for (var i in cart) {
        if (cart[i].name === name) {
            cart[i].count--;
            if (cart[i].count === 0) {

                //remove item from cart (array)                    
                cart.splice(i, 1);
            }
            break;
        }
    }
    saveCart();
};

//Removes all of individual item
function removeItemFromCartAll(name) {
    for (var i in cart) {
        if (cart[i].name === name) {
            cart.splice(i, 1);
            break;
        }
    }
    saveCart();
};

function clearCart() {
    cart = [];
    saveCart();
}

//return total count
function countCart() {
    var totalCount = 0; //set outside of for loop, so it does not reset
    for (var i in cart) {
        totalCount += cart[i].count;
    }
    return totalCount;
};

//return total cost
function totalCart() {
    var totalCost = 0;
    for (var i in cart) {
        totalCost += cart[i].price * cart[i].count;
    }
    return totalCost.toFixed(2); //convert number to string and round to fixed (2) number of decimal places
}

//returns array of items, decoupled from HTML.  essentially create a copy array
function listCart() {
    var cartCopy = [];
    for (var i in cart) {  //loop through each item in the cart
        var item = cart[i];
        var itemCopy = {}; //what we pass back to other functions
        for (var p in item) {        //loop through each property in the object
            itemCopy[p] = item[p];
        }
        itemCopy.total = (item.price * item.count).toFixed(2);
        cartCopy.push(itemCopy);
    }
    return cartCopy;
};

//save to local storage, cart will not go away when browsing other pages
function saveCart() {
    localStorage.setItem("shoppingCart", JSON.stringify(cart)); //convert cart to a string describing the array and objects
    //by making value a JSON
};

//load to local storage, if you need to come back to cart, items will still be there
function loadCart() {
    cart = JSON.parse(localStorage.getItem("shoppingCart")); //parsing from string: 
    //a string due to JSON stringify
};

loadCart(); //load cart before display cart to actually show items