/* modules import */
import { Router } from 'express'

/* router config */
const router = Router()

/* controller import */
import * as ScheduleControllers from '../../controllers/secretaria/schedules.controller.js'

/* secretaria routes */
router.get('/schedules/read', ScheduleControllers.readSchedules)
router.post('/schedules/update/status/:id/:status', ScheduleControllers.updateStatusSchedule)

export default router