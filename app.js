/* modules import */
import express from "express";
import handlebars from 'express-handlebars'
import { fileURLToPath } from 'url'
import path from 'path'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import passport from 'passport'
import session from 'express-session'
import flash from 'connect-flash'
import dotenv from 'dotenv'

/* app config */
const app = express();

/* files import */
import createAdminIfNotExist from "./helpers/createAdmin.helper.js"

/* handlebars config */
const hdb = handlebars.create({
    helpers: {
        eq: function (a, b) {

            return a === b
        },
        or: function(a, b) {

            return a || b
        }
    },
    defaultLayout: 'main',
    extname: '.hbs'
})

app.engine('hbs', hdb.engine)
app.set('view engine', 'hbs')

/* filename & dirname */
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/* dotenv */
dotenv.config()

/* statics files */
app.use(express.static(path.join(__dirname, 'public')))

/* body parser */
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

/* mongoose config */
const MongoURI = process.env.PORT ? process.env.MONGO_URI_CLOUD : process.env.MONGO_URI_LOCAL
mongoose.connect(MongoURI).then(async () => {

    console.log('MongoDB connected')
    await createAdminIfNotExist()

}).catch(err => { console.log('MongoDB Error: ' + err) })

/* session config */
app.use(session({
    secret: '112358132134',
    resave: true,
    saveUninitialized: true
}))

/* passport config */
import auth from './config/auth.js'
auth(passport)

app.use(passport.initialize())
app.use(passport.session())

/* flash config */
app.use(flash())

/* middlewares */
app.use((req, res, next) => {
    res.locals.info_msg = req.flash('info_msg')
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null
    next()
})

/* external routes import */
import userRoutes from './routes/user/user.route.js'
import adminUsersManagementRoutes from './routes/admin/users.route.js'
import secretariaServicesRoutes from './routes/secretaria/services.route.js'
import estudanteScheduleRoutes from './routes/estudante/schedules.route.js'

/* app controllers import */
import * as appControllers from './controllers/app/app.controller.js'

/* internal routes */
app.get('/', appControllers.home)

app.get('/services', appControllers.readServices)

/* external roues */
app.use('/user', userRoutes)
app.use('/admin', adminUsersManagementRoutes)
app.use('/secretaria', secretariaServicesRoutes)
app.use('/estudante', estudanteScheduleRoutes)

/* server listen */
const PORT = process.env.PORT || 3024
app.listen(PORT, () => {
    console.log(`Server Fly - localhost:${PORT}`)
})