let currentPage = "dashboard";

function renderApp() {
    const app = document.getElementById("app");
    app.innerHTML = `
<div class="layout">
    <aside class="sidebar">
        <div class="logo-container">
            <img src="./assets/images/Logo_CCC.png" class="logo" alt="Logo">
        </div>

        <nav class="sidebar-nav">
            <button data-page="dashboard" onclick="navigate('dashboard')">Dashboard</button>
            <button data-page="orders" onclick="navigate('orders')">Orders</button>
            <button data-page="products" onclick="navigate('products')">Products</button>
            <button data-page="materials" onclick="navigate('materials')">Materials</button>
            <button data-page="reports" onclick="navigate('reports')">Reports</button>
        </nav>
    </aside>

    <main id="content"></main>
</div>

<div id="modal" class="modal">
    <div class="modal-content">
        <span class="close" onclick="closeModal()">&times;</span>
        <div id="modalBody"></div>
    </div>
</div>
`;

    navigate("dashboard");
}

function navigate(page) {
    currentPage = page;
    const content = document.getElementById("content");

    switch (page) {
        case "dashboard":
            content.innerHTML = dashboardView();
            break;
        case "orders":
            content.innerHTML = ordersView();
            break;
        case "products":
            content.innerHTML = productsView();
            break;
        case "materials":
            content.innerHTML = materialsView();
            break;
        case "reports":
            content.innerHTML = reportsView();
            break;
    }

    document.querySelectorAll(".sidebar-nav button").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.page === page);
    });
}
