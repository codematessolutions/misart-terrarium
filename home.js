

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

document.querySelectorAll(".clickable-card").forEach(card => {
  card.addEventListener("click", () => {
    window.location.href = card.dataset.link;
  });
});
