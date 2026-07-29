// DASHBOARD  

function formatMoney(amount) {
    return "SRD " + amount.toFixed(2).replace(/\.00$/, "");
}

function calcOrderTotal(order) {
    return order.items.reduce((sum, item) => {
        const product = products.find(p => p.name === item.product);
        return sum + (product ? product.price * item.quantity : 0);
    }, 0);
}

function priorityBadgeClass(label) {
    switch (label) {
        case "Overdue": return "badge badge-overdue";
        case "High": return "badge badge-high";
        case "Medium": return "badge badge-medium";
        default: return "badge badge-low";
    }
}

function statusBadgeClass(status) {
    switch (status) {
        case "New": return "badge badge-new";
        case "Open": return "badge badge-open";
        case "Completed": return "badge badge-completed";
        default: return "badge";
    }
}

function dashboardView() {
    // HIGH PRIORITY ORDER — sorted with mergeSort, most urgent first
    const activeOrders = orders.filter(order => order.status !== "Completed");
    const sortedActive = sortOrdersByPriority(activeOrders);
    const topOrder = sortedActive[0];
    const topPriority = topOrder ? getOrderPriority(topOrder) : null;

    // NEW ORDERS
    const newOrders = orders.filter(order => order.status === "New");

    // TOTAL SALES
    const totalSales = orders.reduce((sum, order) => sum + calcOrderTotal(order), 0);

    // TOP 3 BEST SELLING PRODUCTS
    const topProducts = [...products]
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 3);

    // LOW MATERIALS
    const lowMaterials = materials.filter(m => m.quantity <= m.minStock);

    return `
<h1>Dashboard</h1>

<div class="cards">
    <div class="card clickable-card" onclick="navigate('orders')">
        <h3>High Priority Order</h3>
        ${topOrder ? `
            <p class="big-value">Order #${topOrder.id}</p>
            <p class="sub-value">${topOrder.customer}</p>
            <span class="${priorityBadgeClass(topPriority.label)}">${topPriority.label}</span>
        ` : `<p class="sub-value">No active orders</p>`}
    </div>

    <div class="card clickable-card" onclick="navigate('orders')">
        <h3>New Orders</h3>
        <p class="big-value">${newOrders.length}</p>
    </div>

    <div class="card clickable-card" onclick="navigate('reports')">
        <h3>Total Sales</h3>
        <p class="big-value">${formatMoney(totalSales)}</p>
    </div>
</div>

<h2 class="section-title">Top 3 Best Selling Products</h2>
<div class="top-products-grid">
    ${topProducts.length ? topProducts.map((product, index) => `
        <div class="top-product-card" onclick="navigate('products')">
            <span class="rank-badge">#${index + 1}</span>
            <h4>${product.name}</h4>
            <p>Sold: ${product.sold}</p>
            <p>Stock: ${product.stock}</p>
        </div>
    `).join("") : `<p>No sales yet.</p>`}
</div>

<h2 class="section-title">Low Materials</h2>
<div class="table-wrap clickable-row" onclick="navigate('materials')">
    <table>
        <tr>
            <th>Material</th>
            <th>Available</th>
            <th>Status</th>
        </tr>
        ${lowMaterials.length ? lowMaterials.map(m => `
            <tr>
                <td>${m.name}</td>
                <td>${m.quantity} ${m.unit}</td>
                <td><span class="badge badge-low-stock">Low</span></td>
            </tr>
        `).join("") : `<tr class="empty-row"><td colspan="3">All materials are well stocked.</td></tr>`}
    </table>
</div>
`;
}
