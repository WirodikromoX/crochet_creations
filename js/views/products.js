// PRODUCTS 

function productStockStatus(product) {
    if (product.stock === 0) {
        return { label: "Out of Stock", cls: "badge badge-out-of-stock" };
    }
    if (product.stock <= 5) {
        return { label: "Low Stock", cls: "badge badge-low-stock" };
    }
    return { label: "In Stock", cls: "badge badge-in-stock" };
}

function getProductCategories() {
    return [...new Set(products.map(p => p.category))];
}

function getSubcategoriesFor(category) {
    return [...new Set(
        products
            .filter(p => p.category === category && p.subcategory)
            .map(p => p.subcategory)
    )];
}

function getFilteredProducts() {
    const searchInput = document.getElementById("productSearch");
    const categoryInput = document.getElementById("productCategoryFilter");
    const subcategoryInput = document.getElementById("productSubcategoryFilter");

    const search = searchInput ? searchInput.value.trim().toLowerCase() : "";
    const category = categoryInput ? categoryInput.value : "All";
    const subcategory = subcategoryInput ? subcategoryInput.value : "All";

    let list = products;

    if (search) {
        list = list.filter(product =>
            product.name.toLowerCase().includes(search)
        );
    }

    if (category !== "All") {
        list = list.filter(product => product.category === category);
    }

    if (subcategory !== "All") {
        list = list.filter(product => product.subcategory === subcategory);
    }

    return list;
}

function renderProductRows(list) {
    if (!list.length) {
        return `<tr class="empty-row"><td colspan="8">No products found.</td></tr>`;
    }

    return list.map(product => {
        const status = productStockStatus(product);
        const categoryLabel = product.subcategory
            ? `${product.category} - ${product.subcategory}`
            : product.category;
        return `
        <tr class="clickable-row" onclick="openEditProductModal(${product.id})">
            <td>#${product.id}</td>
            <td>${product.name}</td>
            <td>${categoryLabel}</td>
            <td>${formatMoney(product.price)}</td>
            <td>${product.stock}</td>
            <td>${product.sold}</td>
            <td><span class="${status.cls}">${status.label}</span></td>
            <td onclick="event.stopPropagation()">
                <div class="row-actions">
                    <button class="icon-btn edit" onclick="openEditProductModal(${product.id})">Edit</button>
                </div>
            </td>
        </tr>`;
    }).join("");
}

function productsView() {
    const categories = getProductCategories();

    return `
<div class="page-header">
    <h1>Products</h1>
    <button class="action-btn" onclick="openProductModal()">+ Add Product</button>
</div>

<div class="table-toolbar">
    <input
        id="productSearch"
        class="search"
        placeholder="Search products..."
        onkeyup="filterProducts()">

    <select id="productCategoryFilter" class="filter-select" onchange="handleCategoryFilterChange()">
        <option value="All">Category (All)</option>
        ${categories.map(c => `<option value="${c}">${c}</option>`).join("")}
    </select>

    <select id="productSubcategoryFilter" class="filter-select" onchange="filterProducts()" style="display:none;">
        <option value="All">Type (All)</option>
    </select>
</div>

<div class="table-wrap">
    <table>
        <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Sold</th>
            <th>Status</th>
            <th>Edit</th>
        </tr>
        <tbody id="productsTableBody">
            ${renderProductRows(products)}
        </tbody>
    </table>
</div>
`;
}

function handleCategoryFilterChange() {
    const category = document.getElementById("productCategoryFilter").value;
    const subcategorySelect = document.getElementById("productSubcategoryFilter");
    const subcategories = category !== "All" ? getSubcategoriesFor(category) : [];

    if (subcategories.length) {
        subcategorySelect.innerHTML = `
            <option value="All">Type (All)</option>
            ${subcategories.map(s => `<option value="${s}">${s}</option>`).join("")}
        `;
        subcategorySelect.style.display = "inline-block";
    } else {
        subcategorySelect.innerHTML = `<option value="All">Type (All)</option>`;
        subcategorySelect.style.display = "none";
    }

    filterProducts();
}

function filterProducts() {
    const tbody = document.getElementById("productsTableBody");
    if (tbody) {
        tbody.innerHTML = renderProductRows(getFilteredProducts());
    }
}
