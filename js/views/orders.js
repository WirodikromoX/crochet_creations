// ORDERS 

function formatItems(items) {
    return items
        .map(item => `${item.product} ×${item.quantity}`)
        .join("<br>");
}

function getFilteredOrders() {
    const searchInput = document.getElementById("orderSearch");
    const statusInput = document.getElementById("orderStatusFilter");

    const search = searchInput ? searchInput.value.trim().toLowerCase() : "";
    const statusFilter = statusInput ? statusInput.value : "All";

    let list = orders;

    if (search) {
        // If the search looks like a pure number, jump straight to that
        // order ID with binary search instead of scanning every order.
        if (/^\d+$/.test(search)) {
            const match = findOrderById(Number(search));
            list = match ? [match] : [];
        } else {
            list = list.filter(order =>
                order.customer.toLowerCase().includes(search)
            );
        }
    }

    if (statusFilter !== "All") {
        list = list.filter(order => order.status === statusFilter);
    }

    return sortOrdersByPriority(list);
}

function renderOrderRows(list) {
    if (!list.length) {
        return `<tr class="empty-row"><td colspan="7">No orders found.</td></tr>`;
    }

    return list.map(order => {
        const priority = getOrderPriority(order);
        const total = calcOrderTotal(order);
        return `
        <tr class="clickable-row" onclick="openEditOrderModal(${order.id})">
            <td>#${order.id}</td>
            <td>${order.customer}<br><small>${formatItems(order.items)}</small></td>
            <td><span class="${statusBadgeClass(order.status)}">${order.status}</span></td>
            <td><span class="${priorityBadgeClass(priority.label)}">${priority.label}</span></td>
            <td>${order.deadline}</td>
            <td>${formatMoney(total)}</td>
            <td onclick="event.stopPropagation()">
                <div class="row-actions">
                    <button class="icon-btn edit" onclick="openEditOrderModal(${order.id})">Edit</button>
                    ${order.status !== "Completed" ? `<button class="icon-btn complete" onclick="completeOrder(${order.id})">Complete</button>` : ""}
                    <button class="icon-btn delete" onclick="deleteOrder(${order.id})">Delete</button>
                </div>
            </td>
        </tr>`;
    }).join("");
}

function ordersView() {
    const list = orders.length ? sortOrdersByPriority(orders) : [];

    return `
<div class="page-header">
    <h1>Orders</h1>
    <button class="action-btn" onclick="openOrderModal()">+ Add Order</button>
</div>

<div class="table-toolbar">
    <input
        id="orderSearch"
        class="search"
        placeholder="Search by customer or order ID..."
        onkeyup="filterOrders()">

    <select id="orderStatusFilter" class="filter-select" onchange="filterOrders()">
        <option value="All">Status (All)</option>
        <option value="New">New</option>
        <option value="Open">Open</option>
        <option value="Completed">Completed</option>
    </select>
</div>

<div class="table-wrap">
    <table>
        <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Deadline</th>
            <th>Total</th>
            <th>Actions</th>
        </tr>
        <tbody id="ordersTableBody">
            ${renderOrderRows(list)}
        </tbody>
    </table>
</div>
`;
}

function filterOrders() {
    const tbody = document.getElementById("ordersTableBody");
    if (tbody) {
        tbody.innerHTML = renderOrderRows(getFilteredOrders());
    }
}
