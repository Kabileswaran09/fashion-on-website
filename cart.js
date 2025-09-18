  const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuToggle.classList.toggle("active");
});

const cartContainer = document.getElementById('cartContainer');
const totalCostEl = document.getElementById('totalCost');
const cartCountEl = document.getElementById('cart-count');
const buyNowBtn = document.getElementById('buyNowBtn');

function renderProducts() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cartContainer.innerHTML = '';

  if (cart.length === 0) {
    cartContainer.innerHTML = `<div class="empty-cart">Your cart is empty 🛍️</div>`;
    totalCostEl.textContent = "0.00";
    cartCountEl.textContent = "0";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    if (!item.quantity) item.quantity = 1;

    let price = 0;
    if (typeof item.price === 'number') {
      price = item.price;
    } else if (typeof item.price === 'string') {
      price = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
    }

    total += price * item.quantity;

    const cartItem = document.createElement('article');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <img src="${item.img}" alt="${item.name}" />
      <div class="item-details">
        <div class="item-name">${item.name}</div>
        <div class="item-price">₹${price.toFixed(2)}</div>
      </div>
      <div class="item-controls">
        <div class="quantity-control">
        <button class="decre" data-id="${index}" onclick="rem(${index})" >-</button>
          <span class="quantity-value">${item.quantity}</span>
          <button class="incre" data-id="${index}" aria-label="Increase quantity">+</button>
        </div>
        <button class="deletebtn" data-id="${index}" aria-label="Delete item">
          <i class="fas fa-trash-alt"></i> Delete
        </button>
      </div>
    `;
    cartContainer.appendChild(cartItem);
  });

  totalCostEl.textContent = total.toFixed(2);
  cartCountEl.textContent = cart.length;

  document.querySelectorAll('.incre').forEach(button => {
    button.addEventListener('click', () => {
      const id = button.getAttribute('data-id');
      updateQuantity(id, 1);
    });
  });

  document.querySelectorAll('.decre').forEach(button => {
    button.addEventListener('click', () => {
      const id = button.getAttribute('data-id');
      updateQuantity(id, -1);
    });
  });

  document.querySelectorAll('.deletebtn').forEach(button => {
    button.addEventListener('click', () => {
      const id = button.getAttribute('data-id');
      deleteItem(id);
    });
  });
}

function updateQuantity(id, change) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart[id]) {
    cart[id].quantity = (cart[id].quantity || 1) + change;
    if (cart[id].quantity < 1) cart[id].quantity = 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    renderProducts();
  }
}

function deleteItem(id) {
  if (confirm('Are you sure you want to delete this item from your purchase list?')) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(id, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Item deleted.');
    renderProducts();
  }
}

buyNowBtn.addEventListener('click', () => {
  const total = totalCostEl.textContent;
  if (total === '0.00') {
    alert("Your cart is empty. Click Add to Cart to add products.");
    return;
  }
  if (confirm(`Are you sure you want to purchase for ₹${total}?`)) {
    alert("Thank you for your purchase and welcome!");
    localStorage.removeItem('cart');  


    
    window.location.href = "home.html";
  }
});

renderProducts();



let lgbtn = document.querySelector(".logout")
lgbtn.addEventListener("click",()=>{
  let logoutCheck = confirm("Do you want to logout ?")
  setTimeout(()=>{
     if(logoutCheck == 1){
    window.location.href = "index.html"
  }
  },1000)
  
})


// function rem(index){
//   let qtyEl = document.querySelectorAll(".qty")[index];
//   let qty = parseInt(qtyEl.innerHTML);

//   if(qty <= 1){
//     alert("Quantity cannot be less than 1");
//   }
// }