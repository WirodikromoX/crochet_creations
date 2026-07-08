function inventoryView(){

return `

<h1>Inventory</h1>


<input 
id="inventorySearch"
class="search"
placeholder="Search inventory..."
onkeyup="searchInventory()"
>


<h2>Low Inventory</h2>


<table id="lowInventoryTable">

<tr>
<th>Material</th>
<th>Quantity</th>
</tr>


<tr>
<td>Pink Yarn</td>
<td>2</td>
</tr>


<tr>
<td>Black Yarn</td>
<td>4</td>
</tr>


<tr>
<td>Safety Eyes</td>
<td>5</td>
</tr>


</table>




<h2>All Inventory</h2>


<table id="allInventoryTable">

<tr>
<th>Material</th>
<th>Quantity</th>
<th>Status</th>
</tr>


<tr>
<td>Pink Yarn</td>
<td>2</td>
<td>Low</td>
</tr>


<tr>
<td>Black Yarn</td>
<td>4</td>
<td>Low</td>
</tr>


<tr>
<td>Safety Eyes</td>
<td>5</td>
<td>Low</td>
</tr>


<tr>
<td>White Yarn</td>
<td>20</td>
<td>Available</td>
</tr>


<tr>
<td>Blue Yarn</td>
<td>15</td>
<td>Available</td>
</tr>


<tr>
<td>Crochet Hooks</td>
<td>10</td>
<td>Available</td>
</tr>


</table>


`;

}





function searchInventory(){

let input = document.getElementById("inventorySearch");

let filter = input.value.toLowerCase();


let tables = [
    document.getElementById("lowInventoryTable"),
    document.getElementById("allInventoryTable")
];



tables.forEach(table => {

let rows = table.getElementsByTagName("tr");


for(let i = 1; i < rows.length; i++){

    let text = rows[i].innerText.toLowerCase();


    if(text.includes(filter)){

        rows[i].style.display="";

    }else{

        rows[i].style.display="none";

    }

}

});


}