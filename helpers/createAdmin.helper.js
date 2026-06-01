/* module import */
import bcrypt from 'bcryptjs'

/* model import */
import User from '../models/user.model.js'

async function createAdminIfNotExist() {

    await User.findOne({role: 'Administrador'}).then(async admin => {

        if(!admin) {
            
            const adminData = {
                name: 'Administrador do Sistema',
                tel: '923100100',
                role: 'Administrador',
            }

            const pwdHash = await bcrypt.hash(process.env.ADMIN_PWD, 10)

            adminData.pwd = pwdHash

            new User(adminData).save().then(() => {

                console.log('Admin created')

            }).catch(err => console.log('Erro Interno: ' + err))
        }

    }).catch(err => console.log('Erro Interno: ' + err))
}

export default createAdminIfNotExist