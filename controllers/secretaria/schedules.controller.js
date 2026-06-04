/* service import */
import * as ScheduleServices from '../../services/secretaria/schedules.service.js'
import * as PaymentServices from '../../services/secretaria/payment.service.js'

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

    const { id, status } = req.body

    const dataSchedule = {
        id: req.body.updateScheduleId,
        status: req.body.updateScheduleStatus
    }

    const dataPayment = {
        employer: req.user._id,
        student: req.body.updateScheduleStudent,
        service: req.body.updateScheduleService
    }

    ScheduleServices.updateStatus(dataSchedule).then(() => {

        if (dataSchedule.status == 'Atendida') {

            PaymentServices.create(dataPayment).then(() => {

                req.flash('info_msg', `Marcação ${dataSchedule.status}`)
                res.redirect('/secretaria/schedules/read')

            }).catch(err => {

                console.log('Erro Interno: ' + err)
                req.flash('error_msg', 'Erro Interno')
                res.redirect('/secretaria/schedules/read')
            })

        } else {
            req.flash('info_msg', `Marcação ${dataSchedule.status}`)
            res.redirect('/secretaria/schedules/read')
        }
    }).catch(err => {

        console.log('Erro Interno: ' + err)
        req.flash('error_msg', 'Erro Interno')
        res.redirect('/secretaria/schedules/read')
    })
}