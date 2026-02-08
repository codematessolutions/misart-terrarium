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
          <p><strong>Address:</strong> ${order.deliveryAddress}</p>
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

window.showBookings = async function () {
  pageTitle.innerText = "Bookings";
  listContainer.innerHTML = "<p>Loading bookings...</p>";

  try {
    const q = query(
      collection(db, "bookings"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      listContainer.innerHTML = "<p>No bookings found</p>";
      return;
    }

    listContainer.innerHTML = "";

    snapshot.forEach(doc => {
      const booking = doc.data();

      listContainer.innerHTML += `
        <div class="card">
          <h3>${booking.productName}</h3>

          <p><strong>Customer:</strong> ${booking.customerName}</p>
          <p><strong>Mobile:</strong> ${booking.mobileNumber}</p>
          <p><strong>Address:</strong> ${booking.deliveryAddress}</p>
          <p><strong>PIN:</strong> ${booking.pinCode}</p>

          <p class="status"><strong>Status:</strong> ${booking.status}</p>
        </div>
      `;
    });

  } catch (error) {
    console.error("Error loading bookings:", error);
    listContainer.innerHTML = "<p>Error loading bookings</p>";
  }
};

