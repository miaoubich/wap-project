var carts = [];

fetch('products.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (products) {
        const tbody = document.getElementById('tbodyProductList');
        let row = '';
        for (let product of products) {
            row += `
        <tr>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td><img src='${product.image}' width='50' height='40' style='border-radius: 5px'></td>
            <td>${product.stock}</td>
            <td><input type='button' name='addToCart' value='+ cart' class='btn btn-success'></td>
        </tr>

        `;
        }
        tbody.innerHTML = row;

        carts = document.getElementsByName('addToCart');
        for (let i = 0; i < carts.length; i++) {
            carts[i].addEventListener('click', () => {
                cartNumbers(products[i]);
                totalCost(products[i]);
                location.reload();
            });
        }

        function cartNumbers(product) {
            let productNumbers = localStorage.getItem('cartNumber');
            productNumbers = parseInt(productNumbers);

            if (productNumbers) {
                localStorage.setItem('cartNumber', productNumbers + 1);
            } else {
                localStorage.setItem('cartNumber', 1);
            }

            setItems(product);
        }

        function setItems(product) {
            let cartItems = localStorage.getItem('productsInCart');
            cartItems = JSON.parse(cartItems);

            if (cartItems != null) {

                if (cartItems[product.name] == undefined) {
                    cartItems = {
                        ...cartItems,
                        [product.name]: product
                    }
                }

                cartItems[product.name].inCart += 1;
            } else {
                product.inCart = 1;
                cartItems = {
                    [product.name]: product
                }
            }

            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
        }

        function totalCost(product) {
            let cartCost = localStorage.getItem('totalCost');

            if (cartCost != null) {
                cartCost = parseInt(cartCost);
                localStorage.setItem('totalCost', cartCost + product.price);
            } else {
                localStorage.setItem('totalCost', product.price);
            }

        }

        function displayCart() {
            let cartItems = localStorage.getItem('productsInCart');
            cartItems = JSON.parse(cartItems);
            let productInCart = document.getElementsByClassName('products')[0];
            let cartCost = localStorage.getItem('totalCost');

            console.log('productInCart: ' + productInCart);

            if (cartItems && productInCart) {

                productInCart.innerHTML = '';

                Object.values(cartItems).map(item => {
                    let total = item.inCart * item.price;
                    
                    console.log(item.inCart);

                    productInCart.innerHTML += `
                        <div class='product' style='border-bottom: 1px solid lightgrey;'>${item.name}</div>
                        <div class='price' style='padding-left:150px;border-bottom: 2px solid lightgrey;'>$${item.price},00</div>
                        <div class='total' style='padding-left:90px;border-bottom: 2px solid lightgrey;'>$${total},00</div>
                        <div class="quantity" style='padding-left:170px;border-bottom: 2px solid lightgrey;'>
                            <ion-icon name="remove-circle-outline"></ion-icon>
                                <span>${item.inCart}</span>
                            <ion-icon name="add-circle-outline"></ion-icon>
                        </div>
                        `;
                });

                productInCart.innerHTML += `
                        <div class='bascketTotalContainer' style='display:flex;
                                                                 justify-content:flex-end;
                                                                 width:100%;
                                                                 margin-top: 20px;'>
                            <h4 class='basketTotalTitle' style='width:30%;'>
                                Sub-Total:
                            <h4>
                            <h4 class='basketTotal' style='width:10%;'>
                                $${cartCost},00
                            </h4>
                        </div>
                        `;
                //}
            }
        }

        displayCart();
    })




function addToCart(name, price, total, quantity) {
    const row = document.createElement('tr');
    let cell = document.createElement('td');
    cell.appendChild(document.createTextNode(name));
    row.appendChild(cell);

    cell = document.createElement('td');
    cell.appendChild(document.createTextNode(price));
    row.appendChild(cell);

    cell = document.createElement('td');
    cell.appendChild(document.createTextNode(total));
    row.appendChild(cell);

    cell = document.createElement('td');
    cell.innerHTML = `<div class="quantity">
                        <ion-icon name="remove-circle-outline"></ion-icon>
                        <span>${quantity}</span>
                        <ion-icon name="add-circle-outline"></ion-icon>
                        `
    row.appendChild(cell);


    cell = document.createElement('td');
    row.appendChild(cell);

    document.getElementById('tbodyProductCartList').appendChild(row);

    cell = document.createElement('td');
    cell.innerHTML = `<input type="button" name="addToCart" value="+ cart" onclick="addToCart('${name}', '${price}', '${image}', '${stock}');" class="btn btn-success">`;
    row.appendChild(cell);

}