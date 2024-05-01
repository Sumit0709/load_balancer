const express = require("express");
const cors = require('cors')
const readlineSync = require('readline-sync');
const routes = require('./routes/routes');

// const envFileName = `.env.${process.env.NODE_ENV || "development"}`
// require('dotenv').config({ path: envFileName })

const BASE_PORT = 8000;
let number_of_servers = 5;


if(number_of_servers == null){
    number_of_servers = readlineSync.question("How many servers do you want to start? ");
}

const app = new Array(number_of_servers);

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
    
    app[i].use('/*', routes)

    app[i].listen(PORT, (err)=>{
        if(!err)
            console.log(`Backend Server is running on PORT :: ${PORT}`);
        else  
            console.log(`Error in running Backend Server on PORT :: ${PORT} ERROR:: ${err.message}`);
    })
}