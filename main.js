window.onload = function() {
  filterSelection("all") // Execute the function and show all columns
  // Add active class to the current button (highlight it)
  var btnContainer = document.getElementById("myBtnContainer");
  if(btnContainer) {
    var btns = btnContainer.getElementsByClassName("btn");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function(){
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
      });
    }
  }

  /* button event listeners */
  var btns = document.getElementsByClassName('addtocart');
  for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function() {addToCart(this);});
  }

  // CART
  updateCartTotal()

}
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("column");
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

// Show filtered elements
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}


/* ADD TO CART functions */
function addToCart(elem) {
  //init
  var sibs = [];
  var getprice;
  var getproductName;
  var cart = [];
   var stringCart;

  //cycles siblings for product info near the add button
  while(elem = elem.previousSibling) {
      if (elem.nodeType === 3) continue; // text node
      if(elem.className == "price"){
          getprice = elem.innerText;
      }
      if (elem.className == "productname") {
          getproductName = elem.innerText;
      }
      sibs.push(elem);
  }
  //create product object
  var product = {
      productname : getproductName,
      price : getprice
  };
  //convert product data to JSON for storage
  var stringProduct = JSON.stringify(product);
  /*send product data to session storage */
  
  if(!sessionStorage.getItem('cart')){
      //append product JSON object to cart array
      cart.push(stringProduct);
      //cart to JSON
      stringCart = JSON.stringify(cart);
      //create session storage cart item
      sessionStorage.setItem('cart', stringCart);

      updateCartTotal();
  }
  else {
      //get existing cart data from storage and convert back into array
     cart = JSON.parse(sessionStorage.getItem('cart'));
      //append new product JSON object
      cart.push(stringProduct);
      //cart back to JSON
      stringCart = JSON.stringify(cart);
      //overwrite cart data in sessionstorage 
      sessionStorage.setItem('cart', stringCart);

      updateCartTotal();
  }

  window.location.href = "cart.html"
}

/* Calculate Cart Total */
function updateCartTotal(){
  //init
  var price = 0;
  var items = 0;
  var productname = "";
  var carttable = "";
  if(sessionStorage.getItem('cart')) {
      //get cart data & parse to array
      var cart = JSON.parse(sessionStorage.getItem('cart'));
      //get no of items in cart 
      items = cart.length;
      //loop over cart array
      for (var i = 0; i < items; i++){
          //convert each JSON product in array back into object
          var x = JSON.parse(cart[i]);
          //get property value of price // ('27.800đ').split('đ')[1]
          // price = parseFloat(x.price.split('$')[1]);
          price = parseFloat(x.price.split('đ')[0]);
          productname = x.productname;
          //add price to total
          carttable += "<tr><td>" + productname + "</td><td class='pprice'>" + price.toFixed(2) + "</td><td>1</td></tr>";
      }
  }
  //insert saved products to cart table
  if(document.getElementById("carttable")) document.getElementById("carttable").innerHTML = carttable;
}

function onBack() {
  window.location.href = "index.html"
}

function onCheckout() {
  document.getElementsByClassName('notify')[0].style.visibility = 'visible';
}

function test() {
  sessionStorage.onDelete('cart', '')
  window.location.href = "cart.html"
}
