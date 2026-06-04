/* model import */
import Schedule from '../../models/schedule.model.js'

/* services */
export const read = () => {

    return Schedule
        .find({status: 'Pendente'})
        .sort({ create: 'desc' })
        .populate('student')
        .populate('service')
        .lean()
        .catch(err => console.log(err))
}

export const updateStatus = (id, status) => {

    return Schedule.findByIdAndUpdate(

        { _id: id },
        { $set: { status: status } }

    ).then(() => {

        console.log(`Marcação ${status}`)

    }).catch(err => console.log(err))
}