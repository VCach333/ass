import mongoose from 'mongoose'

const {Schema, model} = mongoose

const UserSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    tel: {
        type: String,
        required: true
    },
    bi: {
        type: String
    },
    pwd: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Usuário', 'Estudante', 'Secretária', 'Administrador'],
        default: 'Usuário'
    },
    status: {
        type: String,
        enum: ['Offline', 'Online', 'Bloqueado'],
        default: 'Offline'
    },
    photo: {
        type: String,
        default: 'avatar.png'
    },
    date: {
        create: {
            type: Date,
            default: Date.now
        },
        brithday: {
            type: Date
        }
    }

})

const User = model('User', UserSchema)

export default User