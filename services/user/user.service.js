/* model import */
import User from '../../models/user.model.js'

/* services */
export const create = (data) => {

    return new User(data).save().then(() => {

        console.log('Usuário Cadastrado')

    }).catch(err => console.log(err))
}

export const update = (id, data) => {

    return User.findByIdAndUpdate(

        { _id: id },
        { $set: data }

    ).then(() => {

        console.log('Usuário Atualizado')

    }).catch(err => console.log(err))
}

export const updatePhoto = (id, foto) => {

    User.findByIdAndUpdate(

        { _id: id },
        { $set: { foto: foto } }

    ).then(() => {

        console.log('Foto de Usuário Atuilizado')

    }).catch(err => console.log(err))
}

export const updateRole = (id) => {

    return User.findByIdAndUpdate(
        { _id: id },
        { $set: { 'role': 'Estudante' } }
    ).then(() => {

        console.log('Privilégio de Estudante Dado à Usuário')

    }).catch(err => console.log(err))
}

export const updatePwd = (id, pwd) => {

    return User.findByIdAndUpdate(
        
        {_id: id},
        {$set: {pwd: pwd}}

    ).then(() => {

        console.log('Senha Atualizada')

    }).catch(err => console.log(err))
}