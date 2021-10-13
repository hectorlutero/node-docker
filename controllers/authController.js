const User = require('../models/userModel')
const bcrypt = require('bcryptjs')

exports.signUp = async (req, res) => {

    const {username, password} = req.body
    const hashpassword = await bcrypt.hash(password, 12)
    try {
        const newUser = await User.create({
            username,
            password: hashpassword
        })
        req.session.user = newUser
        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        })
    } catch (e) {
        res.status(400).json({
            status: 'fail',
            log: `error code: ${e.code}`
        })
    }
}

exports.login = async (req, res) => {

    const {username, password} = req.body
    try {
        const user = await User.findOne({username})

        if(!user) {
            res.status(404).json({
                status: 'fail',
                message: 'user not found'
            })
        }

        const isCorrect = await bcrypt.compare(password, user.password)

        if(isCorrect) {
            req.session.user = user
            res.status(200).json({
                status: 'success'
            })
        } else {
            res.status(404).json({
                status: 'fail',
                msg: 'incorrect password or username'
            })
        }
    } catch (e) {
        res.status(400).json({
            status: 'fail'
        })
    }
}

exports.getAllUsers = async (req, res) => {

    try {
        const users = await User.find()

        res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
                users
            }
        })
    } catch (e) {
        res.status(400).json({
            status: 'fail'
        })
    }
}