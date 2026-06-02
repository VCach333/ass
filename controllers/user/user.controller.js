/* modules import */
import passport from 'passport'
//import bcrypt from 'bcryptjs'

/* services import */
import * as AppServices from '../../services/app/app.services.js'

/* controllers */
export const showSign = (req, res) => {

    res.render('user/sign')
}

export const signin = (req, res, next) => {

    passport.authenticate('local', {
        successRedirect: '/user/profile',
        failureRedirect: '/user/sign?action=in',
        failureFlash: true
    })(req, res, next)
}

export const signout = (req, res) => {

    req.logout(err => {

        if(err) {

            console.log('Erro Interno: ' + err)
            res.redirect('/user/profile')

        } else {

            // waiting flash msg
            res.redirect('/user/sign?action=in')
        }
    })
}

export const profile = (req, res) => {

    AppServices.read().then(services => {

        res.render('user/profile', {services})

    }).catch(err => {
        console.log('Erro Interno: ' + err)
        // waitinhg flash msg
        res.redirect('/')
    })

}