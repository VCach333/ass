/* modules import */
import { Router } from 'express'

/* router config */
const router = Router()

/* controller import */
import * as crudControllers from '../../controllers/user/crud.controller.js'
import * as userControllers from '../../controllers/user/user.controller.js'

/* user routes */
router.get('/sign', userControllers.showSign)
router.post('/sign/up', crudControllers.createUser)
router.post('/sign/in', userControllers.signin)
router.post('/sign/out', userControllers.signout)

router.post('/update', crudControllers.updateUser)
router.post('/update/photo', crudControllers.updatePhotoUser)
router.post('/update/role', crudControllers.updateRoleUser)
router.post('/update/pwd', crudControllers.updatePwdUser)

router.get('/profile', userControllers.profile)

export default router