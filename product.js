
// document.addEventListener("DOMContentLoaded", () => {

//   const params = new URLSearchParams(window.location.search);
//   const productId = params.get("id");

//   const product = products.find(p => p.id === productId);

//   if (!product) {
//     alert("Product not found");
//     return;
//   }

//   // Populate product details
//   document.getElementById("productImage").src = product.image;
//   document.getElementById("productName").innerText = product.name;
//   document.getElementById("productSize").innerText = `Size : ${product.size}`;
//   document.getElementById("productDescription").innerText = product.fullDescription;
//   document.getElementById("productPrice").innerText = `₹${product.price}`;

//   // WhatsApp Button (Dynamic Product)
//   const whatsappBtn = document.querySelector(".whatsapp-btn");

//   if (whatsappBtn) {
//     whatsappBtn.addEventListener("click", () => {

//       const message = `
// Hi Misart,

// 🌿 Product: ${product.name}
// 💰 Price: ₹${product.price}
// 📐 Size: ${product.size}

//       `;

//       const url = `https://wa.me/918086783125?text=${encodeURIComponent(message)}`;
//       window.open(url, "_blank");
//     });
//   }

// });

// document.getElementById("productPrice").innerText = `₹${product.price}`;

// const mobilePriceEl = document.getElementById("mobileProductPrice");

// if (mobilePriceEl) {
//   mobilePriceEl.innerText = `₹${product.price}`;
// }


document.addEventListener("DOMContentLoaded", () => {

  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  const product = products.find(p => p.id === productId);

  if (!product) {
    alert("Product not found");
    return;
  }

  // Desktop content
  document.getElementById("productImage").src = product.image;
  document.getElementById("productName").innerText = product.name;
  document.getElementById("productSize").innerText = `Size : ${product.size}`;
  document.getElementById("productDescription").innerText = product.fullDescription;
  document.getElementById("productPrice").innerText = `₹${product.price}`;

  // ✅ Mobile sticky price (FIXED)
  const mobilePriceEl = document.getElementById("mobileProductPrice");
  if (mobilePriceEl) {
    mobilePriceEl.innerText = `₹${product.price}`;
  }

  // WhatsApp button
  document.querySelectorAll(".whatsapp-btn").forEach(btn => {
    btn.addEventListener("click", () => {

      const message = `
Hi Misart,

🌿 Product: ${product.name}
📐 Size: ${product.size}
💰 Price: ₹${product.price}
      `;

      const url = `https://wa.me/918086783125?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
    });
  });

});

