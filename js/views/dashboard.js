function dashboardView(){

return `

<h1>Cuddly's Creations Dashboard</h1>
<p>Welcome back</p>


<div class="cards">

<div class="card">
<h3>High Priority Order</h3>
<p>#102 Amigurumi Bunny</p>
<p>Deadline: Tomorrow</p>
</div>


<div class="card">
<h3>Profit Product</h3>
<p>Large Crochet Bear</p>
<p>$250 profit</p>
</div>


<div class="card">
<h3>Total Sales</h3>
<p>$4,500</p>
</div>


</div>



<div class="tables">


<div class="table-box">

<h2>Orders</h2>


<table>

<tr>
<th>New Orders</th>
<th>Open Orders</th>
</tr>


<tr onclick="navigate('orders')">

<td>
3 New Orders
</td>


<td>
8 Open Orders
</td>

</tr>


</table>


</div>





<div class="table-box"
onclick="navigate('inventory')">


<h2>Low Inventory</h2>


<table>

<tr>
<th>Product</th>
<th>Stock</th>
</tr>


<tr>
<td>Pink Yarn</td>
<td>2</td>
</tr>


<tr>
<td>Safety Eyes</td>
<td>5</td>
</tr>


</table>


</div>



</div>


`;

}