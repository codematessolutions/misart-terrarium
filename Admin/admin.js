const orders = [
  {
    id: "ORD001",
    productName: "Eden Cube Terrarium",
    customerName: "Junaid",
    price: 5266,
    status: "New"
  }
];

const bookings = [
  {
    id: "BK001",
    productName: "Three Jaded Pandas",
    customerName: "Ameen",
    status: "Pending"
  }
];

const listContainer = document.getElementById("listContainer");
const pageTitle = document.getElementById("pageTitle");

function showOrders() {
  pageTitle.innerText = "Orders";
  listContainer.innerHTML = "";

  orders.forEach(order => {
    listContainer.innerHTML += `
      <div class="card">
        <h3>${order.productName}</h3>
        <p>Customer: ${order.customerName}</p>
        <p>Price: ₹${order.price}</p>
        <p class="status">Status: ${order.status}</p>
      </div>
    `;
  });
}

function showBookings() {
  pageTitle.innerText = "Bookings";
  listContainer.innerHTML = "";

  bookings.forEach(booking => {
    listContainer.innerHTML += `
      <div class="card">
        <h3>${booking.productName}</h3>
        <p>Customer: ${booking.customerName}</p>
        <p class="status">Status: ${booking.status}</p>
      </div>
    `;
  });
}

// Load orders by default
showOrders();