import { Router } from "express";

import { isAuthenticated } from "./middlewares/IsAuthenticated";
import { IsAdmin } from "./middlewares/IsAdmin";

import userRouter from './modules/user/routes'
import tokenJWTRouter from "./authenticate/router/AutheticateUserRouter";

const routers = Router()

routers.use('/user', userRouter)
routers.use('/token', tokenJWTRouter)

export default routers
