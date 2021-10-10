const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => res.send('<h1>Hello World!asdasd</h1>'))


app.listen(PORT, () => console.log(`Server runnning on port: ${PORT}`))