const express = require('express');

const router = express.Router();

// Example controller function
const exampleController = (req, res) => {
    res.send('Hello from the controller!');
};

// Define routes
router.get('/example', exampleController);

module.exports = router;