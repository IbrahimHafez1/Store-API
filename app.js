require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const connectDB = require('./db/connect.js')

const productsRouter = require('./routes/products.js')

const notFoundMiddleware = require('./middleware/not-found.js')
const errorHandlerMiddleware = require('./middleware/error-handler.js')


app.use(express.json())

app.get('/', (req, res) => {
    res.send('Store API')
})

app.use('/api/v1/products', productsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, console.log("Server is listening to port 3000"));
    } catch (error) {
        console.log(error);
    }
}

start();