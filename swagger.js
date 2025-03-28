const swaggerAutogen = require("swagger-autogen");


const doc = {
    info: {
        title: "Contacts API",
        description: "API to manage a list of contacts. CRUD operations"
    },
    host: "localhost:3060",
    schemes: ["http"],


};

const outputFile = "./swagger-output.json";
const routes = ["./routes/index.js"];

swaggerAutogen(outputFile, routes, doc).then(() =>{
    console.log("swagger JSON generated");
})