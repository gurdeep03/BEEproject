const express = require('express');
const router = express.Router();
const { validateJwtToken } = require('../middlewares/jwtAuthMiddleware'); // Ensure the path is correct
const { registerUser, loginUser, getAllUsers } = require('../controllers/userController');

console.log('registerUser:', registerUser); // Should not be undefined
console.log('loginUser:', loginUser);     // Should not be undefined

router.post('/', registerUser);
router.post('/login', validateJwtToken, loginUser);
router.get('/user', getAllUsers);


module.exports = router;