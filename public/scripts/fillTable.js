async function fillTable() {
    try {
        const response = await fetch('/data');
        const data = await response.json();
        console.log(data);

        var tableBody = document.querySelector("#table");

        //i = 4, omdat de eerste drie data items uit de database afwijken van de rest.
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
        console.error('Error fetching items:', error);
    }
}

document.addEventListener('DOMContentLoaded', fillTable);