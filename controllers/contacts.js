
const ObjectId = require("mongodb").ObjectId;


const mongodb = require("../data/database");

// const { getDB } = require("../routes/contacts");


const hello = (req, res) => {
    res.send("hello world");
}

const getAll = async (req, res) => {


    const { initializeDB } = require("../data/database");


    const data = await initializeDB()



    res.json(data);
};



const getSingle = async (req, res) => {

    // res.send("get single database");

    //
    // const { ObjectId } = require("mongodb");

    try{

    const userId = req.params.id;
      if(!ObjectId.isValid(userId)){
        return res.status(400).json({message: "Invalid ID format"});
      }

    

    const objectId = new ObjectId(userId)

    const { initializeDBbyID } = require("../data/database");

    
    const document = await initializeDBbyID(objectId);

    if(!document){
      return res.status(404).json({message: "Document not found"});
    }
    

    res.json(document);
  } catch (error){
    console.log("Error occurred:", error);

    res.status(500).json({message: "Error fetching document from database", error : error.message});
  }
};



//doing the post



const addContact = async (req,res) =>{
    
    const Contact = require("../models/contact")
    
    
    try{

    const {firstName, lastName, email, favoriteColor, birthday} = req.body;

    if(!firstName || !lastName || !email  || !favoriteColor  || !birthday){

      return res.status(400).json({message : "All fields are required"});
    }
      
 // create a new contact
    const newContact = new Contact({
        firstName,
        lastName,
        email,
        favoriteColor,
        birthday
    })

    
      // insert the contact into the db
      
  const { onlyInitializeDB } = require("../data/database");

  const mongo = await onlyInitializeDB();

  const response = await mongo.db("sample_mflix").collection("Contacts").insertOne(newContact);    
  

  // check if it was successfull
  if(response.acknowledged){
    res.status(201).json({
      message: "Contact added successfully",
      ContactID: response.insertedId
    });
  }
      else{
        console.log("couldn't insert the contact");
        res.status(500).json({message : "Couldn't save the new contact"})
      }
}catch(error){
  console.error("Error occurred while adding the contact:", error);
  res.status(500).json({message: "Error adding contact", error: error.message});
}

}




const updateContact = async(req,res) =>{

  const contactId = new ObjectId(req.params.id);

  const contact = {
    firstName : req.body.firstName,
    lastName: req.body.lastName,
    email : req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  }

  const { onlyInitializeDB } = require("../data/database")
  const mongo = await onlyInitializeDB();

  const response = await mongo.db("sample_mflix").collection("Contacts").replaceOne({_id: contactId}, contact)

  if(response.acknowledged){
    res.status(200).json({
      message : "User updated succesfully"
    })
  }
  else{
    res.status(500).json({
      message: "An error occurred while updating the contact",
      error: error.message
    })
  }
}



const deleteContact = async(req, res) =>{

  const contactId = new ObjectId(req.params.id);

  const { onlyInitializeDB } = require("../data/database");

  const mongo = await onlyInitializeDB();

  const response = await mongo.db("sample_mflix").collection("Contacts").deleteOne({_id: contactId});

  if(response.deletedCount > 0){
    res.status(204).json({
      message: "Contact deleted successfully",
      deletedContact: response.value
      
    })
  }
  else{
    res.status(500).json({message: "An error occurred while deleting the contact", error: error.message})
  }
}

module.exports = {
    getSingle,
    getAll,
    hello,
    addContact,
    updateContact,
    deleteContact
}