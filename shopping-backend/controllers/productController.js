const Product = require('../models/product');

exports.save = (req, res, next) => { 
    const product = req.body;
    const addProduct = new Product(null, product.name, product.price, product.image, product.stock).save();
    res.status(201).json(addProduct);
}

exports.getAll = (req, res, next) => {
    res.status(200).json(Product.getAll());
}

exports.deleteById = (req, res, next) => {
    res.json(Product.deleteById(req.params.productId));
}

exports.edit = (req, res, nect) => {
    const product = req.body;
    const editedProduct = new Product(req.params.productId, product.name, product.price, product.image, product.stock).edit();
    res.json(editedProduct);
}

