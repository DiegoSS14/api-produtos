
// Com Sequelize

const { where } = require('sequelize');
const { Product } = require('../../models'); // Importa os módulos do Sequelize
const { Op } = require('sequelize');

const getAll = async () => {
    const products = await Product.findAll();
    return products;
};

const getById = async (id) => {
    const product = await Product.findByPk(id);
    return product;
};

const getByName = async (name) => {
    const products = await Product.findAll({
        where: {
            title: {
                [Op.like]: `%${name}%`,
            },
        },
    });

    return products;
};

const createProduct = async (product) => {
    const { title, description, price, image_url } = product;
    const newProduct = await Product.create({ title, description, price, image_url });
    return newProduct;
}

const deleteProduct = async (id) => {
    const deletedCount = await Product.destroy({ where: { id } });
    return deletedCount;
};

const updateProduct = async (id, productData) => {
    const product = await Product.findByPk(id);
    if (!product) return null;

    const updatedProduct = await product.update(productData);
    return updatedProduct;
};



// Sem Sequelize

// const connection = require('./connection');

// const getAll = async () => {
//     const [products] = await connection.execute('select * from products');
//     return products; // Retorna apenas a primeira posição do array, porque o comando retorna um array com mais dois arrays.
// }

// const createProduct = async (product) => {

//     const { title, description, price, image_url } = product;

//     const query = 'insert into products (title, description, price, image_url) values (?, ?, ?, ?)';
//     const [createdProduct] = await connection.execute(query, [title, description, price, image_url]);

//     return {
//         id: createdProduct.insertId,
//         title
//     };
// }

// const deleteProduct = async (id) => {
//     const query = 'delete from products where id = ?';
//     const removedProduct = await connection.execute(query, [id]);
// };

// const updateProduct = async (id, product) => {
//     const query = 'update products set title = ?, description = ?, price = ?, image_url = ? where id = ?';
//     const { title, description, price, image_url } = product;
//     const updatedProduct = await connection.execute(query, [title, description, price, image_url, id]);

//     return {
//         id: updatedProduct.insertId,
//         title
//     };
// };

module.exports = {
    getAll,
    getByName,
    getById,
    createProduct,
    deleteProduct,
    updateProduct,
}