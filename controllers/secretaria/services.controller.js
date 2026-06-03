/* service import */
import * as servicesService from '../../services/secretaria/services.service.js'

/* controller */
export const readServices = (req, res) => {

    servicesService.read().then((services) => {

        res.render('services', { services })

    }).catch(err => {

        console.log('Erro Interno: ' + err)
        req.flash('error_msg', 'Erro Interno')
        res.redirect('/user/profile')
    })
}

export const createService = (req, res) => {

    const data = {
        title: req.body.createServiceTitle,
        price: req.body.createServicePrice,
        duraction: req.body.createServiceDuraction,
        status: req.body.createServiceStatus
    }

    servicesService.create(data).then(() => {

        req.flash('success_msg', 'Serviço Cadastrado')
        res.redirect('/secretaria/services/read')

    }).catch(err => {

        console.log('Erro Interno: ' + err)
        req.flash('error_msg', 'Erro Interno')
        res.redirect('/secretaria/services/read')
    })
}

export const deleteService = (req, res) => {

    servicesService.delet(req.params.id).then(() => {

        req.flash('success_msg', 'Serviço Deletado')
        res.redirect('/secretaria/services/read')

    }).catch(err => {

        console.log('Erro Interno: ' + err)
        req.flash('error_msg', 'Erro Interno')
        res.redirect('/secretaria/services/read')
    })
}

export const updateStatusService = (req, res) => {

    const { id, status } = req.params

    servicesService.updateStatus(id, status).then(() => {

        req.flash('info_msg', 'Serviço Arquivado')
        res.redirect('/secretaria/services/read')

    }).catch(err => {

        console.log('Erro Interno: ' + err)
        req.flash('error_msg', 'Erro Interno')
        res.redirect('/secretaria/services/read')
    })
}