const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
module.exports = router

// Getting all
router.get('/', async (req, res) => {
    try{
    const users = await User.find()
    res.json(users)

    } catch(err){
        res.status(500).json({ message: err.message })
    }
})

// Getting one
router.get('/:id', getUser, (req, res) => {
    res.json(res.user)
})

//create the login router
router.post('/login', async(req, res) => {

    const body = req.body
    const user = await User.findOne({ email: body.email})

    if(user){

        const result = await bcrypt.compare(body.password, user.password)

        if(result){
            res.status(200).json({validated: true, message: "Valid Password"})
        }
        else{
        res.status(400).json({validated: false, message: "Not a valid password"})
        }
    }
    else{
        res.status(401).json({validated: false, message: "Not a valid user"})
    }
})


router.post('/register', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    try{
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch(err){
        res.status(400).json({ message: err.message})
    }
})


// Updating one
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name
    }
    if (req.body.email != null) {
        res.user.email = req.body.email
    }
    try{
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (err){
         res.status(400).json({ message: err.message })
    }
})

// Deleting one
router.delete('/:id', getUser, async (req, res) => {
    try{
        await res.user.deleteOne()
        res.json({ message: 'Deleted User' })
    }catch(err){
        res.status(500).json({ message: err.message })
    }
})

async function getUser(req, res, next) {
    let user
    try{   
        user = await User.findById(req.params.id)
        if (user == null){
            return res.status(404).json({ message: 'Cannot find user'})
        }
    }catch(err){
        return res.status(500).json({ message: err.message })
    }
    res.user = user
    next()
}
module.exports = router