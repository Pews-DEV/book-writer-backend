import { Router } from "express";

import { isAuthenticated } from "./middlewares/IsAuthenticated";
import { IsAdmin } from "./middlewares/IsAdmin";

import userRouter from './user/router/UserRouters'
import tokenJWTRouter from "./authenticate/router/AutheticateUserRouter";

const routers = Router()

routers.use('/user', isAuthenticated, IsAdmin, userRouter)
routers.use('/token', tokenJWTRouter)

export default routers