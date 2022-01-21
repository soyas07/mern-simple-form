// import express 
import express from 'express'
const router = express.Router()

// import json web token
import jwt from 'jsonwebtoken'

// import mongoose user model
import User from '../models/User.js'

// import bcrypt module
import bcrypt from 'bcrypt'

// middlewares
router.use(express.json())

router.post('/register', async (req, res) => {
    try {
        let { fName, lName, em, pass } = req.body
        let hashPass = await bcrypt.hash(pass, 10)

        const user = await User.create({
            firstName: fName,
            lastName: lName,
            email: em,
            password: hashPass
        })
        res.json({ status: 'ok' })
    } catch(err) {
        res.json({ status: 'error', error: err.message })
    }
})

router.post('/login', async (req, res) => {
    let { em, pass } = req.body
    
    const user = await User.findOne({
        email: em,
    })

    if(!user) res.json({ status: 'error', message: 'User not found' })

    let isValidPass = await bcrypt.compare(pass, user.password)

    if (isValidPass){
        const token = jwt.sign({user}, 'secretkey')
        return res.json({ status: 'ok', user: token })
    }
    else 
        return res.json({ status: 'error', user: false })
  
})

router.get('/dashboard', async (req, res) => {
    const token = req.headers['x-access-token']
    try {
        const decoded = jwt.verify(token, 'secretkey')
        const email = decoded.email
        const user = await User.findOne({ email: email })

        res.json({ status: 'ok', userEmail: user })
    } catch(err) {
        res.json({ status: 'error', error: 'invalid token'})
    }
})

export default router