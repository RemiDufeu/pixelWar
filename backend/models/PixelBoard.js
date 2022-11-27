const mongoose = require('mongoose');

const pixelBoardSchema = mongoose.Schema({
    name: { type: String, required: true },
    status : { type: String, enum : ['actif','inactif'], default: 'actif'},
    width: { type: Number, required: true , min : 10, max: 500,validate : {
        validator : Number.isInteger,
        message   : '{VALUE} is not an integer value'
      }
    },
    isPublic : { type: Boolean, default: false},
    mode : { type: String, enum : ['onePixel','infinite'], default: 'infinite'},
    height: { type: Number, required: true, min : 10, max: 500, validate : {
        validator : Number.isInteger,
        message   : '{VALUE} is not an integer value'
      }
    },
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    dateFin: { type: Date },
    pixelsView: { type: Array, required: true },
    delais: { type: Number, required: true, min : 10, max: 3600, validate : {
        validator : Number.isInteger,
        message   : '{VALUE} is not an integer value'
      }
    }
}, { timestamps: { createdAt: 'dateCreation' } });

module.exports = mongoose.model('PixelBoard', pixelBoardSchema)