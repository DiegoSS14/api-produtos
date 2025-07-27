const { loginSchema } = require('../schemas/authSchema');

const validateLoginBody = async (request, response, next) => {

    try {
        await loginSchema.validate(request.body, { abortEarly: false })
        return next();
    } catch (error) {
        const errors = error.inner.map(err => ({
            field: err.path,
            message: err.message,
        }));

        return response.status(400).json({
            message: 'Validation errors',
            errors: errors,
        });
    }
};

module.exports = { validateLoginBody }