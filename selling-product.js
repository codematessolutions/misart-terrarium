const sellingProductList = document.getElementById("sellingProductList");

sellingProducts.forEach(item => {
  sellingProductList.innerHTML += `
    <div class="col-lg-6 mb-5" style=" width: 100%;">
      <div class="selling-product-card d-flex align-items-center gap-4" >

        <img 
          src="${item.image}" 
          alt="${item.name}" 
          class="selling-product-image"
        >

        <div class="selling-product-content ">
          <h3 class="selling-product-title "  >${item.name}</h3>
          <p class="selling-product-size">Size : ${item.size}</p>
          <p class="selling-product-description">${item.description}</p>

          <div class="selling-product-action">
            <span class="selling-product-price">₹${item.price}</span>
            <a href="purchase.html?id=${item.id}" class="order-btn">Buy Now</a>


          </div>
        </div>

      </div>
    </div>
  `;
});


