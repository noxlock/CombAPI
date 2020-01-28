const express = require('express')
const fetch = require('node-fetch')

const frontRouter = express.Router()


// INDEX
frontRouter.get("/", (req, res) => {
    res.render('index.pug')
})

// SEARCH MENU
frontRouter.get("/search", (req, res) => {
    // SEARCH FOR A SINGLE USER
    if (req.query.id) {
        res.redirect("/users/" + req.query.id)
        
        
    }
    // SEARCH FOR USERS IN A SERVER
    else if (req.query.userserverid) {
        res.redirect("/users/servers/" + req.query.userserverid)
    }
    // ELSE CONTINUE RENDERING
    else {
        res.render('searchmenu.pug', {id: req.query.id})
    }
    

})

frontRouter.get("/create", (req, res) => {
    // IF ALL PROPERTIES PRESENT, CREATE USER
    if (req.query.user_id && req.query.username && req.query.password && req.query.role) {
        // CREATE POST OBJECT
        let body = {
            user_id: req.query.user_id,
            username: req.query.username,
            password: req.query.password,
            role: req.query.role
        }
        // POST TO API ROUTE
        fetch("http://localhost:3000/users", {
            method: "post",
            body: JSON.stringify(body),
            headers: {"Content-Type": 'application/json'}
        }).
        then(req => {
            // IF POST TO CREATE USER DOESN'T REDIRECT TO INVALID, REDIRECT TO SUCCESS
            if (req.url !== "http://localhost:3000/invalid") {
                res.redirect("/usercreated")
            }
            // ELSE REDIRECT TO INVALID
            else {
                res.redirect("http://localhost:3000/invalid")
            }
        })

        
    }
    // ELSE CONTINUE RENDERING
    else {
        res.render("create.pug")
    }
    
})

// AFTER USER CREATED
frontRouter.get("/usercreated", (req, res) => {
    res.render("usercreated.pug")
})

frontRouter.get("/modify", (req, res) => {
    // IF USER_ID AND NEW PASSWORD
    if (req.query.user_id && req.query.new_password) {
        // PATCH OBJECT
        let body = {
            new_password: req.query.new_password
        }
        // PATCH REQUEST
        fetch(`http://localhost:3000/users/${req.query.user_id}`, {
            method: "patch",
            body: JSON.stringify(body),
            headers: {"Content-Type": 'application/json'}
        })
        res.redirect("/passwordchanged")
    }
    // ELSE CONTINUE RENDERING
    else {
        res.render("modify.pug")
    }
})

// AFTER PATCH REQUEST / PASSWORD CHANGED
frontRouter.get("/passwordchanged", (req, res) => {
    res.render("usermodified.pug")
})

frontRouter.get("/delete", (req, res) => {
    // IF USER_ID
    if (req.query.user_id) {
        // DELETE REQUEST
        fetch(`http://localhost:3000/users/${req.query.user_id}`, {
            method: "delete",
        })
        res.redirect("/userdeleted")
    }
    // ELSE CONTINUE RENDERING
    else {
        res.render("delete.pug")
    }

})

// RENDER AFTER DELETE REQUEST / USER DELETED
frontRouter.get("/userdeleted", (req, res) => {
    res.render("userdeleted.pug")
})

// IF INVALID DATA SUBMITTED
frontRouter.get("/invalid", (req, res) => {
    res.render("invalid.pug")
})


module.exports = frontRouter