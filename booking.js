import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";



// 1. Get product id from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// 2. Find product
const product = products.find(p => p.id === productId);

if (!product) {
  alert("Product not found");
  throw new Error("Invalid product");
}

// 3. Submit booking
document.querySelector(".submit-btn").addEventListener("click", async () => {

  const customerName = document.getElementById("customerName").value.trim();
  const mobileNumber = document.getElementById("mobileNumber").value.trim();
  const deliveryAddress = document.getElementById("deliveryAddress").value.trim();
  const pinCode = document.getElementById("pinCode").value.trim();

  // Validation
  if (!customerName || !mobileNumber || !deliveryAddress || !pinCode) {
    alert("All fields are required");
    return;
  }

  if (!/^\d{10}$/.test(mobileNumber)) {
    alert("Mobile number must be 10 digits");
    return;
  }

  if (!/^\d{6}$/.test(pinCode)) {
    alert("PIN code must be 6 digits");
    return;
  }

  // Booking object
  const bookingData = {
    type: "booking",
    productId: product.id,
    productName: product.name,

    customerName,
    mobileNumber,
    deliveryAddress,
    pinCode,

    status: "pending",
    createdAt: serverTimestamp()
  };

 
  try {
  await addDoc(collection(db, "bookings"), bookingData);

  alert("Booking submitted successfully!");
  window.location.href = "index.html";

} catch (error) {
  console.error("Error saving booking:", error);
  alert("Failed to submit booking");
}



  alert("Booking submitted successfully!");
  window.location.href = "index.html";
});
