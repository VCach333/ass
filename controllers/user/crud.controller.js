/* module import */
import bcrypt from 'bcryptjs'

/* service import */
import * as UserServices from '../../services/user/user.service.js'

/* controllers */
export const createUser = (req, res) => {

    const data = {
        name: req.body.signupUserName,
        tel: req.body.signupUserTel,
        pwd: req.body.signupUserPassword,
        /* temp */
        role: 'Estudante'
    }


    bcrypt.hash(data.pwd, 10).then(hash => {

        data.pwd = hash

        UserServices.create(data).then(() => {

            req.flash('success_msg', 'Conta Criada')
            res.redirect('/user/sign?action=in')

        }).catch(err => {

            console.log('Erro Interno: ' + err)
            req.flash('error_msg', 'Erro Interno')
            res.redirect('/user/sign?action=up')
        })
    })
}

export const updateUser = (req, res) => {

    const data = {
        pwdCurrent: req.body.updatePwd,
        name: req.body.updateName,
        tel: req.body.updateTel,
        bi: req.body.updateBI
        // waiting other fields
    }

    // validation
    if (
        !data.pwdCurrent || data.pwdCurrent == undefined || data.pwdCurrent == null
        ||
        !data.name || data.name == undefined || data.name == null
        ||
        !data.tel || data.tel == undefined || data.tel == null
        ||
        !data.bi || data.bi == undefined || data.bi == null
    ) {

        console.log('Preencha todos os Campos')
        req.flash('success_msg', 'Preencha todos os Campos')
        return res.redirect('/user/profile')

    } else {

        bcrypt.compare(data.pwdCurrent, req.user.pwd, (err, match) => {

            if (err) {
                req.flash('error_msg', 'Erro Interno')
                console.log('Erro Interno: ' + err)
                return res.redirect('/user/profile')
            }

            if (match) {

                UserServices.update(req.user._id, data).then(() => {

                    req.flash('info_msg', 'Dados Atualizados')
                    res.redirect('/user/profile')

                }).catch(err => {

                    req.flash('error_msg', 'Erro Interno')
                    console.log('Erro Interno: ' + err)
                    res.redirect('/user/profile')
                })

            } else {

                req.flash('success_msg', 'Senha Incorreta')
                console.log('Senha Incorreta')
                res.redirect('/user/profile')
            }
        })
    }
}

export const updatePhotoUser = (req, res) => {

    const foto = req.body.updateUserPhoto

    UserServices.updatePhoto(req.user._id, foto).then(() => {

        req.flash('info_msg', 'Foto Atualizada')
        res.redirect('/user/profile')

    }).catch(err => {

        console.log('Erro Interno: ' + err)
        req.flash('error_msg', 'Erro Interno')
        res.redirect('/user/profile')
    })
}

export const updateRoleUser = (req, res) => {

    UserServices.updateRole(req.user._id).then(() => {

        req.flash('info_msg', 'Privilégio Atualizado')
        res.redirect('/user/profile')

    }).catch(err => {

        console.log('Erro Interno: ' + err)
        req.flash('error_msg', 'Erro Interno')
        res.redirect('/user/profile')
    })
}

export const updatePwdUser = (req, res) => {

    // get data
    const data = {
        pwdCurrent: req.user.pwd,
        pwdNew: req.body.updatePwdNew,
        pwdNewAgain: req.body.updatePwdNewAgain,
        pwdOld: req.body.updatePwdOld
    }

    // validation
    bcrypt.compare(data.pwdOld, data.pwdCurrent, (err, match) => {

        if (err) {

            console.log('Erro Interno: ' + err)
            req.flash('error_msg', 'Erro Interno')
            return res.redirect('/user/profile')
        }

        if (match) {

            if (
                !data.pwdNew || data.pwdNew == null || data.pwdNew == undefined || data.pwdNew == ''
                ||
                !data.pwdNewAgain || data.pwdNewAgain == null || data.pwdNewAgain == undefined || data.pwdNewAgain == ''
                ||
                !data.pwdOld || data.pwdOld == null || data.pwdOld == undefined || data.pwdOld == ''
            ) {

                console.log('Preencha todos os Campos')
                req.flash('error_msg', 'Preencha todos os Campos')
                return res.redirect('/user/profile')

            } else if (data.pwdNew == data.pwdOld) {

                console.log('Nova Senha Igual a Atual')
                req.flash('error_msg', 'Nova Senha Igual a Atual')
                return res.redirect('/user/profile')

            } else if (data.pwdNew != data.pwdNewAgain) {

                console.log('Novas Senhas Diferentes')
                req.flash('error_msg', 'Novas Senhas Diferentes')
                return res.redirect('/user/profile')
            }
            
            bcrypt.hash(data.pwdNew, 10).then(hash => {

                // call service
                UserServices.updatePwd(req.user._id, hash).then(() => {
                    
                    req.flash('info_msg', 'Senha Atualizada')
                    res.redirect('/user/profile')
                    
                }).catch(err => {
                    
                    console.log('Erro Interno: ' + err)
                    req.flash('error_msg', 'Erro Interno')
                    res.redirect('/user/profile')
                })
            })

        } else {

            console.log('Senha Atual Incorreta')
            req.flash('error_msg', 'Senha Atual Incorreta')
            res.redirect('/user/profile')
        }
    })
}