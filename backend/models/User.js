const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    email : { type: String, required: true, unique: true},
    password : { type: String, required: true},
    nom : { type: String, required: true},
    prenom : { type: String, required: true},
    role : { type: String, enum : ['user','valideur','admin'], default: "user"}
})

userSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.password;
    return obj;
}

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)