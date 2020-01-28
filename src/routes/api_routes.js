const express = require('express')
const database = require('../db.js')
const bodyParser = require('body-parser')

const backRouter = express.Router()
backRouter.use(bodyParser.json())

// Checks if the value passed is an integer
function intCheck(value) {
    value = Number(value)
    if (!value) {
        return false
    }
    else {
        return true
    }
}


// LIST ALL USERS
backRouter.get("/users", (req, res) => {
    let results = database.getAllUsers()
    res.render('allusers.pug', {data: results})
    
})

// LIST SPECIFIC USER
backRouter.get("/users/:id", (req, res) => {
    let check = database.doesUserExistSearch(req.params)
    if (intCheck(req.params.id) && check) {
        let results = database.getSingleUser(req.params.id)
        res.render('specificuser.pug', {data: results})
    }
    else {
        res.redirect("/invalid")
    }
    
})

// COUNT USERS IN SERVER
backRouter.get('/servers/', (req, res) => {
    let results = database.countServers()
    res.render('servercount.pug', {data: results})
})

// SEARCH WHAT SERVERS A USER IS IN
backRouter.get('/users/servers/:id', (req, res) => {
    let results = database.searchUserServers(req.params.id)
    if (results.length !== 0) {
        res.render("searchuserservers.pug", {data: results})
    }
    else {

        res.redirect("/invalid")
    }
})


// CREATE USER
backRouter.post("/users", (req, res) => {
    // IF CHECK QUERY ISN'T EMPTY, REDIRECT TO INVALID
    let check = database.doesUserAlreadyExist(req.body)
    if (check) {
        res.redirect("/invalid")
    }
    // ELSE REDIRECT TO USER CREATED
    else {
        database.createUser(req.body)
        res.send(`User created!`)
    }

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

// DUMP DATABASE
backRouter.get("/dump", (req, res) => {
    let results = database.dumpData()
    res.render("dumpall.pug", {data: results})
})

// SEARCH FOR STAFF
backRouter.get("/staff", (req, res) => {
    let results = database.searchStaff()
    res.render("staff.pug", {data: results})
})

module.exports = backRouter