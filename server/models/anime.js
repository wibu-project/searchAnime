const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const animeSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title cannot be empty"]
    },
    addedBy :{ type: Schema.Types.ObjectId, ref: 'Users' },
    poster: String
    
}, {timestamps : true});

const Anime = mongoose.model('Anime', animeSchema);
module.exports = Anime