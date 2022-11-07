const mongoose = require('mongoose');

const pixelBoardSchema = mongoose.Schema({
    name: { type: String, required: true },
    status : { type: String, enum : ['brouillon','actif','inactif'], default: 'brouillon'},
    width: { type: Number, required: true, validate : {
        validator : Number.isInteger,
        message   : '{VALUE} is not an integer value'
      }
    },
    height: { type: Number, required: true, validate : {
        validator : Number.isInteger,
        message   : '{VALUE} is not an integer value'
      }
    },
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    dateFin: { type: Date, required: true },
    pixelsView: { type: Array, required: true },
    delais: { type: Number, required: true, validate : {
        validator : Number.isInteger,
        message   : '{VALUE} is not an integer value'
      }
    }
}, { timestamps: { createdAt: 'dateCreation' } });

module.exports = mongoose.model('PixelBoard', pixelBoardSchema)