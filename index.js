const express = require('express')
const mongoose = require('mongoose')


const app = express()

mongoose.connect("mongodb://root:root@mongo:27017/?authSource=admin")
        .then(() => console.log("successfully connected to DB"))
        .catch(e => console.log(e))

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => res.send('<h1>Hello World!</h1>'))


app.listen(PORT, () => console.log(`Server runnning on port: ${PORT}`))