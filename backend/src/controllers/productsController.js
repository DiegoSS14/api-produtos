

const productsModel = require('../models/productModel');

const getAll = async (request, response) => {
    try {
        const products = await productsModel.getAll();
        return response.status(200).json({ products });
    } catch (error) {
        console.log("Error: " + error);
        return response.status(500).json({ message: 'erro ao buscar produtos' });
    }
};

const getByIdOrName = async (req, res) => {
    try {
        const { query } = req.query;

        const isId = /^\d+$/.test(query);

        if (isId) {
            const product = await productsModel.getById(Number(query));

            if (!product) {
                return res.status(404).json({ message: 'Produto não encontrado pelo ID' });
            }

            return res.status(200).json({ product });
        } else {
            const products = await productsModel.getByName(query);

            if (!products || products.length === 0) {
                return res.status(404).json({ message: 'Nenhum produto encontrado com esse nome' });
            }

            return res.status(200).json({ products });
        }
    } catch (error) {
        console.error('Erro ao buscar produto por ID ou nome:', error);
        return res.status(500).json({ message: 'Erro interno no servidor' });
    }
};

const createProduct = async (request, response) => {

    if (response.headersSent) {
        return;
    }

    try {
        const createdProduct = await productsModel.createProduct(request.body);

        if (!response.headersSent) {
            return response.status(201).json(createdProduct);
        }

    } catch (error) {
        if (!response.headersSent) {
            return response.status(500).json({ message: 'erro ao criar produto' });
        }
    }
}

const deleteProduct = async (request, response) => {
    try {
        const { id } = request.params;
        const deletedCount = await productsModel.deleteProduct(id)

        if (deletedCount === 0) {
            return response.status(404).json({ message: 'Produto não encontrado para deletar' });
        }
        response.status(204).send(); // Resposta de sucesso

    } catch (error) {
        console.log("Error: " + error);
        response.status(500).json({ message: 'Erro interno ao deletar produto' })
    }
}

const updateProduct = async (request, response) => {

    try {
        const { id } = request.params;
        const productData = request.body;

        const updatedProduct = await productsModel.updateProduct(id, productData);

        if (!updatedProduct) {
            return response.status(404).json({ message: 'Produto não encontrado.' });
        }

        response.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Erro ao atualizar produto ' + error);
        response.status(500).json({ message: 'Erro ao atualizar produto' });
    }
};

module.exports = {
    getAll,
    getByIdOrName,
    createProduct,
    deleteProduct,
    updateProduct,
}