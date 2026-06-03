/* service import */
import * as ScheduleServices from '../../services/secretaria/schedules.service.js'

/* controllers */
export const readSchedules = (req, res) => {

    ScheduleServices.read().then(() => {

        res.render('secretaria/schedules')

    }).catch(err => {

        console.log('Erro Interno: ' + err)
        req.flash('error_msg', 'Erro Interno')
        res.redirect('/user/profile')
    })
}