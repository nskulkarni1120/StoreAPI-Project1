// async errors
require('dotenv').config()
require('express-async-errors');
const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const productsRouter = require('./route/products');
const errorMiddleware = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');

// middleware
app.use(express.json());

// routes
app.get('/',(req,res)=>{
    res.send('<h1>STORE API</h1><a href="/api/v1/products">products route</a>')
})
app.use('/api/v1/products',productsRouter)





const port  = process.env.PORT || 3000

// products route

app.use(errorMiddleware);
app.use(notFound);

const start = async() => {
    try {
        // connectDB        
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`Server is runing on ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start();