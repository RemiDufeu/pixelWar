const mongoose = require('mongoose');

const pixelSchema = mongoose.Schema({
    x: { type: Number, required: true },
    y : { type: Number, required: true},
    color : { type: String, required: true},
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    board: {type: mongoose.Schema.Types.ObjectId, ref: 'PixelBoard'},
}, { timestamps: { createdAt: 'dateCreation' } });

module.exports = mongoose.model('Pixel', pixelSchema)