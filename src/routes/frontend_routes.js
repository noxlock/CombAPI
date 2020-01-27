const express = require('express')
const fetch = require('node-fetch')

const frontRouter = express.Router()


// INDEX
frontRouter.get("/", (req, res) => {
    res.render('index.pug')
})

// IF THE USER SELECTS SEARCH
frontRouter.get("/search", (req, res) => {
    if (req.query.id) {
        res.redirect("/users/" + req.query.id)
        
        
    }
    else if (req.query.userserverid) {
        res.redirect("/users/servers/" + req.query.userserverid)
    }
    else {
        res.render('searchmenu.pug', {id: req.query.id})
    }
    

})

frontRouter.get("/create", (req, res) => {
    if (req.query.user_id && req.query.username && req.query.password && req.query.role) {
        let body = {
            user_id: req.query.user_id,
            username: req.query.username,
            password: req.query.password,
            role: req.query.role
        }
        fetch("http://localhost:3000/users", {
            method: "post",
            body: JSON.stringify(body),
            headers: {"Content-Type": 'application/json'}
        })
        res.redirect("/usercreated")
    }
    else {
        res.render("create.pug")
    }
    
})

frontRouter.get("/usercreated", (req, res) => {
    res.render("usercreated.pug")
})

frontRouter.get("/modify", (req, res) => {
    if (req.query.user_id && req.query.new_password) {
        let body = {
            new_password: req.query.new_password
        }
        fetch(`http://localhost:3000/users/${req.query.user_id}`, {
            method: "patch",
            body: JSON.stringify(body),
            headers: {"Content-Type": 'application/json'}
        })
        res.redirect("/passwordchanged")
    }
    else {
        res.render("modify.pug")
    }
})

frontRouter.get("/passwordchanged", (req, res) => {
    res.render("usermodified.pug")
})

frontRouter.get("/delete", (req, res) => {
    if (req.query.user_id) {
        fetch(`http://localhost:3000/users/${req.query.user_id}`, {
            method: "delete",
        })
        res.redirect("/userdeleted")
    }
    else {
        res.render("delete.pug")
    }

})

frontRouter.get("/userdeleted", (req, res) => {
    res.render("userdeleted.pug")
})

module.exports = frontRouter