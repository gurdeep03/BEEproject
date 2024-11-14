const express = require('express');
const Newsletter = require('../model/newsletter');
const asyncHandler = require('express-async-handler');

const router = express.Router();

// Subscribe to newsletter
const post = asyncHandler( async (req, res) => {
 

const { title, author, date, description, url } = req.body;

try {
    const newNewsletter = new Newsletter({
        title,
        author,
        date,
        description,
        url
    });

    await newNewsletter.save();
    res.status(201).json(newNewsletter);
} catch (error) {
    res.status(400).json({ message: error.message });
}
});

// Update newsletter
const Update = asyncHandler( async (req, res) => {
    const { id } = req.params;
    const { title, author, date, description, url } = req.body;

    try {
        const updatedNewsletter = await Newsletter.findByIdAndUpdate(
            id,


            { title, author, date, description, url },
            { new: true }
        );

        if (!updatedNewsletter) {


            return res.status(404).json({ message: 'Newsletter not found' });
        }

        res.status(200).json(updatedNewsletter);


    } catch (error) {

        res.status(400).json({ message: error.message });
    }
});

const get = asyncHandler(async (req, res) => {
    
    try {
        const newsletters = await Newsletter.find();
        res.status(200).json(newsletters);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    
});

const deleteletter = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const deletedNewsletter = await Newsletter.findByIdAndDelete(id);

        if (!deletedNewsletter) {
            return res.status(404).json({ message: 'Newsletter not found' });
        }

        res.status(200).json({ message: 'Newsletter deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


module.exports = { post, Update, get, deleteletter };