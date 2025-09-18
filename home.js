
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show'); 
  menuToggle.classList.toggle('active');
});

// Load products from localStorage
const productGrid = document.querySelector('.product-grid');
const cartCount = document.querySelector('.cart-count');

const storedProducts = JSON.parse(localStorage.getItem('productdetails')) || [];

storedProducts.forEach(product => {
  const card = document.createElement('div');
  card.classList.add('product-card');

  card.innerHTML = `
    <img src="${product.productimg}" alt="${product.pname}" class="product-image" />
    <h3 class="product-title">${product.pname}</h3>
    <p class="product-price">₹${product.poldprice}</p>
    <button class="add-to-cart-btn">
      <i class="fas fa-cart-plus"></i> Add to Cart
    </button>
  `;

  productGrid.appendChild(card);
});

// Load or initialize cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];
cartCount.innerText = cart.length;

// Extract price from string
function extractPrice(text) {
  const match = text.match(/\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : 0;
}

// Add to cart functionality
productGrid.addEventListener('click', (e) => {
  if (e.target.closest('.add-to-cart-btn')) {
    e.preventDefault();

    const btn = e.target.closest('.add-to-cart-btn');
    const card = btn.closest('.product-card');

    const title = card.querySelector('.product-title').innerText.trim();
    const priceText = card.querySelector('.product-price').innerText.trim();
    const price = extractPrice(priceText);

    const product = {
      id: `${title}-${price}`,
      img: card.querySelector('img').src,
      name: title,
      price: price
    };

    const exists = cart.find(item => item.id === product.id);

    if (exists) {
      alert("You already added this product to cart!");
    } else {
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      cartCount.innerText = cart.length;
      alert("Product added to cart!");
    }
  }
});



let lgbtn = document.querySelector(".logout")
lgbtn.addEventListener("click",()=>{
  let logoutCheck = confirm("Do you want to logout ?")
  setTimeout(()=>{
     if(logoutCheck == 1){
    window.location.href = "index.html"
  }
  },1000)
  
})

