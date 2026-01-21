
const products = [
  {
    id: "product-1",

    // COMMON (used everywhere)
    name: "Three Jaded Pandas Terrarium Kitt",
    shortDescription: "An urban green solution if there ever was one,",

    // HOME PAGE
    thumbnail: "assets/booking product/booking product 1.jpg",

    // PRODUCT PAGE
    image: "assets/booking product/booking product 1.jpg",
    size: "Small (3x5x6)",
    price: 2000,
    fullDescription:
      "An urban green solution if there ever was one, The Three Jaded Pandas is an epitome of snugness. Making your home feel lazy and comfortable, the pandas are sure to leave an impact! Use your artistic skills to turn this DIY Kit into the terrarium you dreamt of! Make it a centre of attraction in your home and watch your guests go green with envy. Living in urban flats is no long an excuse. Go Green."
  },

  {
    id: "product-2",
    name: "Sea of Haworthia Terrarium Kit",
    shortDescription: "The Sea of Haworthia Terrarium Kit is a Mini Jungle, bringing in a lot of green to sooth your eyes at home!",
    thumbnail: "assets/booking product/booking product 2.png",
    image: "assets/booking product/booking product 2.png",
    size: "Medium",
    price: 1800,
    fullDescription:
      "The Sea of Haworthia Terrarium Kit is a Mini Jungle, bringing in a lot of green to sooth your eyes at home!"
  }
];

const sellingProducts = [
  {
    id: "eden-cube-sp",
    name: "Eden Cube Terrarium",
    image: "assets/Selling product/selling product 1.png",
    size: "Small (6” x 6”)",
    description: "Glass container, live moss, succulent plant",
    price: 5266
  },
  {
    id: "forest-dome-sp",
    name: "Forest Dome Terrarium",
    image: "assets/Selling product/selling  product 2.png",
    size: "Medium",
    description: "Mini forest ecosystem with stones",
    price: 4565
  }
];



// const sellingContainer = document.getElementById("sellingProductList");

// if (sellingContainer) {
//   sellingProducts.forEach(product => {
//     const card = document.createElement("div");
//     card.className = "selling-product-card";

//     card.innerHTML = `
//       <div class="selling-product-image">
//         <img src="${product.image}" alt="${product.name}">
//       </div>

//       <div class="selling-product-content">
//         <h3>${product.name}</h3>
//         <p class="selling-size">Size : ${product.size}</p>
//         <p class="selling-desc">${product.description}</p>

//         <div class="selling-footer">
//           <span class="selling-price">₹${product.price}</span>
//           <button class="btn order-btn" onclick="goToPurchase('${product.id}')">
//             Order Now
//           </button>
//         </div>
//       </div>
//     `;

//     sellingContainer.appendChild(card);
//   });
// }

// function goToPurchase(productId) {
//   window.location.href = `purchase.html?id=${productId}`;
// }

