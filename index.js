const express = require('express')
const mongoose = require('mongoose')
const { MONGO_USER, 
        MONGO_PASSWORD,
        MONGO_IP,
        MONGO_PORT 
    } = require('./config/config')

const postRouter = require("./routes/postRoutes")

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

connectWithRetry()

app.use(express.json())

app.get('/', (req, res) => res.send('<h1>Hello World!</h1>'))

app.use('/api/v1/posts', postRouter)



const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server runnning on port: ${PORT}`))