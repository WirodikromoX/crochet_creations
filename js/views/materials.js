// MATERIALS 

function materialStatus(material) {
    return material.quantity <= material.minStock
        ? { label: "Low", cls: "badge badge-low-stock" }
        : { label: "Available", cls: "badge badge-in-stock" };
}

function getMaterialTypes() {
    return [...new Set(materials.map(m => m.type))];
}

function getFilteredMaterials() {
    const searchInput = document.getElementById("materialSearch");
    const typeInput = document.getElementById("materialTypeFilter");

    const search = searchInput ? searchInput.value.trim().toLowerCase() : "";
    const type = typeInput ? typeInput.value : "All";

    let list = materials;

    if (search) {
        list = list.filter(m => m.name.toLowerCase().includes(search));
    }

    if (type !== "All") {
        list = list.filter(m => m.type === type);
    }

    return list;
}

function renderMaterialRows(list) {
    if (!list.length) {
        return `<tr class="empty-row"><td colspan="5">No materials found.</td></tr>`;
    }

    return list.map(material => {
        const status = materialStatus(material);
        return `
        <tr class="clickable-row" onclick="openEditMaterialModal(${material.id})">
            <td>${material.name}</td>
            <td>${material.type}</td>
            <td>${material.quantity}</td>
            <td>${material.unit}</td>
            <td><span class="${status.cls}">${status.label}</span></td>
        </tr>`;
    }).join("");
}

function materialsView() {
    return `
<div class="page-header">
    <h1>Materials</h1>
    <button class="action-btn" onclick="openMaterialModal()">+ Add Material</button>
</div>

<div class="table-toolbar">
    <input
        id="materialSearch"
        class="search"
        placeholder="Search materials..."
        onkeyup="filterMaterials()">

    <select id="materialTypeFilter" class="filter-select" onchange="filterMaterials()">
        <option value="All">Type (All)</option>
        ${getMaterialTypes().map(t => `<option value="${t}">${t}</option>`).join("")}
    </select>
</div>

<div class="table-wrap">
    <table>
        <tr>
            <th>Material</th>
            <th>Type</th>
            <th>Available</th>
            <th>Unit</th>
            <th>Status</th>
        </tr>
        <tbody id="materialsTableBody">
            ${renderMaterialRows(materials)}
        </tbody>
    </table>
</div>
`;
}

function filterMaterials() {
    const tbody = document.getElementById("materialsTableBody");
    if (tbody) {
        tbody.innerHTML = renderMaterialRows(getFilteredMaterials());
    }
}
