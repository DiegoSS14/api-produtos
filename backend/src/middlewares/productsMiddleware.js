
const productSchema = require('../schemas/productSchema');

const validateBody = async (request, response, next) => {

    let errors;

    try {
        await productSchema.validate(request.body, { abortEarly: false })
        return next();
    } catch (error) {
        errors = error.inner.map(err => ({
            field: err.path,
            message: err.message,
        }));
    }

    return response.status(400).json({
        message: 'Validation errors',
        errors: errors
    });
};


// Validações manuais

// const validateBody = (request, response, next) => {
//     const { body } = request;

//     // Validate title
//     if (body.title === undefined) {
//         return response.status(400).json({ message: 'The field title is required' });
//     }
//     if (body.title === '') {
//         return response.status(400).json({ message: 'Title cannot be empty' });
//     }

//     // Validate description
//     if (body.description === undefined) {
//         return response.status(400).json({ message: 'The field description is required' });
//     }
//     if (body.description === '') {
//         return response.status(400).json({ message: 'Description cannot be empty' });
//     }

//     // Validate price
//     if (body.price === undefined) {
//         return response.status(400).json({ message: 'The field price is required' });
//     }

//     // Validate image_url
//     if (body.image_url === undefined) {
//         return response.status(400).json({ message: 'The field image_url is required' });
//     }

//     next();
// };

module.exports = {
    validateBody,
}