// import express app
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import mongoose from 'mongoose'

import user from './routes/user.js'

const app = express()
dotenv.config()

const db = process.env.DB_URL
const PORT = process.env.PORT || 5000

// middleware
app.use(cors())
app.use(express.json())
app.use('/user', user)

// check for production 
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

// connect to database
mongoose.connect(db, () => console.log('connected to db')
)


// app get request
app.get('/', (req, res) => {
    res.status(200).json({name: 'soyas', id: 12});
})

// app post request 


// start server
app.listen(PORT, () => console.log(`Server Running at ${PORT}`))