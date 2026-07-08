function renderApp(){

const app = document.getElementById("app");

app.innerHTML = `

<div class="layout">

<aside class="sidebar">

<h2>Crochet Admin</h2>

<button onclick="navigate('dashboard')">
Dashboard
</button>

<button onclick="navigate('orders')">
Orders
</button>

<button onclick="navigate('products')">
Products
</button>

<button onclick="navigate('inventory')">
Inventory
</button>

</aside>


<main id="content"></main>

</div>

`;

navigate("dashboard");

}



function navigate(page){

const content=document.getElementById("content");


switch(page){

case "dashboard":
content.innerHTML=dashboardView();
break;


case "orders":
content.innerHTML=ordersView();
break;


case "products":
content.innerHTML=productsView();
break;


case "inventory":
content.innerHTML=inventoryView();
break;

}

}