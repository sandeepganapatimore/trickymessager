import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail"
import { ApiResponse } from "@/types/ApiResponse";
import { promises } from "dns";

type verificationObj = {
    email: string,
    username: string,
    verifycode: string
}
export async function sendVerificationEmail(
    email: string,
    username: string,
    verifycode: string

): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Email Verification',
            react: VerificationEmail({ username, otp: verifycode }),
        });
        return {
            success: true,
            message: "Verification email send successfully"
        }
    } catch (emailError) {
        console.error("error sending verification email", emailError)
        return {
            success: false,
            message: "Failed to send verification email"
        }
    }
}