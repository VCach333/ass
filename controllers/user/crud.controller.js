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

            // waiting flash msg
            res.redirect('/user/sign?action=in')

        }).catch(err => {

            console.log('Erro Interno: ' + err)
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

        // waiting flash msg
        console.log('Preencha todos os Campos')
        return res.redirect('/user/profile')

    } else {

        bcrypt.compare(data.pwdCurrent, req.user.pwd, (err, match) => {

            if (err) {
                // waiting flash msg
                console.log('Erro Interno: ' + err)
                return res.redirect('/user/profile')
            }

            if (match) {

                UserServices.update(req.user._id, data).then(() => {

                    // waiting flash msg
                    res.redirect('/user/profile')

                }).catch(err => {

                    // waiting flash msg
                    console.log('Erro Interno: ' + err)
                    res.redirect('/user/profile')
                })

            } else {

                // waiting flash msg
                console.log('Senha Incorreta')
                res.redirect('/user/profile')
            }
        })
    }
}

export const updatePhotoUser = (req, res) => {

    const foto = req.body.updateUserPhoto

    UserServices.updatePhoto(req.user._id, foto).then(() => {

        // waiting flash msg
        res.redirect('/user/profile')

    }).catch(err => {

        console.log('Erro Interno: ' + err)
        // waiting flash msg
        res.redirect('/user/profile')
    })
}

export const updateRoleUser = (req, res) => {

    UserServices.updateRole(req.user._id).then(() => {

        res.redirect('/user/profile')
        // waiting flash msg

    }).catch(err => {

        console.log('Erro Interno: ' + err)
        // waiting flash msg
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
            // waiting flash msg
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
                // waiting flash msg
                return res.redirect('/user/profile')

            } else if (data.pwdNew == data.pwdOld) {

                console.log('Nova Senha Igual a Atual')
                // waiting flash msg
                return res.redirect('/user/profile')

            } else if (data.pwdNew != data.pwdNewAgain) {

                console.log('Senhas Nova diferentes')
                // waiting flash msg
                return res.redirect('/user/profile')
            }

            bcrypt.hash(data.pwdNew, 10).then(hash => {

                //data.pwdNew = hash

                // call service
                UserServices.updatePwd(req.user._id, hash).then(() => {

                    // waiting flash msg
                    res.redirect('/user/profile')

                }).catch(err => {

                    console.log('Erro Interno: ' + err)
                    // waiting flash msg
                    res.redirect('/user/profile')
                })
            })

        } else {

            console.log('Senha Atual Incorreta')
            // waiting flash msg
            res.redirect('/user/profile')
        }

    })
}