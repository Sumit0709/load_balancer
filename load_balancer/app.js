const express = require("express");
const cors = require('cors')
const uuid = require('uuid');

const routes = require('./routes/routes');
const request_list_obj = require('./stats/RequestList')
const update_healthy_servers = require("./helper/update_healthy_servers");

const get_lb_type = require('./helper/lb_type');

// const envFileName = `.env.${process.env.NODE_ENV || "development"}`
// require('dotenv').config({ path: envFileName })

const PORT = 9000;

const app = express();
// parse json body
app.use(express.json());
// app.use(express.urlencoded({extended: false}))

update_healthy_servers();
const lb_type = get_lb_type();

app.use((req, res, next)=>{
    req.lb_type = lb_type;
    req.request_id = uuid.v4();
    next();
})
app.use('/api', routes)
app.use('/*', async(req, res) => {
    return res.status(404).json({
        success: false,
        error: "URL not available"
    })
})

app.listen(PORT, (err)=>{
    
    setInterval(async () => {
        update_healthy_servers();
    }, 10000); // called every 10 sec

    setInterval(async() => {
        request_list_obj.process_requests();
    },10000)

    if(!err)
        console.log(`Backend Server is running on PORT :: ${PORT}`);
    else  
        console.log(`Error in running Backend Server on PORT :: ${PORT} ERROR:: ${err.message}`);
})
