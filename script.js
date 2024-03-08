const containerEle = document.querySelector('.container');
const opcionsSelect = document.querySelector(".options");
const filterOptionsSelect = document.querySelector(".filteroptions");

let originalDataArray = [];
let dataArray = [];

fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
        originalDataArray = data;
        dataArray = [...originalDataArray]; // Copy the original data array
        updateTableContent(dataArray);
    })
    .catch(error => console.log(error));

function updateTableContent(dataArray) {
    let tableContent = '';

    dataArray.forEach((data) => {
        tableContent += `
            <tr>
                <td>${data.id}</td>
                <td>${data.title}</td>
                <td>${data.price}</td>
                <td>${data.description}</td>
                <td>${data.category}</td>
                <td>
                    <img class="img" src="${data.image}" alt="Product Image">
                </td>
                <td>${data.rating.rate}</td>
                <td>${data.rating.count}</td>
            </tr>`;
    });

    containerEle.innerHTML = `
    <table class="card">
    <colgroup>
        <col span="6">
        <col span="1">
        <col span="1"> 
    </colgroup>
    <tr class="left-infor">
        <th rowspan="2">ID</th>
        <th rowspan="2">Title</th>
        <th rowspan="2">Price</th>
        <th rowspan="2">Description</th>
        <th rowspan="2">Category</th>
        <th rowspan="2">Image</th>
        <th colspan="2">Rating</th>
    </tr>
    <tr>
        <th>Rate</th>
        <th>Count</th>
    </tr>
    ${tableContent}
</table>`;
}

opcionsSelect.addEventListener('change', () => {
    const selectedOption = opcionsSelect.value;

    if (selectedOption === "nonvalue") {
        dataArray = [...originalDataArray]; // Restore the original data array
    } else if (selectedOption === "Ascending") {
        dataArray.sort((a, b) => a.price - b.price);
    } else if (selectedOption === "Descending") {
        dataArray.sort((a, b) => b.price - a.price);
    }
    updateTableContent(dataArray);
});

filterOptionsSelect.addEventListener('change', () => {
    const selectedCategory = filterOptionsSelect.value;

    if (selectedCategory === "nonfilter") {
        dataArray = [...originalDataArray]; // Restaurar el array de datos original
    } else {
        dataArray = originalDataArray.filter(item => item.category === selectedCategory);
    }
    updateTableContent(dataArray);
});