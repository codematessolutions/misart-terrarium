// 🔥 FIREBASE IMPORT
import { db } from "../firebase.js";
import {
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const listContainer = document.getElementById("listContainer");
const pageTitle = document.getElementById("pageTitle");

// MAKE FUNCTIONS GLOBAL (important)
window.showOrders = async function () {
  pageTitle.innerText = "Orders";
  listContainer.innerHTML = "<p>Loading orders...</p>";

  try {
    const q = query(
      collection(db, "orders"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      listContainer.innerHTML = "<p>No orders found</p>";
      return;
    }

    listContainer.innerHTML = "";

    snapshot.forEach(doc => {
      const order = doc.data();

      listContainer.innerHTML += `
        <div class="card">
          <h3>${order.productName}</h3>
          <p><strong>Customer:</strong> ${order.customerName}</p>
          <p><strong>Mobile:</strong> ${order.mobileNumber}</p>
          <p><strong>Price:</strong> ₹${order.productPrice}</p>
          <p class="status"><strong>Status:</strong> ${order.status}</p>

          ${
            order.paymentScreenshotUrl
              ? `<a href="${order.paymentScreenshotUrl}" target="_blank">
                   View Payment Screenshot
                 </a>`
              : ""
          }
        </div>
      `;
    });

  } catch (err) {
    console.error("Error loading orders:", err);
    listContainer.innerHTML = "<p>Error loading orders</p>";
  }
};



// Auto-load orders
showOrders();

// booking section function (junaid)

window.showBookings = function () {
  pageTitle.innerText = "Bookings";
  listContainer.innerHTML = "";

  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  if (bookings.length === 0) {
    listContainer.innerHTML = "<p>No bookings yet</p>";
    return;
  }

  bookings.forEach(b => {
    listContainer.innerHTML += `
      <div class="card">
        <h3>${b.productName}</h3>
        <p>Customer: ${b.customerName}</p>
        <p>Mobile: ${b.mobileNumber}</p>
        <p>PIN: ${b.pinCode}</p>
        <p>Status: ${b.status}</p>
      </div>
    `;
  });
}
