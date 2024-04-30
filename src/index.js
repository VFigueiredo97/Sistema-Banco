const express = require('express')
const app = express()

const rota = require("./routes")

app.use(express.json())

app.use(rota)

app.listen(3000)
