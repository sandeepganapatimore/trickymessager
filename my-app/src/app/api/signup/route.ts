import dbConnect from "@/lib/dbConnect";
import userModel from "@/UserModal/User";
import bcrypt from "bcryptjs"
import { sendVerificationEmail } from "@/utils/sendVerificationEmail";
// new changes
export async function POST(request: Request) {
    await dbConnect();
    try {
        const { username, email, password } = await request.json();
        const existingUserVerifiedByUsername = await userModel.findOne({
            username,
            isVerified: true
        });
        if (existingUserVerifiedByUsername) {
            return Response.json({
                success: false,
                message: "Username is already taken"
            }, { status: 400 })
        }
        const existingUserByEmail = await userModel.findOne({ email });
        const verifyCode = Math.floor(100000 + Math.random() * 90000).toString()
        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return Response.json({
                    success: false,
                    message: "Username aleady exist with this email"
                }, { status: 500 })
            } else {
                const hasedPassword = await bcrypt.hash(password, 10);
                existingUserByEmail.password = hasedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verfyCodeExpiry = new Date(Date.now() + 3600000);
                await existingUserByEmail.save();
            }
            // return true;

        }
        else {
            const hasedPassword = await bcrypt.hash(password, 10);
            const expoiryDate = new Date();
            expoiryDate.setHours(expoiryDate.getDate() + 1);
            const newUser = new userModel({
                username,
                email,
                password: hasedPassword,
                verifyCode: verifyCode,
                verfyCodeExpiry: expoiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                messages: []
            })
            await newUser.save();
        }
        // send verification email
        const emailResponse = await sendVerificationEmail(
            email,
            username,
            verifyCode,
        );
        if (!emailResponse.success) {
            return Response.json({
                success: false,
                message: emailResponse?.message
            }, {
                status: 500

            })

        }
        else {
            return Response.json({
                success: true,
                message: "User regitered successfully.Please verify your email"
            }, {
                status: 201

            })
        }

    } catch (error) {
        console.error("registering user", error)
        return Response.json({
            success: false,
            message: "Error registering the user",

        },
            {
                status: 500
            })
    }
}