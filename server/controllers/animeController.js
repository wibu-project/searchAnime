const Anime = require("../models/anime")
const { decoded } = require('../helpers/jwt')

class AnimeController{
    static findAll(req, res, next) {
        let token = decoded(req.headers.token)
        let userId = token._id
        Anime.find({ addedBy: userId
        })
        .sort([['createdAt', 'descending']])
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }

    static create(req, res, next) {
        let token = decoded(req.headers.token)
        let obj = {
            title: req.body.title,
            poster: req.body.poster,
            addedBy: token._id
        }
        Anime.create(obj)
        .then(data => {
            res.status(200).json(data)           
        })
        .catch(next)
    }

    static delete(req, res, next) {
        Anime.findByIdAndDelete(req.params.id)
        .then(data => {
            if (!data) res.status(404).json({ message: 'Not Found' })
                else res.status(200).json({
                    _id : req.params.id
                })
        }) 
        .catch(next)
    }
}

module.exports = AnimeController