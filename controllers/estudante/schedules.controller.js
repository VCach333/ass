/* services import */
import * as ScheduleServices from '../../services/estudante/schedules.service.js'
import * as ServiceServices from '../../services/secretaria/services.service.js'

/* controllers */
export const readSchedules = (req, res) => {

    ScheduleServices.read().then(schedules => {
        ServiceServices.read().then(services => {

            res.render('schedules', { schedules, services })

        }).catch(err => {

            console.log('Erro Interno: ' + err)
            req.flash('error_msg', 'Erro Interno')
            res.redirect('/user/profile')
        })
    }).catch(err => {

        console.log('Erro Interno: ' + err)
        req.flash('error_msg', 'Erro Interno')
        res.redirect('/user/profile')
    })
}

export const createSchedule = (req, res) => {

    const data = {
        student: req.user._id,
        service: req.body.createScheduleService,
        year: new Date().getFullYear(),
        month: req.body.createScheduleMonth,
        day: req.body.createScheduleDay,
        hour: req.body.createScheduleHour
    }

    ScheduleServices.create(data).then(() => {

        req.flash('success_msg', 'Marcação Cadastrada')
        res.redirect('/estudante/schedules/read')

    }).catch(err => {

        console.log('Erro Interno: ' + err)
        req.flash('error_msg', 'Erro Interno')
        res.redirect('/estudante/schedules/read')
    })
}