const express = require('express');

const router = express.Router();

// Define your routes here
router.get('/', (req, res) => {
    res.send('Welcome to the home page!');
});

router.get('/about', (req, res) => {
    res.send('About us page');
});

module.exports = router;