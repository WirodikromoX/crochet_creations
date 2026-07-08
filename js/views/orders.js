import { orders } from "../data/sample-data.js";

export function renderOrders() {
    document.getElementById("app").innerHTML = `
        <h2>Orders</h2>

        <table>
            <tr>
                <th>Order</th>
                <th>Profit</th>
            </tr>

            ${orders.map(order => `
                <tr>
                    <td>${order.name}</td>
                    <td>$${order.profit}</td>
                </tr>
            `).join("")}
        </table>
    `;
}