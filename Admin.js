// Admin.js

// Mock admin credentials
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'admin123';

// Sample data
let users = [
    { name: 'John Doe', email: 'john@example.com', phone: '1234567890' },
    { name: 'Jane Smith', email: 'jane@example.com', phone: '9876543210' }
];

let orders = [
    { id: 1, user: 'John Doe', address: '123 Main St', phone: '1234567890', food: 'Pizza', status: 'pending' },
    { id: 2, user: 'Jane Smith', address: '456 Maple Ave', phone: '9876543210', food: 'Burger', status: 'completed' }
];

let foodItems = [
    { name: 'Pizza', price: 12, image: 'pizza.jpg' },
    { name: 'Burger', price: 8, image: 'burger.jpg' }
];

// Render users
function renderUsers() {
    const usersList = document.getElementById('users-list');
    usersList.innerHTML = users.map(user => `
        <div>
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
        </div>
    `).join('');
}

// Render orders
function renderOrders() {
    const ordersList = document.getElementById('orders-list');
    ordersList.innerHTML = orders.map(order => `
        <div>
            <p><strong>User:</strong> ${order.user}</p>
            <p><strong>Address:</strong> ${order.address}</p>
            <p><strong>Phone:</strong> ${order.phone}</p>
            <p><strong>Food:</strong> ${order.food}</p>
            <p><strong>Status:</strong> <span class="status-dot ${order.status === 'pending' ? 'green' : 'red'}"></span>${order.status}</p>
            <button onclick="toggleOrderStatus(${order.id})">Toggle Status</button>
        </div>
    `).join('');
}

// Toggle order status
function toggleOrderStatus(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.status = order.status === 'pending' ? 'completed' : 'pending';
        renderOrders();
    }
}

// Render food items in the search dashboard
function renderFoodItems() {
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = foodItems.map(item => `
        <div>
            <img src="${item.image}" alt="${item.name}" width="100">
            <p><strong>Name:</strong> ${item.name}</p>
            <p><strong>Price:</strong> $${item.price}</p>
        </div>
    `).join('');
}

// Add new food item
function addFoodItem(event) {
    event.preventDefault();
    const name = document.getElementById('food-name').value;
    const price = document.getElementById('food-price').value;
    const image = document.getElementById('food-image').files[0]?.name || 'default.jpg';

    if (name && price) {
        foodItems.push({ name, price: Number(price), image });
        renderFoodItems();
        document.getElementById('add-food-form').reset();
        alert('Food item added successfully!');
    } else {
        alert('Please fill all the fields.');
    }
}

// Initialize the admin panel
function initAdminPanel() {
    renderUsers();
    renderOrders();
    renderFoodItems();

    document.getElementById('add-food-form').addEventListener('submit', addFoodItem);
}

// Run the initialization
window.onload = initAdminPanel;
