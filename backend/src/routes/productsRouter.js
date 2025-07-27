const express = require('express');
const router = express.Router();

// Controllers
const productsController = require('../controllers/productsController');
const authController = require('../controllers/authController');

// Middlewares
const productsMiddleware = require('../middlewares/productsMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const { validateLoginBody } = require('../middlewares/authValidationMiddleware');

router.post('/auth/login', validateLoginBody, authController.login);

router.get('/products', authMiddleware, productsController.getAll);
router.get('/products/search', authMiddleware, productsController.getByIdOrName);
router.post('/products', authMiddleware, productsMiddleware.validateBody, productsController.createProduct);
router.delete('/products/:id', authMiddleware, productsController.deleteProduct);
router.put('/products/:id', authMiddleware, productsMiddleware.validateBody,productsController.updateProduct);

module.exports = router;