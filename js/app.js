function showPage(page) {

    const content = document.getElementById("content");

    if(page === "orders") {
        content.innerHTML = `
            <h2>Order Prioritization</h2>
            <p>Max Heap Demo</p>
        `;
    }

    if(page === "analysis") {
        content.innerHTML = `
            <h2>Material Analysis</h2>
            <p>BFS Demo</p>
        `;
    }
}

showPage("orders");