// ===============================
// 🔥 FIREBASE IMPORTS
// ===============================
import { db } from "./firebase.js";
import { collection, addDoc, serverTimestamp } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const storage = getStorage();

// ===============================
// 🔹 GET PRODUCT FROM URL
// ===============================
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// sellingProducts must come from products.js
const product = sellingProducts.find(p => p.id === productId);

if (!product) {
  alert("Product not found");
  throw new Error("Invalid product ID");
}

// ===============================
// 🔹 FILL PRODUCT UI
// ===============================
document.getElementById("selectedProductImage").src = product.image;
document.getElementById("selectedProductName").innerText = product.name;
document.getElementById("selectedProductSize").innerText = `Size : ${product.size}`;
document.getElementById("selectedProductPrice").innerText = `₹${product.price}`;

// ===============================
// 🔹 DOM READY
// ===============================
document.addEventListener("DOMContentLoaded", () => {

  const customerNameInput = document.getElementById("customerName");
  const mobileInput = document.getElementById("mobileNumber");
  const addressInput = document.getElementById("deliveryAddress");
  const screenshotInput = document.getElementById("paymentScreenshot");
  const submitBtn = document.querySelector(".submit-btn");

  // ===============================
  // 🔹 MOBILE NUMBER VALIDATION
  // ===============================
  mobileInput.addEventListener("input", () => {
    mobileInput.value = mobileInput.value.replace(/\D/g, "");
    if (mobileInput.value.length > 10) {
      mobileInput.value = mobileInput.value.slice(0, 10);
    }
  });

  // ===============================
  // 🔹 SUBMIT ORDER
  // ===============================
  submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const customerName = customerNameInput.value.trim();
    const mobileNumber = mobileInput.value.trim();
    const deliveryAddress = addressInput.value.trim();
    // const screenshotFile = screenshotInput.files[0];

    // VALIDATION
    if (!customerName || !mobileNumber || !deliveryAddress) {
      alert("Please fill all fields");
      return;
    }

    if (!/^\d{10}$/.test(mobileNumber)) {
      alert("Please enter a valid 10-digit mobile number");
      mobileInput.focus();
      return;
    }

   

    submitBtn.disabled = true;
    submitBtn.innerText = "Submitting...";

    try {
      // ===============================
      // 🔥 UPLOAD SCREENSHOT
      // ===============================
    

      // ===============================
      // 🔥 SAVE ORDER TO FIRESTORE
      // ===============================
      await addDoc(collection(db, "orders"), {
        customerName,
        mobileNumber,
        deliveryAddress,

        productId: product.id,
        productName: product.name,
        productSize: product.size,
        productPrice: Number(product.price),
        // productImage: product.image,

        // paymentScreenshotUrl: screenshotUrl,

        paymentMethod: "QR",
        status: "new",              // new | confirmed | delivered
        source: "website",

        createdAt: serverTimestamp()
      });

      alert("✅ Order placed successfully!");
      submitBtn.innerText = "Submitted";

      // Optional reset
      // customerNameInput.value = "";
      // mobileInput.value = "";
      // addressInput.value = "";
      // screenshotInput.value = "";

    } catch (error) {
      console.error("❌ Order submission failed:", error);
      alert("❌ Failed to place order. Please try again.");

      submitBtn.disabled = false;
      submitBtn.innerText = "Submit";
    }
  });

});
