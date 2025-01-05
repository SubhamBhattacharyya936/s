// app.js

// Sample food items
let foodItems = [
    { id: 1, name: 'Pizza', price: 12, image: 'pizza.jpg' },
    { id: 2, name: 'Burger', price: 8, image: 'burger.jpg' },
    { id: 3, name: 'Pasta', price: 10, image: 'pasta.jpg' },
    { id: 4, name: 'Salad', price: 7, image: 'salad.jpg' }
];

let orders = [];
let currentUser = {
    name: 'Guest User',
    phone: '1234567890',
    email: 'guest@example.com'
};

// Render food items on home screen
function renderHome() {
    const homeContainer = document.getElementById('home-container');
    homeContainer.innerHTML = foodItems.map(item => `
        <div class="food-item">
            <img src="${item.image}" alt="${item.name}" width="100">
            <p><strong>${item.name}</strong></p>
            <p>Price: $${item.price}</p>
            <button onclick="openOrderForm(${item.id})">Order</button>
        </div>
    `).join('');
}

// Open order form
function openOrderForm(foodId) {
    const food = foodItems.find(item => item.id === foodId);
    if (food) {
        const orderForm = document.getElementById('order-form');
        document.getElementById('order-food-name').innerText = food.name;
        document.getElementById('order-user-name').value = currentUser.name;
        document.getElementById('order-user-phone').value = currentUser.phone;
        document.getElementById('order-user-address').value = '';
        orderForm.style.display = 'block';
        orderForm.dataset.foodId = foodId;
    }
}

// Place an order
function placeOrder() {
    const foodId = Number(document.getElementById('order-form').dataset.foodId);
    const address = document.getElementById('order-user-address').value;

    if (address) {
        const food = foodItems.find(item => item.id === foodId);
        orders.push({
            id: orders.length + 1,
            user: currentUser.name,
            phone: currentUser.phone,
            address,
            food: food.name,
            status: 'pending'
        });

        document.getElementById('order-form').style.display = 'none';
        renderOrders();
        alert('Order placed successfully!');
    } else {
        alert('Please fill in the address field.');
    }
}

// Render orders
function renderOrders() {
    const ordersContainer = document.getElementById('orders-container');
    ordersContainer.innerHTML = orders.map(order => `
        <div>
            <p><strong>Food:</strong> ${order.food}</p>
            <p><strong>Status:</strong> <span class="status-dot ${order.status === 'pending' ? 'green' : 'red'}"></span>${order.status}</p>
        </div>
    `).join('');
}

// Search food
function searchFood() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const results = foodItems.filter(item => item.name.toLowerCase().includes(query));
    const searchResults = document.getElementById('search-results');

    searchResults.innerHTML = results.map(item => `
        <div>
            <p><strong>${item.name}</strong> - $${item.price}</p>
        </div>
    `).join('');
}

// Initialize the app
function initApp() {
    renderHome();
    renderOrders();
    document.getElementById('search-bar').addEventListener('input', searchFood);
    document.getElementById('place-order-btn').addEventListener('click', placeOrder);
}

// Run the app initialization
window.onload = initApp;
