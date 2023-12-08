async function fetchItems() {
    try {
        const response = await fetch("/api/getItems");
        const data = await response.json();
        let tableBody = document.querySelector("#table");

        // Function to populate table with JSON data
        for (let i = 0; i < data.length; i++) {
            let row = tableBody.insertRow(i + 1);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);

            cell1.textContent = data[i].id;
            cell2.textContent = data[i].name;
            cell3.textContent = data[i].description;
        }
    } catch (error) {
        console.error("Error fetching items:", error);
    }
}

document.addEventListener('DOMContentLoaded', fetchItems);