/* service import */
import * as UsersManagerServices from '../../services/admin/users.service.js'

/* controllers */
export const readUsers = (req, res) => {

    const role = req.params.role

    UsersManagerServices.read(role).then((users) => {

        res.render('admin/users', { users, role })

    }).catch(err => {

        console.log('Erro Interno: ' + err)
        req.flash('error_msg', 'Erro Interno')
        res.redirect(`/admin/users#users-content--${role}`)
    })
}

export const blockUser = (req, res) => {

    const id = req.params.id

    UsersManagerServices.block(id).then(() => {


        req.flash('info_msg', 'Usuário Bloqueado') /* use role */
        res.redirect(`/admin/users#user-content--${id}`)

    }).catch(err => {

        console.log('Erro Interno: ' + err)
        req.flash('error_msg', 'Erro Interno')
        res.redirect(`/admin/users#user-content--${id}`)
    })
}

export const unblockUser = (req, res) => {

    const id = req.params.id

    UsersManagerServices.unblock(id).then(() => {

        req.flash('info_msg', 'Usuário Desbloqueado')
        res.redirect(`/admin/users#user-content--${id}`)

    }).catch(err => {

        console.log('Erro Interno: ' + err)
        req.flash('error_msg', 'Erro Interno')
        res.redirect(`/admin/users#user-content--${id}`)
    })
}

export const updateRoleUser = (req, res) => {

    const id = req.params.id
    const role = req.body.updateUserRole

    // enum: ['Usuário', 'Estudante', 'Secretária', 'Administrador'],

    if (role == 'Usuário' || role == 'Estudante' || role == 'Secretária' || role == 'Administrador') {

        UsersManagerServices.updateRole(id, role).then(() => {

            req.flash('info_msg', 'Privilégio Atualizado')
            res.redirect(`/admin/users#user-content--${id}`)

        }).catch(err => {

            console.log('Erro interno: ' + err)
            req.flash('error_msg', 'Erro Interno')
            res.redirect(`/admin/users#user-content--${id}`)
        })

    } else {

        req.flash('error_msg', 'Privilégio Incorreto')
        res.redirect(`/admin/users#user-content--${id}`)
    }
}

export const deleteUser = (req, res) => {

    const id = req.params.id
    const role = req.params.role

    UsersManagerServices.delet(id).then(() => {

        req.flash('success_msg', 'Usuário Deletado') /* use role */
        res.redirect(`/admin/users/read/${role}`)

    }).catch(err => {

        console.log('Erro Interno: ' + err)
        req.flash('error_msg', 'Erro Interno')
        res.redirect(`/admin/users/read/${role}`)
    })
}