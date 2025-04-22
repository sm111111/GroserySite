const express = require('express');
const cors = require('cors')
const app = express()
const connectDB = require('./config/db')
require('dotenv').config();
const AuthRoutes = require('./routes/AuthRoutes')
const ProductRoutes = require('./routes/ProductRoutes')
const CartRoutes = require('./routes/CartRoutes')
const path = require('path')

app.use(express.json())
app.use(cors(
    {
        origin: 'http://localhost:5173/',
        credentials: true
    }
))

connectDB();

const _dirname = path.resolve();

app.use('/auth', AuthRoutes)
app.use('/api', ProductRoutes)
app.use('/cart', CartRoutes)

app.use(express.static(path.join(_dirname, "/frontend/dist")))
app.get('*', (_, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is runing on ${PORT}`)
})