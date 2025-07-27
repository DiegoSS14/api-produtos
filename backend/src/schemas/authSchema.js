const yup = require('yup');

const loginSchema = yup.object({
    username: yup
        .string()
        .required('Username é obrigatório')
        .min(3, 'Username deve ter pelo menos 3 caracteres'),

    password: yup
        .string()
        .required('Password é obrigatório')
        .min(4, 'Password deve ter pelo menos 4 caracteres')
});

module.exports = { loginSchema };