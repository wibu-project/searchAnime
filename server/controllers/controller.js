const User = require("../models/user")
const { sign } = require("../helpers/jwt")
const { decrypt } = require("../helpers/bcrypt")
const {OAuth2Client} = require(`google-auth-library`);
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const client = new OAuth2Client(CLIENT_ID);


class Controller {
    static googleLogin(req,res,next){
        var payload = null
        client.verifyIdToken({
            idToken: req.body.idToken,
            audience: CLIENT_ID
        })
        .then(ticket =>{
            payload = ticket.getPayload()
            return User.findOne({email: payload.email})
        })
        .then(user =>{
            if(user){
                return user
            } else {
                var newuser = new User({
                    username: payload.name,
                    password: process.env.DEFAULT_PASSWORD,
                    email: payload.email
                })
                return newuser.save()
            }
        })
        .then(user =>{
            const token = sign({_id: user._id, username: user.username, email: user.email})
            res.status(200).json({token: token, username: user.username})
        })
        .catch(next)
    }

    static login(req,res,next){
        User.findOne({where:{
            username: req.body.username
        }})
        .then(user=>{
            if(!user){
                next({ code: 400, message: "Invalid username / password" })
            } else if (!decrypt(req.body.password,user.password)) {
                next({ code: 400, message: "Invalid username / password" }) 
            } else {
                const {id, username} = user 
                let payload = {id, username}
                const token = generateToken(payload)
                res.status(200).json({token})                
            }
        })
        .catch(next)
    }

    static register(req,res,next){
        const {username, password, email} = req.body
        User.create({username, password, email})
        .then(user=>{
            res.status(201).json({
                username: user.username,
                email: user.email
            })
        })
        .catch(next)
    }
}

module.exports = Controller