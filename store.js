// Create an array to store the order details
let order = [];
let GST = 0.13;
let shipping_cost = 0;

// Add event listeners to all the "Add to Order" buttons
const addToOrderButtons = document.querySelectorAll(".add-to-order");
const count = document.getElementById("count");

addToOrderButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    // Get the name and price of the gift from the button's data attributes
    const name = event.target.dataset.name;
    const price = event.target.dataset.price;
    // Use a prompt to ask for the gift quantity
    const quantity = parseInt(prompt("Enter the quantity:"));
    //validation for quantity
    if (isNaN(quantity) || quantity <= 0) {
      alert("Enter a valid quantity");
    } else {
      // Add the item to the order array
      order.push({ name, price, quantity });
      count.innerHTML = order.length;
    }
  });
});

// Add an event listener to the "Checkout" button
const checkoutButton = document.getElementById("checkout-button");
checkoutButton.addEventListener("click", () => {
  // Use a prompt to ask for the name on the gift order
  const nameOnOrder = prompt("Enter the name on the gift order:");

  //validation for name on the gift order
  if (nameOnOrder === "") {
    alert("Please enter the name on the gift order");
    return;
  }

  //calculating the total cost of the order
  let total_cost = 0;
  for (let i = 0; i < order.length; i++) {
    total_cost += order[i].price * order[i].quantity;
  }

  //Calculating the GST
  let GST_cost = total_cost * GST;
  if (total_cost < 50) {
    shipping_cost = 10;
  } else {
    shipping_cost = 0;
  }

  //calculating the final cost
  let final_cost = total_cost + GST_cost + shipping_cost;

  //generate the receipt
  let receipt = "";
  receipt += `<h2>Gift Shop Kiosk</h2>`;
  receipt += `<p>Name on the order: ${nameOnOrder}</p>`;
  receipt += `<p>Shipping Cost: ${shipping_cost}</p>`;
  receipt += `<p>GST: ${GST_cost}</p>`;
  receipt += `<table>`;
  receipt += `<tr><th>Gift Name</th><th>Quantity</th><th>Price</th></tr>`;
  for (let i = 0; i < order.length; i++) {
    receipt += `<tr><td>${order[i].name}</td><td>${order[i].quantity}</td><td>${
      order[i].price * order[i].quantity
    }</td></tr>`;
  }
  receipt += `</table>`;
  receipt += `<p>Total Cost: ${final_cost}</p>`;
  receipt += `<p><a href="/">Continue Shopping</a></p>`;

  //Show the receipt

  const rec = document.getElementById("receipt");
  rec.innerHTML = receipt;
  //Clear the order
  order = [];
});
