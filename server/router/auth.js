const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



require('../db/dbcon');
const User = require('../model/UserSchema.js')

router.get('/', (req, res) => {
    res.send('hello world from the server router js')
    // res.cookie("abc","dsfdsn")
    // res.send(req.body)

})

router.post('/register', async (req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "fill the form " })
    }
    // res.send(req.body)
    console.log(req.body)

    try {
        const userExist = await User.findOne({ email: email })
        if (userExist) {
            return res.status(422).json({ error: "email already exits " })
        } else if (password !== cpassword) {
            res.status(400).json({ message: "user invalid" })
        } else {
            const user = new User({ name, email, phone, work, password, cpassword })
            await user.save()
            res.status(201).json({ message: "user register successfuly" })
        }
    } catch (err) {
        console.log(err)
    }
})

// login route

router.post('/signin', async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Please fill the data" })
        }

        const userLogin = await User.findOne({ email: email })

        if (userLogin) {
            const match = await bcrypt.compare(password, userLogin.password)
            
            let token = await userLogin.generateAuthToken()
            // console.log(token)

            res.cookie("jwtoken",token,{
                expires: new Date(Date.now()+25892000000),
                httpOnly:true
            })

            if (!match) {
                res.status(400).json({ error: "user error 1" })
            } else {
                res.json({ message: "user signin successfully" })
            } 
        } else {
            res.status(400).json({ error: "user error 2" })

        }

    } catch (error) {

    }
})

module.exports = router;
