const express = require('express')
const dotenv = require('dotenv')

const app = express()
dotenv.config()

app.get('/', (req, res) => {
    res.send("API is running")
})

app.get('/nodes', (req, res) => {
    res.json(nodes)
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`sever started on PORT ${PORT}...`)
})