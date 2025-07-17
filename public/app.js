// public/app.js

const shop = new SweetShop();
function showModal(message, withInput = false, isConfirm = false) {
  return new Promise((resolve) => {
    const modal = document.getElementById("modal");
    const modalMsg = document.getElementById("modal-message");
    const modalInput = document.getElementById("modal-input");
    const btnOk = document.getElementById("modal-ok");
    const btnCancel = document.getElementById("modal-cancel");

    modalMsg.textContent = message;
    modalInput.classList.toggle("hidden", !withInput);
    btnCancel.classList.toggle("hidden", !isConfirm);

    modal.classList.remove("hidden");
    modalInput.value = "";

    btnOk.onclick = () => {
      modal.classList.add("hidden");
      resolve(withInput ? modalInput.value : true);
    };

    btnCancel.onclick = () => {
      modal.classList.add("hidden");
      resolve(false);
    };
  });
}

function addSweet() {
  const name = document.getElementById("name").value;
  const category = document.getElementById("category").value;
  const price = parseFloat(document.getElementById("price").value);
  const quantity = parseInt(document.getElementById("quantity").value, 10);

  if (!name || category === "" || isNaN(price) || isNaN(quantity)) {
    alert("Please fill all fields and select a category.");
    return;
  }

  const sweet = shop.addSweet(name, category, price, quantity);
  console.log(" Added sweet with ID:", sweet.id); 
  renderTable();
  clearInputs();
}

function renderTable(sweets = shop.getAllSweets()) {
  const table = document.getElementById("sweetTable");
  table.innerHTML = "";

  sweets.forEach((sweet, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${sweet.name}</td>
      <td>${sweet.category}</td>
      <td>${sweet.price}</td>
      <td>${sweet.quantity}</td>
      <td>
        <button onclick="promptPurchase('${sweet.id}')" ${sweet.quantity === 0 ? "disabled" : ""}>Buy</button>
        <button onclick="promptRestock('${sweet.id}')">Restock</button>
        <button onclick="deleteSweet('${sweet.id}')">Delete</button>
      </td>
    `;
    table.appendChild(row);
  });
}


async function promptPurchase(id) {
  const value = await showModal("How many units do you want to buy?", true, true);
  const quantity = parseInt(value, 10);
  if (!value || isNaN(quantity) || quantity <= 0) return;

  const success = shop.purchaseSweet(id, quantity);
  await showModal(success ? ` Purchased ${quantity} unit(s).` : " Not enough stock.");
  renderTable();
}

async function promptRestock(id) {
  const value = await showModal("Enter quantity to restock:", true, true);
  const quantity = parseInt(value, 10);
  if (!value || isNaN(quantity) || quantity <= 0) return;

  const success = shop.restockSweet(id, quantity);
  await showModal(success ? ` Restocked ${quantity} unit(s).` : " Sweet not found.");
  renderTable();
}

async function deleteSweet(id) {
  const confirm = await showModal("Are you sure you want to delete this sweet?", false, true);
  if (!confirm) return;

  const deleted = shop.deleteSweet(id);
  await showModal(deleted ? " Sweet deleted." : " Sweet not found.");
  renderTable();
}



function clearInputs() {
  ["name", "category", "price", "quantity"].forEach(id => {
    document.getElementById(id).value = "";
  });
}


function searchSweets() {
  const name = document.getElementById("searchName").value.trim();
  const minPrice = parseFloat(document.getElementById("minPrice").value);
  const maxPrice = parseFloat(document.getElementById("maxPrice").value);

  const filter = {};
  if (name) filter.name = name;
  if (!isNaN(minPrice) && !isNaN(maxPrice)) {
    filter.minPrice = minPrice;
    filter.maxPrice = maxPrice;
  }

  const results = shop.searchSweets(filter);
  renderTable(results);
}

function handleSearchInput(input) {
  if (input.value.trim() === "") {
    renderTable(); // Reset view when field is cleared manually
  }
}
function updateSuggestions() {
  const input = document.getElementById("searchName").value.toLowerCase();
  const datalist = document.getElementById("sweetSuggestions");

  datalist.innerHTML = "";

  const matches = shop.getAllSweets()
    .map(s => s.name)
    .filter(name => name.toLowerCase().includes(input))
    .slice(0, 10); // Limit to 10

  matches.forEach(name => {
    const option = document.createElement("option");
    option.value = name;
    datalist.appendChild(option);
  });
}

function sortSweets() {
  const field = document.getElementById("sortField").value;
  const order = document.getElementById("sortOrder").value;
  const category = document.getElementById("searchCategory").value;

  let sweets = shop.getAllSweets();

  // Filter by category if selected
  if (category) {
    sweets = sweets.filter(s => s.category === category);
  }

  // Sort if selected
  if (field && order) {
    sweets = sweets.sort((a, b) => {
      const valA = a[field];
      const valB = b[field];
      return typeof valA === 'string'
        ? order === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA)
        : order === 'asc' ? valA - valB : valB - valA;
    });
  }

  renderTable(sweets);
}


