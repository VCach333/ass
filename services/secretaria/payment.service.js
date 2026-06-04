/* model import */
import Payment from '../../models/payment.model.js'

/* services */
export const create = (data) => {

    return new Payment(data).save().then(() => {

        console.log('Pagamento Cadastrado')

    }).catch(err => console.log(err))
}