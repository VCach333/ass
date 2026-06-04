/* service import */
import * as ScheduleServices from '../../services/secretaria/schedules.service.js'

/* controllers */
export const readSchedules = (req, res) => {

    ScheduleServices.read().then(schedules => {

        res.render('secretaria/schedules', { schedules })

    }).catch(err => {

        console.log('Erro Interno: ' + err)
        req.flash('error_msg', 'Erro Interno')
        res.redirect('/user/profile')
    })
}

export const updateStatusSchedule = (req, res) => {

    const {id, status} = req.params

    ScheduleServices.updateStatus(id, status).then(() => {

        req.flash('info_msg', `Marcação ${status}`)
        res.redirect('/secretaria/schedules/read')

    }).catch(err => {

        console.log('Erro Interno: ' + err)
        req.flash('error_msg', 'Erro Interno')
        res.redirect('/secretaria/schedules/read')
    })
}