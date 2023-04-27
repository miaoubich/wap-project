
window.onload = getProducts;


async function getProducts() {
    const response = await fetch("http://localhost:3000/products");
    const jsonData = await response.json();

    for (let e of jsonData) {
        addNewProductRowToTable(e.name, e.price, e.image, e.stock);
    }

}

function addNewProductRowToTable(name, price, image, stock) {

    const row = document.createElement('tr');
    let cell = document.createElement('td');
    cell.appendChild(document.createTextNode(name));
    row.appendChild(cell);

    cell = document.createElement('td');
    cell.appendChild(document.createTextNode(price));
    row.appendChild(cell);

    cell = document.createElement('td');
    let img = document.createElement("img");

    img.src = image;
    cell.appendChild(img);
    row.appendChild(cell);

    cell = document.createElement('td');
    cell.appendChild(document.createTextNode(stock));
    row.appendChild(cell);

    cell = document.createElement('td');
    // cell.innerHTML = '<input type="button" name="addToCart" value="+ cart" onclick="addToCart(' + name + "," + price + "," + image + "," + stock + ');" class="btn btn-success">';
    cell.innerHTML = `<input type="button" name="addToCart" value="+ cart" onclick="addToCart('${name}', '${price}', '${image}', '${stock}');" class="btn btn-success">`;
    row.appendChild(cell);

    document.getElementById('tbodyProductList').appendChild(row);
}

function addToCart(name, price, image, stock) {
    console.log("inside addToCart")
    const row = document.createElement('tr');
    let cell = document.createElement('td');
    cell.appendChild(document.createTextNode(name));
    row.appendChild(cell);

    cell = document.createElement('td');
    cell.appendChild(document.createTextNode(price));
    row.appendChild(cell);

    cell = document.createElement('td');
    let img = document.createElement("img");

    img.src = image;
    cell.appendChild(img);
    row.appendChild(cell);

    cell = document.createElement('td');
    cell.appendChild(document.createTextNode(stock));
    row.appendChild(cell);

    cell = document.createElement('td');
    row.appendChild(cell);

    document.getElementById('tbodyProductCartList').appendChild(row);

}

async function deleteProduct(id, node) {
    let setting = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    };
    const deletedProduct = await fetch("http://localhost:3000/products/" + id, setting)
    const jsonData = await deletedProduct.json();
    if (jsonData.id == id) {
        node.parentElement.parentElement.remove();
    }
}

async function postProduct(name, price, image, stock) {
    let b = { "name": name, "price": price, "image": image, "stock": stock }
    let setting = {
        method: 'POST',
        body: JSON.stringify(b),
        headers: { 'Content-Type': 'application/json' }
    };
    const response = await fetch("http://localhost:3000/products", setting);
    const jsonData = await response.json();
    return jsonData;
}


document.getElementById('btnRegister').addEventListener('click', (event) => {
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const image = document.getElementById('image').files[0];

    // const reader = new FileReader();
    // reader.addEventListener("load", () => {
    //     localStorage.setItem("recent-image", reader.result);
    // });
    // reader.readAsDataURL(image);

    const stock = document.getElementById('stock').value;

    // const img = localStorage.getItem("recent-image");
    // console.log("Image: " + img);

    data = postProduct(name, price, image, stock);

    document.getElementById('name').innerHTML = data;
    document.getElementById('myform').reset();

    console.log(data);
});
