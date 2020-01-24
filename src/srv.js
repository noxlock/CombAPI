const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')


const app = express()
const port = 3000


app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(bodyParser.urlencoded({extended: true}))



app.get("/", (req, res) => {
    res.render('index.pug')
    console.log(req.query.select)
})




app.listen(port, () => {
    console.log(`listening on http://127.0.0.1:${port}`)
})