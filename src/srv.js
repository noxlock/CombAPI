const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const database = require('./db.js')


const app = express()
const port = 3000


app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.use(bodyParser.urlencoded({extended: true}))


// INDEX
app.get("/", (req, res) => {
    res.render('index.pug')
    console.log(req.query.select)
})

// LIST USERS
app.get("/users", (req, res) => {
    res.json(database.getAllUsers())
    
})

// LIST SPECIFIC USER
app.get("/users/:id", (req, res) => {
    res.json(database.getSingleUser(req.params.id))
})

// CREATE USER
app.post("/users", (req, res) => {
    database.createUser(req.body)
    res.send(`User created!`)
})

// MODIFY USER
app.patch("/users/:id", (req, res) => {
    console.log(req.body.new_password, req.params.id)
    database.modifyUser(req.body, req.params.id)
    res.send(`Password updated!`)
})

// DELETE USER
app.delete("/users/:id", (req, res) => {
    database.deleteUser(req.params.id)
    res.send('User deleted!')
})



app.listen(port, () => {
    console.log(`listening on http://127.0.0.1:${port}`)
})