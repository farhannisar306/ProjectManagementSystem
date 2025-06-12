import { base_url, frontend_port } from "../../config/config";
import { mailSender } from "../lib/mail-services";
import { HTTPResponse } from "./HTTPResponseHandler";
import { createMailActivationToken } from "./token-manager";

export const sendActivationMail = (email:string) => {
    const response = new HTTPResponse(Response);
    createMailActivationToken({
        email: email,
    }, {
        algorithm: 'HS256',
        expiresIn: '15m'
    }).then((mailToken) => {
        try {
            
            mailSender({
                email: email,
                subject: "Verify Your Account - Project Management System",
                message: `
              Hello,
              
              Thank you for signing up for our Project Management System.
              
              Please verify your email address by clicking the link below:
              
            ${base_url}:${frontend_port}/auth/verify-email/${mailToken}
              
              This link will expire in 5 minutes.
              
              If you did not request this, please ignore this email.
              
              Best regards,  
              Project Management Team
              `
            });
        } catch (error) {
            return response.internalServerError("Internal server error");
        }
    })
}