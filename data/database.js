const dotenv = require("dotenv");
dotenv.config();

async function initializeDB() {
  const { MongoClient } = require("mongodb");

  const uri = process.env.URI;

  const client = new MongoClient(uri);

  try {
    await client.connect();

    const data = await getData(client);

    console.log("you're connected to the database");

    return data;
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

async function getData(client) {
  const collection = await client.db("sample_mflix").collection("Contacts");

  const contactsData = await collection.find({}).toArray();

  return contactsData;
}

// getting by the id

async function initializeDBbyID(id) {
  const { MongoClient } = require("mongodb");

  const uri =
    "mongodb+srv://bruninrko123:Rb147258%40%40@cluster0.mnzq5.mongodb.net/";

  const client = new MongoClient(uri);

  try {
    await client.connect();

    const document = await getById(id, client);

    console.log("you're connected to the database");

    return document;
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

async function getById(userId, client) {
  const collection = await client.db("sample_mflix").collection("Contacts");

  const document = await collection.find({ _id: userId }).toArray();

  return document;
}

async function onlyInitializeDB() {
   
  const { MongoClient } = require("mongodb");
  const uri = process.env.URI;
    
  const client = new MongoClient(uri);
 
  try {
      
    await client.connect();
    
    console.log("you're connected to the database");
    return client;
    
  } catch (error) {
    console.error("could not connect to the database");
  }
}

module.exports = {
  initializeDB,
  initializeDBbyID,
  onlyInitializeDB,
};
