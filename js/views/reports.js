// REPORTS 

function getReportStats() {
    const completedOrders = orders.filter(o => o.status === "Completed");
    const openOrders = orders.filter(o => o.status === "Open");

    // Total Sales = revenue actually realized (Completed orders only)
    const totalSales = completedOrders.reduce((sum, order) => sum + calcOrderTotal(order), 0);

    // Revenue = value of every order in the pipeline, completed or not
    const revenue = orders.reduce((sum, order) => sum + calcOrderTotal(order), 0);

    // Products Sold = total units sold across all products
    const productsSold = products.reduce((sum, p) => sum + (p.sold || 0), 0);

    // Best Selling Products
    const bestSellers = [...products]
        .sort((a, b) => (b.sold || 0) - (a.sold || 0))
        .slice(0, 5);

    // Most Used Materials 
    const usage = {};
    products.forEach(product => {
        (product.recipe || []).forEach(entry => {
            const used = entry.amount * (product.sold || 0);
            if (!usage[entry.material]) {
                usage[entry.material] = { amount: 0, unit: entry.unit };
            }
            usage[entry.material].amount += used;
        });
    });

    const mostUsedMaterials = Object.entries(usage)
        .map(([name, data]) => ({ name, amount: data.amount, unit: data.unit }))
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 5);

    return {
        totalSales,
        revenue,
        productsSold,
        completedCount: completedOrders.length,
        openCount: openOrders.length,
        bestSellers,
        mostUsedMaterials
    };
}

function reportsView() {
    const stats = getReportStats();

    return `
<h1>Reports</h1>

<div class="cards">
    <div class="card">
        <h3>Total Sales</h3>
        <p class="big-value">${formatMoney(stats.totalSales)}</p>
        <p class="sub-value">From completed orders</p>
    </div>

    <div class="card">
        <h3>Revenue</h3>
        <p class="big-value">${formatMoney(stats.revenue)}</p>
        <p class="sub-value">All orders, completed or not</p>
    </div>

    <div class="card">
        <h3>Products Sold</h3>
        <p class="big-value">${stats.productsSold}</p>
    </div>
</div>

<div class="cards">
    <div class="card clickable-card" onclick="navigate('orders')">
        <h3>Orders Completed</h3>
        <p class="big-value">${stats.completedCount}</p>
    </div>

    <div class="card clickable-card" onclick="navigate('orders')">
        <h3>Orders Open</h3>
        <p class="big-value">${stats.openCount}</p>
    </div>
</div>

<h2 class="section-title">Best Selling Products</h2>
<div class="table-wrap">
    <table>
        <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Stock</th>
        </tr>
        ${stats.bestSellers.length ? stats.bestSellers.map(p => `
            <tr class="clickable-row" onclick="navigate('products')">
                <td>${p.name}</td>
                <td>${p.subcategory ? p.category + " - " + p.subcategory : p.category}</td>
                <td>${p.sold || 0}</td>
                <td>${p.stock}</td>
            </tr>
        `).join("") : `<tr class="empty-row"><td colspan="4">No sales yet.</td></tr>`}
    </table>
</div>

<h2 class="section-title">Most Used Materials</h2>
<div class="table-wrap">
    <table>
        <tr>
            <th>Material</th>
            <th>Used</th>
        </tr>
        ${stats.mostUsedMaterials.length ? stats.mostUsedMaterials.map(m => `
            <tr class="clickable-row" onclick="navigate('materials')">
                <td>${m.name}</td>
                <td>${m.amount} ${m.unit}</td>
            </tr>
        `).join("") : `<tr class="empty-row"><td colspan="2">No materials used yet.</td></tr>`}
    </table>
</div>
`;
}
