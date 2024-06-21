import dbConnect from "@/lib/dbConnect";
import userModel from "@/UserModal/User";
import bcrypt from "bcryptjs"
import { sendVerificationEmail } from "@/utils/sendVerificationEmail";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const { username, email, password } = await await request.json();
        
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