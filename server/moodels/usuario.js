const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '[VALUES] no es un rol valido'
}

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es requerido']
    },
    email: {
        type: String,
        require: [true, 'El email es requerido']
    },
    password: {
        type: String,
        require: true,
        unique: true
    },
    img: {
        type: String,
        require: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false

    }

});

usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

usuarioSchema.plugin(uniqueValidator, { mesagge: '{PATH} debe ser único' })

module.exports = mongoose.model('Usuario', usuarioSchema);