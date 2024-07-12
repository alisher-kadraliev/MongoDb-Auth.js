import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import connect from "./lib/db";
import { User } from "./models/User";
import { compare } from "bcryptjs";
import Google from "next-auth/providers/google"
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "email" },
                password: { label: "password", type: "password" },
            },
            authorize: async (Credentials) => {
                const email = Credentials.email as string | undefined;
                const password = Credentials.password as string | undefined;
                if (!email || !password) {
                    throw new CredentialsSignin("All fields are required");
                }

                await connect()
                const user = await User.findOne({ email }).select("+password + role")

                if (!user) {
                    throw new Error("Invalid credentials")
                }
                if (!user.password) {
                    throw new Error("Invalid password")
                }

                const isMatch = await compare(password, user.password)

                if (!isMatch) {
                    throw new Error("password mismatch")
                }

                const userData = {
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    id: user._id
                }

                return userData
            },
        })
    ],
    pages: {
        signIn: "/login"
    },
    callbacks: {
        async session({ session, token }: any) {
            if (token?.sub && token?.role) {
                session.user.id = token.sub;
                session.user.role = token.role
            }
            return session
        },
        async jwt({ token, user }: any) {
            if (user) {
                token.role = user.role
            }
            return token
        },
        signIn: async ({ user, account }) => {
            if (account?.provider === 'google') {
                try {
                    const { email, name, image, id } = user
                    await connect()
                    const alreadyUser = await User.findOne({ email })
                    if (!alreadyUser) {
                        await User.create({ email, image, name, authProviderId: id })
                    } else {
                        return true
                    }
                } catch (error) {
                    throw new Error("Error while signing in")
                }
            }
            if (account?.provider === "credentials") {
                return true
            } else {
                return false
            }
        }
    }
})