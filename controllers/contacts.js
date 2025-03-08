


// const ObjectId = require("mongodb").ObjectId;

// const { getDB } = require("../routes/contacts");


const hello = (req, res) =>{
    res.send("hello world");
}

const getAll = async (req, res) => {
    
    
    const {initializeDB} = require("../data/database");
    
    
    const data = await initializeDB()

  
    
    res.json(data);
};



const getSingle = async (req, res) => {
    
    // res.send("get single database");

    //
    const { ObjectId }= require("mongodb");

    const userId = new ObjectId(req.params.id)

    const {initializeDBbyID} = require("../data/database");
    
    
    const document = await initializeDBbyID(userId);

  
    
    res.json(document);
};



module.exports = {
    getSingle,
    getAll,
    hello
}