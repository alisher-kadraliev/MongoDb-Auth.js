import connect from "@/lib/db"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { User } from "@/models/User"

export const POST = async (req: Request) => {
    try {
        const body = await req.json()
        if (!body.username || !body.email || !body.password) {
            return new NextResponse(JSON.stringify({ message: "All fields are required" }), { status: 400 });
        }
        await connect()
        const existingUser = await User.findOne({ email: body.email })
        if (existingUser)
        {
            return new NextResponse(JSON.stringify({ message: "Email already exists" }), { status: 400 });
        }
        const hashedPassword = await bcrypt.hash(body.password, 10)
        const newUser = new User({
            username: body.username,
            email: body.email,
            password: hashedPassword
        })

        await newUser.save()
        return new NextResponse(JSON.stringify({ message: "We send verification to your email", user: newUser }), { status: 200 });
    } catch (error) {
        return new NextResponse("Fail register")
    }
}