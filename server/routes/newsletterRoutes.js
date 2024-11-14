const express=require('express');
const router=express.Router();
const {post,Update,get,deleteletter}=require('../controllers/newsLetterController');
router.post('/',post);
router.patch('/',Update);
router.get('/',get);
router.delete('/',deleteletter);
module.exports=router;