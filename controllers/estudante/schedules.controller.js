/* services import */
import * as ScheduleServices from '../../services/estudante/schedules.service.js'
import * as ServiceServices from '../../services/secretaria/services.service.js'

/* controllers */
export const readSchedules = (req, res) => {

    ScheduleServices.read().then(schedules => {
        ServiceServices.read().then(services => {

            // waiting flash msg
            res.render('schedules', { schedules, services })

        }).catch(err => {

            console.log('Erro Interno: ' + err)
            // waiting flash msg
            res.redirect('/user/profile')
        })
    }).catch(err => {

        console.log('Erro Interno: ' + err)
        // waiting flash msg
        res.redirect('/user/profile')
    })
}