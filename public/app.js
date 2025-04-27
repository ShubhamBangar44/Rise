// API endpoints
const API_URL = 'http://localhost:3000/api';

// Cart state
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let products = [];

// DOM Elements
const productList = document.getElementById('product-list');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const subtotal = document.getElementById('subtotal');
const total = document.getElementById('total');
const searchInput = document.getElementById('search');
const categorySelect = document.getElementById('category');
const checkoutBtn = document.getElementById('checkout-btn');

// Fetch products from backend
async function fetchProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        productList.innerHTML = '<p class="error">Failed to load products. Please try again later.</p>';
    }
}

// Display products
function displayProducts(productsToDisplay) {
    productList.innerHTML = '';
    if (productsToDisplay.length === 0) {
        productList.innerHTML = '<p class="no-products">No products found.</p>';
        return;
    }
    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">${product.price}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productList.appendChild(productCard);
    });
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCart();
        saveCart();
        showNotification('Product added to cart!');
    }
}

// Update cart display
function updateCart() {
    cartItems.innerHTML = '';
    let cartTotal = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartCount.textContent = '0';
        subtotal.textContent = '₹0';
        total.textContent = '₹0';
        return;
    }

    cart.forEach(item => {
        const itemTotal = parseInt(item.price.replace('₹', '')) * item.quantity;
        cartTotal += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>${item.price}</p>
            </div>
            <div class="cart-item-quantity">
                <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>
            <button onclick="removeFromCart(${item.id})" class="remove-btn">Remove</button>
        `;
        cartItems.appendChild(cartItem);
    });

    cartCount.textContent = cart.length;
    subtotal.textContent = `₹${cartTotal}`;
    total.textContent = `₹${cartTotal}`;
}

// Update quantity
function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) return;
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        updateCart();
        saveCart();
    }
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    saveCart();
    showNotification('Product removed from cart');
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Handle search input
searchInput.addEventListener('input', (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchQuery) || 
        product.description.toLowerCase().includes(searchQuery)
    );
    displayProducts(filteredProducts);
});

// Handle category filter
categorySelect.addEventListener('change', (e) => {
    const selectedCategory = e.target.value;
    if (selectedCategory === 'all') {
        displayProducts(products);
    } else {
        const filteredProducts = products.filter(product => product.category === selectedCategory);
        displayProducts(filteredProducts);
    }
});

// Checkout
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const order = {
        products: cart,
        totalAmount: parseInt(total.textContent.replace('₹', '')),
    };

    fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
    })
        .then(response => response.json())
        .then(data => {
            alert('Order placed successfully!');
            cart = [];
            updateCart();
            saveCart();
        })
        .catch(error => {
            console.error('Error placing order:', error);
            alert('Failed to place order. Please try again later.');
        });
});

// Initial fetch
fetchProducts();
