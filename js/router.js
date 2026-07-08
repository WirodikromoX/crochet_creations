import { renderDashboard } from "./views/dashboard.js";
import { renderOrders } from "./views/orders.js";
import { renderCustomers } from "./views/customers.js";

const routes = {
  dashboard: renderDashboard,
  orders: renderOrders,
  customers: renderCustomers
};

export function router() {
  const hash = window.location.hash.replace("#", "") || "dashboard";

  const view = routes[hash];

  if (!view) {
    document.getElementById("app").innerHTML = "<h2>Not Found</h2>";
    return;
  }

  view();
}