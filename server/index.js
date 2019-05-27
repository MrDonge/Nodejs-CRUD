const express = require('express')

const routes = require('./routes')

const port = require('./config/default').port

const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

// 路由
routes(app)



app.listen(port, () => console.log(`server listening on ${port} port!`))
