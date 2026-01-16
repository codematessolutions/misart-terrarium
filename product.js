const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const product = products.find(p => p.id === productId);

if (!product) {
  alert("Product not found");
}

document.getElementById("productImage").src = product.image;
document.getElementById("productName").innerText = product.name;
document.getElementById("productSize").innerText = `Size : ${product.size}`;
document.getElementById("productDescription").innerText = product.description;
document.getElementById("productPrice").innerText = `₹${product.price}`;

//WhatsApp Button (Dynamic Product) 
document.querySelector(".whatsapp-btn").addEventListener("click", () => {

  const message = `
Hi Misart,

🌿 Product: ${product.name}
💰 Price: ₹${product.price}
📐 Size: ${product.size}
  `;

  const url = `https://wa.me/918086783125?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
});
