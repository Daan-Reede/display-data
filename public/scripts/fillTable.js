async function fetchItems() {
    try {
        const response = await fetch("/api/getItems");
        const data = await response.json();
        var tableBody = document.querySelector("#table");
        // Function to populate table with JSON data
        for (var i = 4; i < data.length; i++) {
            var row = tableBody.insertRow(i - 3);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);

            cell1.textContent = data[i].id;
            cell2.textContent = data[i].location;
            cell3.textContent = data[i].coordinates;
        }
    } catch (error) {
        console.error("Error fetching items:", error);
    }
}

document.addEventListener('DOMContentLoaded', fetchItems);