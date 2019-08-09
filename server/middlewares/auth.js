const {decoded} = require('../helpers/jwt')

module.exports = {
    authentication(req,res,next){
        if(req.headers.hasOwnProperty('token')){
            try{
                const decode = decoded(req.headers.token)
                req.decode = decode
                next()
            }
            catch{
                res.status(500).json({
                    message: 'Please provide a valid token'
                })
            }
        } else {
            res.status(500).json({
                message: 'Please log in first'
            })
        }
    }
}