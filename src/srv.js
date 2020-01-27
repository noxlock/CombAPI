const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path')
const fs = require('fs')

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})

const app = express()
const port = 3000



app.use(helmet())
app.use(morgan('combined', { stream: accessLogStream}))
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.use(bodyParser.urlencoded({extended: true}))

const backRouter = require('./routes/api_routes.js')
const frontRouter = require('./routes/frontend_routes.js')
app.use(backRouter)
app.use(frontRouter)




app.listen(port, () => {
    console.log(`listening on http://127.0.0.1:${port}`)
})