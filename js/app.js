document.addEventListener("DOMContentLoaded", () => {
    renderApp();
});

// HELPERS
function todayISO() {
    return new Date().toISOString().slice(0, 10);
}

function capitalizeWords(str) {
    return str.replace(/\b\w/g, c => c.toUpperCase());
}

function openModal() {
    document.getElementById("modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// ORDER PRIORITY

function getOrderPriority(order) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const deadline = new Date(order.deadline);
    deadline.setHours(0, 0, 0, 0);

    const days = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));

    if (days < 0) return { label: "Overdue", color: "#b00020", days };
    if (days <= 2) return { label: "High", color: "#ff3131", days };
    if (days <= 5) return { label: "Medium", color: "#ff9800", days };
    return { label: "Low", color: "#4caf50", days };
}

// PERSISTENCE
function saveData() {
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("materials", JSON.stringify(materials));
}

// ORDERS — Add / Edit modal
function productOptionsHtml(selectedName) {
    return products.map(p => `
        <option value="${p.name}" data-price="${p.price}" ${p.name === selectedName ? "selected" : ""}>
            ${p.name} (Stock: ${p.stock})
        </option>
    `).join("");
}

function orderProductRowHtml(item) {
    const name = item ? item.product : (products[0] ? products[0].name : "");
    const qty = item ? item.quantity : 1;
    return `
    <div class="product-row">
        <select class="order-product" onchange="calculateOrderTotal()">${productOptionsHtml(name)}</select>
        <input class="order-quantity" type="number" min="1" value="${qty}" oninput="calculateOrderTotal()">
        <button type="button" class="remove-row-btn" onclick="removeOrderRow(this)">&times;</button>
    </div>`;
}

function addOrderProductRow() {
    document.getElementById("orderProducts").insertAdjacentHTML("beforeend", orderProductRowHtml(null));
    calculateOrderTotal();
}

function removeOrderRow(btn) {
    const rows = document.querySelectorAll("#orderProducts .product-row");
    if (rows.length <= 1) return;
    btn.closest(".product-row").remove();
    calculateOrderTotal();
}

function calculateOrderTotal() {
    let totalItems = 0;
    let totalPrice = 0;

    document.querySelectorAll("#orderProducts .product-row").forEach(row => {
        const select = row.querySelector(".order-product");
        const qty = Number(row.querySelector(".order-quantity").value) || 0;
        const selected = select.options[select.selectedIndex];
        const price = selected ? Number(selected.dataset.price) : 0;

        totalItems += qty;
        totalPrice += price * qty;
    });

    const itemsEl = document.getElementById("totalItems");
    const priceEl = document.getElementById("totalPrice");
    if (itemsEl) itemsEl.textContent = totalItems;
    if (priceEl) priceEl.textContent = formatMoney(totalPrice);
}

function collectOrderItems() {
    const items = [];
    document.querySelectorAll("#orderProducts .product-row").forEach(row => {
        const product = row.querySelector(".order-product").value;
        const quantity = Number(row.querySelector(".order-quantity").value);
        if (product && quantity > 0) {
            items.push({ product, quantity });
        }
    });
    return items;
}

function openOrderModal() {
    if (!products.length) {
        alert("Add a product first before creating an order.");
        return;
    }

    document.getElementById("modalBody").innerHTML = `
        <h2>New Order</h2>
        <label>Customer Name</label>
        <input id="orderCustomer" placeholder="Customer name">

        <label>Products</label>
        <div id="orderProducts">${orderProductRowHtml(null)}</div>
        <button type="button" class="secondary-btn" onclick="addOrderProductRow()">+ Add Product</button>

        <label>Order Date</label>
        <input id="orderDate" type="date" value="${todayISO()}">

        <label>Deadline</label>
        <input id="orderDeadline" type="date">

        <div class="order-summary">
            <p>Total Items: <span id="totalItems">0</span></p>
            <p>Total Price: <span id="totalPrice">${formatMoney(0)}</span></p>
        </div>

        <button class="save-btn" onclick="saveNewOrder()">Save Order</button>
    `;
    openModal();
    setTimeout(calculateOrderTotal, 50);
}

function saveNewOrder() {
    const customer = document.getElementById("orderCustomer").value.trim();
    const deadline = document.getElementById("orderDeadline").value;
    const items = collectOrderItems();

    if (!customer) { alert("Please enter a customer name."); return; }
    if (!items.length) { alert("Add at least one product."); return; }
    if (!deadline) { alert("Please choose a deadline."); return; }

    const newOrder = {
        id: orders.length ? Math.max(...orders.map(o => o.id)) + 1 : 1,
        customer,
        items,
        orderDate: document.getElementById("orderDate").value,
        deadline,
        status: "New"
    };

    orders.push(newOrder);
    saveData();
    closeModal();
    navigate("orders");
}

function openEditOrderModal(id) {
    const order = orders.find(o => o.id === id);
    if (!order) return;

    const rowsHtml = order.items.map(item => orderProductRowHtml(item)).join("");

    document.getElementById("modalBody").innerHTML = `
        <h2>Edit Order #${order.id}</h2>
        <label>Customer Name</label>
        <input id="orderCustomer" value="${order.customer}">

        <label>Products</label>
        <div id="orderProducts">${rowsHtml}</div>
        <button type="button" class="secondary-btn" onclick="addOrderProductRow()">+ Add Product</button>

        <label>Order Date</label>
        <input id="orderDate" type="date" value="${order.orderDate}">

        <label>Deadline</label>
        <input id="orderDeadline" type="date" value="${order.deadline}">

        <label>Status</label>
        <select id="orderStatus">
            <option ${order.status === "New" ? "selected" : ""}>New</option>
            <option ${order.status === "Open" ? "selected" : ""}>Open</option>
            <option ${order.status === "Completed" ? "selected" : ""}>Completed</option>
        </select>

        <div class="order-summary">
            <p>Total Items: <span id="totalItems">0</span></p>
            <p>Total Price: <span id="totalPrice">${formatMoney(0)}</span></p>
        </div>

        <button class="save-btn" onclick="updateOrder(${order.id})">Update Order</button>
        <button class="delete-btn" onclick="deleteOrder(${order.id})">Delete Order</button>
    `;
    openModal();
    setTimeout(calculateOrderTotal, 50);
}

function updateOrder(id) {
    const order = orders.find(o => o.id === id);
    if (!order) return;

    const oldStatus = order.status;
    const items = collectOrderItems();

    if (!items.length) { alert("Add at least one product."); return; }

    order.customer = document.getElementById("orderCustomer").value.trim();
    order.items = items;
    order.orderDate = document.getElementById("orderDate").value;
    order.deadline = document.getElementById("orderDeadline").value;
    order.status = document.getElementById("orderStatus").value;

    if (oldStatus !== "Completed" && order.status === "Completed") {
        applySmartInventory(order);
    }

    saveData();
    closeModal();
    navigate("orders");
}

// Fast-path "Complete" action straight from the table row
function completeOrder(id) {
    const order = orders.find(o => o.id === id);
    if (!order || order.status === "Completed") return;

    order.status = "Completed";
    applySmartInventory(order);
    saveData();
    navigate("orders");
}

function deleteOrder(id) {
    if (!confirm("Delete this order?")) return;

    const index = orders.findIndex(o => o.id === id);
    if (index === -1) return;

    orders.splice(index, 1);
    saveData();
    closeModal();
    navigate("orders");
}

//SMART INVENTORY
function applySmartInventory(order) {
    order.items.forEach(item => {
        const product = products.find(
            p => p.name.toLowerCase() === item.product.toLowerCase()
        );
        if (!product) return;

        (product.recipe || []).forEach(entry => {
            const material = materials.find(
                m => m.name.toLowerCase() === entry.material.toLowerCase()
            );
            if (material) {
                material.quantity -= entry.amount * item.quantity;
                if (material.quantity < 0) material.quantity = 0;
            }
        });

        product.stock -= item.quantity;
        if (product.stock < 0) product.stock = 0;
        product.sold = (product.sold || 0) + item.quantity;
    });
}

// PRODUCTS — Add / Edit modal 
function materialOptionsHtml(selectedName) {
    return materials.map(m => `
        <option value="${m.name}" ${m.name === selectedName ? "selected" : ""}>${m.name} (${m.unit})</option>
    `).join("");
}

function recipeRowHtml(entry) {
    const name = entry ? entry.material : (materials[0] ? materials[0].name : "");
    const amount = entry ? entry.amount : "";
    return `
    <div class="recipe-row">
        <select class="recipe-material">${materialOptionsHtml(name)}</select>
        <input class="recipe-amount" type="number" min="0" step="0.01" value="${amount}" placeholder="Amount">
        <button type="button" class="remove-row-btn" onclick="this.closest('.recipe-row').remove()">&times;</button>
    </div>`;
}

function addRecipeRow() {
    document.getElementById("recipeRows").insertAdjacentHTML("beforeend", recipeRowHtml(null));
}

function collectRecipe() {
    const recipe = [];
    document.querySelectorAll("#recipeRows .recipe-row").forEach(row => {
        const materialName = row.querySelector(".recipe-material").value;
        const amount = Number(row.querySelector(".recipe-amount").value);
        const material = materials.find(m => m.name === materialName);

        if (materialName && amount > 0) {
            recipe.push({ material: materialName, amount, unit: material ? material.unit : "" });
        }
    });
    return recipe;
}

function openProductModal() {
    document.getElementById("modalBody").innerHTML = `
        <h2>Add Product</h2>
        <label>Product Name</label>
        <input id="productName" placeholder="Enter product name">

        <label>Category</label>
        <input id="productCategory" placeholder="e.g. Keychain" list="categoryList" oninput="updateProductSubcategoryOptions('productSubcategory', this.value)">
        <datalist id="categoryList">
            ${getProductCategories().map(c => `<option value="${c}">`).join("")}
        </datalist>

        <label>Type (optional)</label>
        <input id="productSubcategory" placeholder="e.g. Animals" list="subcategoryList-productSubcategory">
        <datalist id="subcategoryList-productSubcategory"></datalist>

        <label>Price</label>
        <input id="productPrice" type="number" min="0" step="0.01" placeholder="0.00">

        <label>Stock</label>
        <input id="productStock" type="number" min="0" placeholder="0">

        <button class="save-btn" onclick="addProduct()">Save Product</button>
        <p style="margin-top:12px;color:#777;font-size:13px;">You can add the recipe after saving, from Edit.</p>
    `;
    openModal();
}

function updateProductSubcategoryOptions(subcategoryFieldId, category) {
    const datalist = document.getElementById("subcategoryList-" + subcategoryFieldId);
    if (!datalist) return;
    const options = getSubcategoriesFor(category.trim());
    datalist.innerHTML = options.map(s => `<option value="${s}">`).join("");
}

function addProduct() {
    const name = document.getElementById("productName").value.trim();
    const category = document.getElementById("productCategory").value.trim() || "Uncategorized";
    const subcategory = document.getElementById("productSubcategory").value.trim() || null;
    const price = Number(document.getElementById("productPrice").value) || 0;
    const stock = Number(document.getElementById("productStock").value) || 0;

    if (!name) { alert("Please enter a product name."); return; }

    products.push({
        id: products.length ? Math.max(...products.map(p => p.id)) + 1 : 1,
        name,
        category,
        subcategory,
        price,
        stock,
        sold: 0,
        recipe: []
    });

    saveData();
    closeModal();
    navigate("products");
}

function openEditProductModal(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const rowsSource = product.recipe && product.recipe.length ? product.recipe : [null];
    const recipeRowsHtml = rowsSource.map(entry => recipeRowHtml(entry)).join("");

    let relatedHtml = "";
    if (materials.length && product.recipe && product.recipe.length) {
        const related = findRelatedByProduct(product.name);
        relatedHtml = `
        <div class="related-box">
            <strong>Products using the same materials</strong>
            ${related.relatedProducts.length ? related.relatedProducts.map(n => capitalizeWords(n)).join(", ") : "None yet."}
        </div>`;
    }

    document.getElementById("modalBody").innerHTML = `
        <h2>Edit Product</h2>
        <label>Product Name</label>
        <input id="editProductName" value="${product.name}">

        <label>Category</label>
        <input id="editProductCategory" value="${product.category}" list="categoryList" oninput="updateProductSubcategoryOptions('editProductSubcategory', this.value)">
        <datalist id="categoryList">
            ${getProductCategories().map(c => `<option value="${c}">`).join("")}
        </datalist>

        <label>Type (optional)</label>
        <input id="editProductSubcategory" value="${product.subcategory || ""}" list="subcategoryList-editProductSubcategory">
        <datalist id="subcategoryList-editProductSubcategory">
            ${getSubcategoriesFor(product.category).map(s => `<option value="${s}">`).join("")}
        </datalist>

        <label>Price</label>
        <input id="editProductPrice" type="number" min="0" step="0.01" value="${product.price}">

        <label>Stock</label>
        <input id="editProductStock" type="number" min="0" value="${product.stock}">

        <label>Sold</label>
        <input id="editProductSold" type="number" min="0" value="${product.sold || 0}">

        <label>Recipe</label>
        <div id="recipeRows">${recipeRowsHtml}</div>
        <button type="button" class="secondary-btn" onclick="addRecipeRow()">+ Add Material</button>

        ${relatedHtml}

        <button class="save-btn" onclick="updateProduct(${product.id})">Update Product</button>
        <button class="delete-btn" onclick="deleteProduct(${product.id})">Delete Product</button>
    `;
    openModal();
}

function updateProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const name = document.getElementById("editProductName").value.trim();
    if (!name) { alert("Please enter a product name."); return; }

    product.name = name;
    product.category = document.getElementById("editProductCategory").value.trim() || "Uncategorized";
    product.subcategory = document.getElementById("editProductSubcategory").value.trim() || null;
    product.price = Number(document.getElementById("editProductPrice").value) || 0;
    product.stock = Number(document.getElementById("editProductStock").value) || 0;
    product.sold = Number(document.getElementById("editProductSold").value) || 0;
    product.recipe = collectRecipe();

    saveData();
    closeModal();
    navigate("products");
}

function deleteProduct(id) {
    if (!confirm("Delete this product?")) return;

    const index = products.findIndex(p => p.id === id);
    if (index === -1) return;

    products.splice(index, 1);
    saveData();
    closeModal();
    navigate("products");
}

// MATERIALS — Add / Edit modal 
function yarnHelperHtml() {
    return `
    <div id="yarnHelper" class="yarn-helper" style="display:none;">
        <label style="margin-top:0;">Yarn skein calculator</label>
        <div class="yarn-row">
            <select id="skeinWeight" onchange="handleSkeinWeightChange()">
                <option value="25">25g</option>
                <option value="50">50g</option>
                <option value="100">100g</option>
                <option value="custom">Custom</option>
            </select>
            <input id="skeinCount" type="number" min="0" placeholder="Number of skeins" oninput="updateYarnTotal()">
        </div>
        <input id="customSkeinWeight" type="number" min="0" placeholder="Custom weight per skein (g)" style="display:none;margin-top:10px;" oninput="updateYarnTotal()">
        <p class="yarn-total">Total: <span id="yarnTotal">0</span> g</p>
        <button type="button" class="secondary-btn" onclick="applyYarnTotal()">Use this total</button>
    </div>`;
}

function toggleYarnHelper() {
    const unit = document.getElementById("materialUnit").value;
    const helper = document.getElementById("yarnHelper");
    if (helper) helper.style.display = unit === "g" ? "block" : "none";
}

function handleSkeinWeightChange() {
    const select = document.getElementById("skeinWeight");
    const customInput = document.getElementById("customSkeinWeight");
    customInput.style.display = select.value === "custom" ? "block" : "none";
    updateYarnTotal();
}

function updateYarnTotal() {
    const select = document.getElementById("skeinWeight");
    const weight = select.value === "custom"
        ? (Number(document.getElementById("customSkeinWeight").value) || 0)
        : Number(select.value);
    const count = Number(document.getElementById("skeinCount").value) || 0;

    document.getElementById("yarnTotal").textContent = weight * count;
}

function applyYarnTotal() {
    const total = document.getElementById("yarnTotal").textContent;
    document.getElementById("materialQuantity").value = total;
}

function openMaterialModal() {
    document.getElementById("modalBody").innerHTML = `
        <h2>Add Material</h2>
        <label>Material Name</label>
        <input id="materialName" placeholder="e.g. Pink Yarn">

        <label>Type</label>
        <input id="materialType" placeholder="e.g. Yarn" list="typeList">
        <datalist id="typeList">
            ${[...new Set(materials.map(m => m.type))].map(t => `<option value="${t}">`).join("")}
        </datalist>

        <label>Unit</label>
        <select id="materialUnit" onchange="toggleYarnHelper()">
            <option value="g">g</option>
            <option value="pcs">pcs</option>
        </select>

        ${yarnHelperHtml()}

        <label>Quantity</label>
        <input id="materialQuantity" type="number" min="0" placeholder="0">

        <label>Minimum Stock</label>
        <input id="materialMinStock" type="number" min="0" placeholder="0">

        <button class="save-btn" onclick="addMaterial()">Save Material</button>
    `;
    openModal();
    setTimeout(toggleYarnHelper, 50);
}

function addMaterial() {
    const name = document.getElementById("materialName").value.trim();
    const type = document.getElementById("materialType").value.trim() || "Other";
    const unit = document.getElementById("materialUnit").value;
    const quantity = Number(document.getElementById("materialQuantity").value) || 0;
    const minStock = Number(document.getElementById("materialMinStock").value) || 0;

    if (!name) { alert("Please enter a material name."); return; }

    materials.push({
        id: materials.length ? Math.max(...materials.map(m => m.id)) + 1 : 1,
        name,
        type,
        quantity,
        unit,
        minStock
    });

    saveData();
    closeModal();
    navigate("materials");
}

function openEditMaterialModal(id) {
    const material = materials.find(m => m.id === id);
    if (!material) return;

    document.getElementById("modalBody").innerHTML = `
        <h2>Edit Material</h2>
        <label>Material Name</label>
        <input id="materialName" value="${material.name}">

        <label>Type</label>
        <input id="materialType" value="${material.type}" list="typeList">
        <datalist id="typeList">
            ${[...new Set(materials.map(m => m.type))].map(t => `<option value="${t}">`).join("")}
        </datalist>

        <label>Unit</label>
        <select id="materialUnit" onchange="toggleYarnHelper()">
            <option value="g" ${material.unit === "g" ? "selected" : ""}>g</option>
            <option value="pcs" ${material.unit === "pcs" ? "selected" : ""}>pcs</option>
        </select>

        ${yarnHelperHtml()}

        <label>Quantity</label>
        <input id="materialQuantity" type="number" min="0" value="${material.quantity}">

        <label>Minimum Stock</label>
        <input id="materialMinStock" type="number" min="0" value="${material.minStock}">

        <button class="save-btn" onclick="updateMaterial(${material.id})">Update Material</button>
        <button class="delete-btn" onclick="deleteMaterial(${material.id})">Delete Material</button>
    `;
    openModal();
    setTimeout(toggleYarnHelper, 50);
}

function updateMaterial(id) {
    const material = materials.find(m => m.id === id);
    if (!material) return;

    const name = document.getElementById("materialName").value.trim();
    if (!name) { alert("Please enter a material name."); return; }

    material.name = name;
    material.type = document.getElementById("materialType").value.trim() || "Other";
    material.unit = document.getElementById("materialUnit").value;
    material.quantity = Number(document.getElementById("materialQuantity").value) || 0;
    material.minStock = Number(document.getElementById("materialMinStock").value) || 0;

    saveData();
    closeModal();
    navigate("materials");
}

function deleteMaterial(id) {
    if (!confirm("Delete this material?")) return;

    const index = materials.findIndex(m => m.id === id);
    if (index === -1) return;

    materials.splice(index, 1);
    saveData();
    closeModal();
    navigate("materials");
}
