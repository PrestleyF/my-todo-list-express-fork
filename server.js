const express = require('express') //making it possible to use express methods in this file
const app = express() // setting a variable and assigning it to an instance of express
const MongoClient = require('mongodb').MongoClient //  makes it possible to use methods associated with MongoClient and talk to our DB
const PORT = 2121 // setting a constant to determine the location where our server will be listening 
require('dotenv').config() //  it allows us to access variables inside of the .env file


let db, // declare a variable called db but not assign a value
    dbConnectionStr = process.env.DB_STRING,// declaring a variable and assigning out database connection string to it
    dbName = 'todo' // declaring a variable and assigning it the name of the database we want to access and be using 

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }) // creating a connection to mongodb and passing in a connection string. Also passing in an additional property
    .then(client => { // waiting for the connection and proceeding if successful and also passing in all client information 
        console.log(`Connected to ${dbName} Database`) // log to the console a template literal 'Connected to todo Database'
        db = client.db(dbName) // assignig a value to previously declared variable that contains a db client factory method 
    }) // closing our .then
    
// middleware
app.set('view engine', 'ejs') // sets ejs as the default render
app.use(express.static('public')) // sets the lcoation for static assets 
app.use(express.urlencoded({ extended: true })) //tells express to decode and encode URLs where the header matches the content. Supports arrays and objects
app.use(express.json()) //parses JSON content from incomig requests


app.get('/',async (request, response)=>{ // starts a GET method when the route is passed in, sets up req res parameters
    const todoItems = await db.collection('todos').find().toArray() // sets a varibale and awaits ALL items from the todos collection
    const itemsLeft = await db.collection('todos').countDocuments({completed: false}) // sets a variab le and awaits a count of uncomleted items to later display in EJS
    response.render('index.ejs', { items: todoItems, left: itemsLeft })// rendering EJS file and passing through the db items and the count remaining inside the object 
    // db.collection('todos').find().toArray()
    // .then(data => {
    //     db.collection('todos').countDocuments({completed: false})
    //     .then(itemsLeft => {
    //         response.render('index.ejs', { items: data, left: itemsLeft })
    //     })
    // })
    // .catch(error => console.error(error))
})

app.post('/addTodo', (request, response) => { // starts a POST method when thte route is passed in
    db.collection('todos').insertOne({thing: request.body.todoItem, completed: false}) // inserts a new item into todos collection gives it a completed value of flse by default
    .then(result => { // if inserts is successful do something
        console.log('Todo Added') // console log the action
        response.redirect('/') // gets rid of the /addtodo route and redirects back to homepage
    }) // closing the .then
    .catch(error => console.error(error)) // catching errors
}) // ending the POST

app.put('/markComplete', (request, response) => { // starts PUT method when markComplete route is passed in 
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{ // look in the database for one item matching the name of the item passed in from the main.js file that was clicked
        $set: {
            completed: true // set completed to true
          }
    },{
        sort: {_id: -1}, //  moves the item to the bottom of the list
        upsert: false // (upsert is a mix of insert and update) prevents insertion if item doesn't already exist 
    })// closing
    .then(result => { //  starts a .then if update was successful
        console.log('Marked Complete') // logging successful completion
        response.json('Marked Complete') // sending a response back to the sender 
    }) //closing .then
    .catch(error => console.error(error)) // catching errors 

}) // ending our PUT

app.put('/markUnComplete', (request, response) => { //starts PUT method when markUncomplete route is passed in 
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{ // look in the database for one item matching the name of the item passed in from the main.js file that was clicked
        $set: {
            completed: false // set completed to false
          }
    },{
        sort: {_id: -1}, // moves item to the bottom of the list
        upsert: false // (upsert is a mix of insert and update) prevents insertion if item doesn't already exist 
    })
    .then(result => { // starts a .then if update is successful
        console.log('Marked Complete') // logging successful completion
        response.json('Marked Complete') // sending a response back to the sender
    }) // closing .then
    .catch(error => console.error(error)) // catching errors

}) // ending PUT

app.delete('/deleteItem', (request, response) => {  //starts a delete method when the delete route is passed
    db.collection('todos').deleteOne({thing: request.body.itemFromJS}) // look inside the todos collection for the ONE item that has a matching name from our JS file 
    .then(result => { // IF delete was successful 
        console.log('Todo Deleted') // logging successful completion
        response.json('Todo Deleted') // send response back to the sender
    }) //clsoe .then
    .catch(error => console.error(error)) // catching erros

}) // ending DELETE

app.listen(process.env.PORT || PORT, ()=>{ // setting up which port we will be listening on - either the port from the .env file or the variable PORT 
    console.log(`Server running on port ${PORT}`) // console log the running port
}) // ending the listen method