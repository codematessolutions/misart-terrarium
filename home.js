// 🔥 Firebase imports
import { db } from "./firebase.js";
import { collection, addDoc } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ===============================
// PRODUCT RENDERING (UNCHANGED)
// ===============================

const productList = document.getElementById("product-list");

products.forEach(product => {
  productList.innerHTML += `
    <div class="col-lg-3 col-md-6 mb-4">
      <div class="product-card clickable-card"
        data-link="product.html?id=${product.id}">
        <img src="${product.thumbnail}" alt="${product.name}">
        <h5 class="product-name">${product.name}</h5>
        <p>${product.shortDescription}</p>
        <button class="btn book-btn">Book Now</button>
      </div>
    </div>
  `;
});

// ===============================
// CARD CLICK NAVIGATION
// ===============================

document.addEventListener("click", (e) => {
  const card = e.target.closest(".clickable-card");
  if (card) {
    window.location.href = card.dataset.link;
  }
});

// ===============================
// 🔍 FIREBASE CONNECTION TEST
// ===============================

window.checkFirebaseConnection = async function () {
  try {
    await addDoc(collection(db, "connection_test"), {
      page: "home",
      status: "connected",
      time: new Date()
    });

    console.log("✅ Firebase Connected Successfully");
    alert("✅ Firebase Connected");
  } catch (error) {
    console.error("❌ Firebase Connection Failed:", error);
    alert("❌ Firebase NOT Connected");
  }
};

window.addSampleProduct = async function () {
  try {
    await addDoc(collection(db, "products"), {
      name: "junaind",
      price: 2499,
      thumbnail: "https://via.placeholder.com/300",
      shortDescription: "A self-sustaining mini forest in glass",
      available: true,
      createdAt: new Date()
    });

    alert("✅ Sample product added");
    console.log("✅ Sample data inserted");
  } catch (error) {
    console.error("❌ Error adding sample data:", error);
    alert("❌ Failed to add sample data");
  }
};

