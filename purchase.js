// // 1. Get product id from URL
// const params = new URLSearchParams(window.location.search);
// const productId = params.get("id");

// // 2. Find product from products array
// const product = products.find(p => p.id === productId);

// if (!product) {
//   alert("Product not found");
// }

// // 3. Fill Selected Product UI
// document.getElementById("selectedProductImage").src = product.image;
// document.getElementById("selectedProductImage").alt = product.name;

// document.getElementById("selectedProductName").innerText = product.name;
// document.getElementById("selectedProductSize").innerText = `Size : ${product.size}`;
// document.getElementById("selectedProductPrice").innerText = `₹${product.price}`;


const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const product = sellingProducts.find(p => p.id === productId);

if (!product) {
  alert("Product not found");
  throw new Error("Invalid product ID");
}

// Fill selected product UI
document.getElementById("selectedProductImage").src = product.image;
document.getElementById("selectedProductName").innerText = product.name;
document.getElementById("selectedProductSize").innerText = `Size : ${product.size}`;
document.getElementById("selectedProductPrice").innerText = `₹${product.price}`;

// Mobile sticky bar (if exists)
const mobilePrice = document.getElementById("mobileProductPrice");
if (mobilePrice) {
  mobilePrice.innerText = `₹${product.price}`;
}

// LIMIT TO 10 DIGITS

const mobileInput = document.getElementById("mobileNumber");

// Allow only numbers
mobileInput.addEventListener("input", () => {
  mobileInput.value = mobileInput.value.replace(/\D/g, "");

  // Limit to 10 digits
  if (mobileInput.value.length > 10) {
    mobileInput.value = mobileInput.value.slice(0, 10);
  }
});

// 1. Get elements FIRST (after DOM is ready)
document.addEventListener("DOMContentLoaded", () => {

  const mobileInput = document.getElementById("mobileNumber");
  const submitBtn = document.querySelector(".submit-btn");

  // 2. Allow only numbers + limit to 10 digits
  mobileInput.addEventListener("input", () => {
    mobileInput.value = mobileInput.value.replace(/\D/g, "");

    if (mobileInput.value.length > 10) {
      mobileInput.value = mobileInput.value.slice(0, 10);
    }
  });

  // 3. Validate on submit (THIS IS YOUR CODE)
  submitBtn.addEventListener("click", function (e) {
    const mobile = mobileInput.value;

    if (mobile.length !== 10) {
      e.preventDefault();
      alert("Please enter a valid 10-digit mobile number");
      mobileInput.focus();
      return;
    }
  });

});

// while submit dat going to google sheet 

document.addEventListener("DOMContentLoaded", () => {

  const submitBtn = document.querySelector(".submit-btn");

  submitBtn.addEventListener("click", function (e) {
    e.preventDefault();

    // Form values
    const customerName = document.getElementById("customerName").value.trim();
    const mobileNumber = document.getElementById("mobileNumber").value.trim();
    const deliveryAddress = document.getElementById("deliveryAddress").value.trim();

    // Product values
    const productName = document.getElementById("selectedProductName").innerText;
    const productSize = document.getElementById("selectedProductSize").innerText;
    const productPrice = document.getElementById("selectedProductPrice").innerText;

    // Validation
    if (!customerName || !mobileNumber || !deliveryAddress) {
      alert("Please fill all fields");
      return;
    }

    if (!/^\d{10}$/.test(mobileNumber)) {
      alert("Mobile number must be 10 digits");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerText = "Submitting...";

    // Data to Google Sheet
    const data = {
      productName,
      productSize,
      productPrice,
      customerName,
      mobileNumber,
      deliveryAddress
    };


  });

});

