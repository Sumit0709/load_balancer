const express = require("express");
const cors = require('cors')
const uuid = require('uuid');

const routes = require('./routes/routes');
const request_list_obj = require('./stats/RequestList')
const update_healthy_servers = require("./helper/update_healthy_servers");

const CONSTANTS = require("./CONSTANTS");

const PORT = CONSTANTS.PORT;

const app = express();
// parse json body
app.use(express.json());

// Calling when server starts to populate healthy servers in the healthy server list
update_healthy_servers();

const lb_type = CONSTANTS.load_balancing_algorithm_type;

app.use((req, res, next)=>{
    req.lb_type = lb_type;
    req.request_id = uuid.v4();
    next();
})

// only handelling requests that start with /api 
app.use('/api', routes)

// for all other requests, it will respond with 404
app.use('/*', async(req, res) => {
    return res.status(404).json({
        success: false,
        error: "Service not available"
    })
})

try{
    app.listen(PORT, (err)=>{
        
        // periodically updating the healthy servers list
        setInterval(async () => {
            update_healthy_servers();
        }, CONSTANTS.update_healthy_servers_interval);

        // Handle the accumulated data associated with incoming requests
        setInterval(async() => {
            request_list_obj.process_requests();
        },CONSTANTS.process_request_data_interval)

        if(!err)
            console.log(`Backend Server is running on PORT :: ${PORT}`);
        else  
            console.log(`Error in running Backend Server on PORT :: ${PORT} ERROR:: ${err.message}`);
    })
}
catch(err){
    console.log("Error occured while starting server")
}
finally{
}
