const bcrypt = require('bcrypt')
const User = require('../models/User');

const login = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(user) {
            let isCorrectPassword = bcrypt.compareSync(req.body.password, user.password)

            if(isCorrectPassword) {
                return res.status(200).json({user})
            }
        }else {
            return res.json({msg: "Password/email is wrong!"})
        }
    } catch (error) {
        console.log(error)
        return res.status(404).json({msg: "Oops! User not found!"})
    }
}

const register = async (req, res) => {
    try {
        User.findOne({email: req.body.email}).then(async (user) => {
            const salt = bcrypt.genSaltSync(10);
            if(!user) {
                let name = req.body.name
                let email = req.body.email
                let hashedPassword =  bcrypt.hashSync(req.body.password, salt);
                const newUser = new User({
                    name,
                    email,
                    password: hashedPassword
                })
                newUser.save()
                return res.status(201).json({user: newUser})
            }else {
                return res.status(404).json({msg: "Oops! User not found!"})
            }
        })
    } catch (error) {
        console.log(error)
        res.json({msg: 'Server Error!! Something went wrong!'})
    }
}



module.exports = {login, register}