import { Router } from "express";

import AuthenticateUserController from "../controller/AuthenticateUserController";

const tokenJWTRouter = Router()

const autheticateUserController = new AuthenticateUserController()
tokenJWTRouter.post('/login', autheticateUserController.handleLogin)

export default tokenJWTRouter
