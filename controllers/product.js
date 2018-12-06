'use strict'
const Product = require('../models/product');

const getProduct = (req, res) => {
    Product.find({}, (err, products) => {
        if (err) return res.status(500).send({ message: `error de peticion ${err}` })
        if (!products) return res.status(404).send({ message: `No hay productos` })

        res.status(200).send({ products: products })
    })

};

const getProductId = (req, res) => {
    let productId = req.params.productId;

    Product.findById(productId, (err, product) => {
        if (err) return res.status(500).send({ message: `error de peticion ${err}` })
        if (!product) return res.status(404).send({ message: `El producto no existe` })

        res.status(200).send({ product: product })
    })
};

const saveProduct = (req, res) => {
    console.log('Post /api/product')
    console.log(req.body)
        // res.status(200).send({ message: 'Producto recibido' })
    let product = new Product();
    product.name = req.body.name;
    product.picture = req.body.picture;
    product.price = req.body.price;
    product.category = req.body.category;
    product.description = req.body.description;

    product.save((err, productStored) => {
        if (err) res.status(500).send({ message: `Error al guardar: ${err}` })

        res.status(200).send({ productStored })
    });
}

const updateProduct = (req, res) => {
    let productId = req.params.productId;
    let update = req.body;
    Product.findByIdAndUpdate(productId, update, (err, productUpdate) => {
        if (err) return res.status(500).send({ message: `error de actualizacion ${err}` })
        res.status(200).send({ product: productUpdate })
            //example
            //https://api-rest-crudric.herokuapp.com/api/product/5bf1003430bb440016664323
    })

}
const deleteProduct = (req, res) => {
    let productId = req.params.productId;
    Product.findById(productId, (err, product) => {
        if (err) return res.status(500).send({ message: `error de peticion ${err}` })
            // if (!product) return res.status(404).send({ message: `El producto no existe` })

        product.remove(err => {
            if (err) return res.status(500).send({ message: `error al borra el producto ${err}` })
            res.status(200).send({ message: 'Producto Eliminado' })
        })
    })

    //example
    //https://api-rest-crudric.herokuapp.com/api/product/5bf1003430bb440016664323
}

module.exports = {
    getProduct,
    getProductId,
    saveProduct,
    updateProduct,
    deleteProduct
}