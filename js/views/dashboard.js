export function renderDashboard() {
    document.getElementById("app").innerHTML = `
        <h2>Dashboard</h2>

        <div class="cards">
            <div class="card">
                <h3>Highest Priority</h3>
                <h2>Bee Plush</h2>
            </div>

            <div class="card">
                <h3>Open Orders</h3>
                <h2>12</h2>
            </div>
        </div>
    `;
}