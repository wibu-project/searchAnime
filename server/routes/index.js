const express = require("express")
const router = express.Router()
const translate = require('../helpers/translate')
const axios = require('axios')
const Controller = require('../controllers/controller')
const {authentication} = require('../middlewares/auth')

router.post('/users/register', Controller.register)
router.post('/users/login', Controller.login)
router.post('/users/glogin', Controller.googleLogin)


router.post("/translate", authentication, function(req,res,next){
    translate.translate(req.body.text, req.body.target)
    .then(translation=>{
        res.json(translation)
    })
    .catch(next)
})

router.get("/games/:title", authentication, function(req,res,next){
    let games = {}
    axios({
        method: "post",
        url: `https://api-v3.igdb.com/games`,
        headers:{
            "Accept": "application/json",
            "user-key": "6144a5ff74e6d71f521799192863187a",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: `search "${req.params.title}"; fields id,name,cover,total_rating;`
    })
    .then(({ data })=>{
        res.json(data)
    })
    .catch(next)
})

router.get("/cover/:id", authentication, function(req,res,next){
    return axios({
        method: "post",
        url: `https://api-v3.igdb.com/covers`,
        headers:{
            "Accept": "application/json",
            "user-key": "6144a5ff74e6d71f521799192863187a",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: `fields * ; where game=${req.params.id};`
    })
    .then(({data})=>{
        res.json(data)
    })
    .catch(next)
})

module.exports = router
