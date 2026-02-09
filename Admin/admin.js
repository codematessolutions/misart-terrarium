// 🔥 FIREBASE IMPORTS
import { db } from "../firebase.js";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// DOM ELEMENTS
const listContainer = document.getElementById("listContainer");
const pageTitle = document.getElementById("pageTitle");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");

// STATE
let currentOrders = [];
let currentBookings = [];
let activePage = "orders";

// -------------------- ORDERS --------------------

window.showOrders = async function () {
  activePage = "orders";
  pageTitle.innerText = "Orders";
  listContainer.innerHTML = "<p>Loading orders...</p>";

  try {
    const q = query(
      collection(db, "orders"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);
    currentOrders = [];

    snapshot.forEach(docSnap => {
      currentOrders.push({
        id: docSnap.id,
        ...docSnap.data()
      });
    });

    populateStatusFilter("orders");
    renderOrders(currentOrders);

  } catch (error) {
    console.error("Error loading orders:", error);
    listContainer.innerHTML = "<p>Error loading orders</p>";
  }
};

function renderOrders(data) {
  listContainer.innerHTML = "";

  if (data.length === 0) {
    listContainer.innerHTML = "<p>No orders found</p>";
    return;
  }

  data.forEach(order => {
    listContainer.innerHTML += `
      <div class="card">
        <h3>${order.productName}</h3>
        <p><strong>Customer:</strong> ${order.customerName}</p>
        <p><strong>Mobile:</strong> ${order.mobileNumber}</p>
        <p><strong>Address:</strong> ${order.deliveryAddress}</p>
        <p><strong>Price:</strong> ₹${order.productPrice}</p>

        <p>
          <strong>Status:</strong>
          <select onchange="updateOrderStatus('${order.id}', this.value)">
            <option value="new_order" ${order.status === "new_order" ? "selected" : ""}>New Order</option>
            <option value="confirmed" ${order.status === "confirmed" ? "selected" : ""}>Confirmed</option>
            <option value="shipped" ${order.status === "shipped" ? "selected" : ""}>Shipped</option>
            <option value="cancelled" ${order.status === "cancelled" ? "selected" : ""}>Cancelled</option>
          </select>
        </p>
      </div>
    `;
  });
}

window.updateOrderStatus = async function (orderId, newStatus) {
  try {
    await updateDoc(doc(db, "orders", orderId), {
      status: newStatus
    });
  } catch (error) {
    console.error("Order status update failed", error);
    alert("Failed to update order status");
  }
};

// -------------------- BOOKINGS --------------------

window.showBookings = async function () {
  activePage = "bookings";
  pageTitle.innerText = "Bookings";
  listContainer.innerHTML = "<p>Loading bookings...</p>";

  try {
    const q = query(
      collection(db, "bookings"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);
    currentBookings = [];

    snapshot.forEach(docSnap => {
      currentBookings.push({
        id: docSnap.id,
        ...docSnap.data()
      });
    });

    populateStatusFilter("bookings");
    renderBookings(currentBookings);

  } catch (error) {
    console.error("Error loading bookings:", error);
    listContainer.innerHTML = "<p>Error loading bookings</p>";
  }
};

function renderBookings(data) {
  listContainer.innerHTML = "";

  if (data.length === 0) {
    listContainer.innerHTML = "<p>No bookings found</p>";
    return;
  }

  data.forEach(booking => {
    listContainer.innerHTML += `
      <div class="card">
        <h3>${booking.productName}</h3>
        <p><strong>Customer:</strong> ${booking.customerName}</p>
        <p><strong>Mobile:</strong> ${booking.mobileNumber}</p>
        <p><strong>Address:</strong> ${booking.deliveryAddress}</p>
        <p><strong>PIN:</strong> ${booking.pinCode}</p>

        <p>
          <strong>Status:</strong>
          <select onchange="updateBookingStatus('${booking.id}', this.value)">
            <option value="new_booking" ${booking.status === "new_booking" ? "selected" : ""}>New Booking</option>
            <option value="booking_confirmed" ${booking.status === "booking_confirmed" ? "selected" : ""}>Booking Confirmed</option>
            <option value="shipped" ${booking.status === "shipped" ? "selected" : ""}>Shipped</option>
            <option value="cancelled" ${booking.status === "cancelled" ? "selected" : ""}>Cancelled</option>
          </select>
        </p>
      </div>
    `;
  });
}

window.updateBookingStatus = async function (bookingId, newStatus) {
  try {
    await updateDoc(doc(db, "bookings", bookingId), {
      status: newStatus
    });
  } catch (error) {
    console.error("Booking status update failed", error);
    alert("Failed to update booking status");
  }
};

// -------------------- SEARCH & FILTER --------------------

window.applyFilter = function () {
  const searchText = searchInput.value.toLowerCase();
  const status = statusFilter.value;

  let data = activePage === "orders"
    ? [...currentOrders]
    : [...currentBookings];

  if (searchText) {
    data = data.filter(item =>
      item.customerName.toLowerCase().includes(searchText) ||
      item.mobileNumber.includes(searchText)
    );
  }

  if (status) {
    data = data.filter(item => item.status === status);
  }

  activePage === "orders"
    ? renderOrders(data)
    : renderBookings(data);
};

window.clearFilter = function () {
  searchInput.value = "";
  statusFilter.value = "";

  activePage === "orders"
    ? renderOrders(currentOrders)
    : renderBookings(currentBookings);
};

function populateStatusFilter(type) {
  statusFilter.innerHTML = `<option value="">All Status</option>`;

  const statuses =
    type === "orders"
      ? ["new_order", "confirmed", "shipped", "cancelled"]
      : ["new_booking", "booking_confirmed", "shipped", "cancelled"];

  statuses.forEach(status => {
    statusFilter.innerHTML += `
      <option value="${status}">
        ${status.replace("_", " ").toUpperCase()}
      </option>
    `;
  });
}

// -------------------- DEFAULT LOAD --------------------
showOrders();
