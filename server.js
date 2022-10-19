const express = require('express')
const bodyParser= require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended : true}))

app.post('/names', (req,res)  => 
    console.log("this is huge test")
)
