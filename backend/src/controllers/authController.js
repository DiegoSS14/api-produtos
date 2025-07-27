const jwt = require('jsonwebtoken');
require('dotenv').config();

const authController = {
    login: (request, response) => {

        console.log('Headers:', request.headers);
        console.log('Body:', request.body);
        console.log('Method:', request.method);


        const { username, password } = request.body;

        if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(
                { user: 'admin' },
                process.env.JWT_SECRET,
                { expiresIn: '1h' },
            );

            console.log('Token gerado:', token);
            console.log('Usando secret:', process.env.JWT_SECRET);

            return response.json({
                message: 'Login realizado com sucesso',
                token: token
            });
        }

        response.status(401).json({ error: 'Usuário ou senha incorretos' });
    }
};

module.exports = authController;