/* services import */
import * as appServices from '../../services/app/app.services.js'

export const home = (req, res) => { res.render('home') }

export const readServices = (req, res) => {

    appServices.read().then((services) => {

        res.render('services', { services })

    }).catch(err => {

        console.log('Erro Interno: ' + err)
        req.flash('error_msg', 'Erro Interno')
        res.redirect('/')
    })
}