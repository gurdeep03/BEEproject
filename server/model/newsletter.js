const mongoose = require("mongoose");
const newsletter = mongoose.Schema({
    title:{
        type : String , 
        require : [ true , "please add your name"],
    },
    author:{
        type : String , 
        require : [ true , "please add your last name"],
    },
    date:{
        type : Date , 
        require : [ true , "please add your last name"],
    },
    Description:{
        type : String , 
        require : [ true , "please add your age"],
    },
    url:{
        type : String , 
        require : [ true , "please add Url"],
    },
},
{
    timestamps : true ,
});
module.exports = mongoose.model("newsletter" , newsletter);