const productsArray = [
    {
        id: 'price_1MdiTYCWE6Cdn9zyVIdZcjjp',
        title: "Coffee",
        price: 4.99
    },
    {
        id: 'price_1MdiU5CWE6Cdn9zywuHRw9XW',
        title: "Keyboard",
        price: 9.99
    },
    {
        id: 'price_1MdiUWCWE6Cdn9zyPVpj9jPY',
        title: "Tea",
        price: 14.99
    }
];

function getProductData(id){
    let productData = productsArray.find(product => product.id === id);

    if(productData === undefined){
        console.log("Product Data does not exit " + id);
    }

    return productData;
}

export { productsArray, getProductData };