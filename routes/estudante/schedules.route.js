/* modules import */
import {Router} from 'express'

/* router config */
const router = Router()

/* controllers import */
import * as ScheduleControllers from '../../controllers/estudante/schedules.controller.js'

/* schedule routes */
router.get('/schedules/read', ScheduleControllers.readSchedules)
router.post('/schedules/create', ScheduleControllers.createSchedule)

export default router