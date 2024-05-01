const express = require("express");
const cors = require('cors')
const readlineSync = require('readline-sync');
const routes = require('./routes/routes');
const CONSTANTS = require("./CONSTANTS");

const BASE_PORT = CONSTANTS.BASE_PORT;
let number_of_servers = CONSTANTS.number_of_servers;

// To ask users, how many servers they want to start
if(number_of_servers == null){
    number_of_servers = readlineSync.question("How many servers do you want to start? ");
}

// Array of app instances
const app = new Array(number_of_servers);

// starting multiple servers at different PORT
for(let i=0; i<=number_of_servers; i++){

    const PORT = BASE_PORT + i;

    app[i] = express();
    // parse json body
    app[i].use(express.json());
    app[i].use(express.urlencoded({extended: false}))

    app[i].use((req, res, next) => {
        req.PORT = PORT
        next();
    });
    
    // direct all requests to this route
    app[i].use('/*', routes)

    app[i].listen(PORT, (err)=>{
        if(!err)
            console.log(`Backend Server is running on PORT :: ${PORT}`);
        else  
            console.log(`Error in running Backend Server on PORT :: ${PORT} ERROR:: ${err.message}`);
    })
}