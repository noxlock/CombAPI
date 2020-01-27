const express = require('express')
const database = require('../db.js')
const bodyParser = require('body-parser')

const backRouter = express.Router()
// backRouter.use(bodyParser.urlencoded({ extended: true}))
backRouter.use(bodyParser.json())

// LIST ALL USERS
backRouter.get("/users", (req, res) => {
    let results = database.getAllUsers()
    res.render('allusers.pug', {data: results})
    
})

// LIST SPECIFIC USER
backRouter.get("/users/:id", (req, res) => {
    let results = database.getSingleUser(req.params.id)
    res.render('specificuser.pug', {data: results})
})

// COUNT USERS IN SERVER
backRouter.get('/servers/', (req, res) => {
    let results = database.countServers()
    res.render('servercount.pug', {data: results})
})

// SEARCH WHAT SERVERS A USER IS IN
backRouter.get('/users/servers/:id', (req, res) => {
    let results = database.searchUserServers(req.params.id)
    res.render("searchuserservers.pug", {data: results})
})


// CREATE USER
backRouter.post("/users", (req, res) => {
    database.createUser(req.body)
    res.send(`User created!`)
})

// MODIFY USER
backRouter.patch("/users/:id", (req, res) => {
    database.modifyUser(req.body, req.params.id)
})


// DELETE USER
backRouter.delete("/users/:id", (req, res) => {
    database.deleteUser(req.params.id)
    res.send('User deleted!')
})

module.exports = backRouter