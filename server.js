const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const noteRouter = require('./route/noteRoute')

var app = express();
app.use(cors());

//to parse app / x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));
//to parse app json
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send('server is running');
})

app.use('/api/v1',noteRouter)

app.listen(3000,()=>{
    console.log("server started");
})