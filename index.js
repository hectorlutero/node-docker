const express = require('express')
const mongoose = require('mongoose')
const { MONGO_USER, 
        MONGO_PASSWORD,
        MONGO_IP,
        MONGO_PORT 
    } = require('./config')



const app = express()

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

const connectWithRetry = () => {
    mongoose
        .connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => console.log("successfully connected to DB"))
        .catch(e => {
            console.log(e)
            setTimeout(connectWithRetry, 5000)
        })
}

connectWithRetry();

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => res.send('<h1>Hello World!</h1>'))


app.listen(PORT, () => console.log(`Server runnning on port: ${PORT}`))