import mongoose from 'mongoose'

const {Schema, model} = mongoose

const ScheduleSchema = new Schema({

    student: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    service: {
        type: Schema.Types.ObjectId,
        ref: 'Service'
    },
    year: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    day: {
        type: Number,
        required: true
    },
    hour: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'Pendente',
        enum: ['Pendente', 'Atendida', 'Rejeitada']
    },
    create: {
        type: Date,
        default: Date.now
    }
})

const Schedule = model('Schedule', ScheduleSchema)

export default Schedule