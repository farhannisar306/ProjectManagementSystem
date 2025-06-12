import { Router } from "express"
import { isAuthenticate } from "../../middlewares/isAuthenticated"
import { authController } from "./auth.controller"
import { userLoginSchema } from "./auth.validate"
import { validate } from "../../middlewares/validate"
import passport from "passport"
const authRouter = Router()

//to get the user object based on a bearer token
authRouter.get('/getAuthenticatedUser', isAuthenticate, authController.getAuthenticatedUser)

//to get a new access token for authentication purposes
authRouter.get('/refresh', authController.refreshAuth)

// to resend the activation mail
authRouter.get('/resend-activation-mail/:expiredToken', authController.resendActivationMail)

// to verify the email by decoding the token sent as a query param
authRouter.post('/verify-email/:token', authController.verifyEmailToken)



//OAuth endpoints
authRouter.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }))
authRouter.get('/google/callback', authController.googleAuthCallback)

authRouter.get('/github', passport.authenticate('google', { scope: ['email', 'profile'] }))
authRouter.get('/github/callback', authController.googleAuthCallback)


//to login the user
authRouter.post('/login', validate(userLoginSchema), authController.loginUser);

export default authRouter;