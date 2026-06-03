/* model import */
import Schedule from '../../models/schedule.model.js'

/* services */
export const read = () => {

    return Schedule
        .find()
        .sort({ create: 'desc' })
        .lean()
        .catch(err => console.log(err))
}