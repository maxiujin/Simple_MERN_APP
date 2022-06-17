const express = require('express')
const mongoose =require('mongoose')
const dotenv = require('dotenv').config(); 
const cors =require('cors')

const app =express(); 
//Use express.json() to get data into json format
app.use(express.json());

//Port

const PORT = process.env.PORT || 5500;

//use cors because of different hosts
app.use(cors())

const TodoItemRoute = require('./routes/todoItems');

//Lets connect to mongodb ..
mongoose.connect(process.env.DB_CONNECT)
.then(()=> console.log("Database Connected"))
.catch(err => console.log(err))

//Add Port and connect server
app.listen(PORT, ()=> console.log("Server is connected!")); 

app.use('/', TodoItemRoute)