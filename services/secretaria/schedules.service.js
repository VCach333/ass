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

export const updateStatus = (data) => {

    return Schedule.findByIdAndUpdate(

        { _id: data.id },
        { $set: { status: data.status } }

    ).then(() => {

        console.log(`Marcação ${data.status}`)

    }).catch(err => console.log(err))
}