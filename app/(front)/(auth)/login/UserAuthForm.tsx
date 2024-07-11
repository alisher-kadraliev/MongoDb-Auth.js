"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FcGoogle } from "react-icons/fc";
import { FiRefreshCcw } from "react-icons/fi";
import { useRouter } from "next/navigation"
import { signIn } from 'next-auth/react';


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [message, setMessage] = React.useState<{ text: string, type: 'success' | 'error' } | null>(null);
    const [errors, setErrors] = React.useState({
        email: "",
        password: "",
    });
    const router = useRouter()


    const validateForm = () => {
        let valid = true;
        let newErrors = { email: "", password: "" };

        if (!email) {
            newErrors.email = "Email is required";
            valid = false;
        }
        if (!password) {
            newErrors.password = "Password is required";
            valid = false;
        } else if (password.length < 8) {
            newErrors.password = "At least 8 characters long";
            valid = false;
        }
        setErrors(newErrors);
        return valid;
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const req = await signIn('credentials', {
            redirect: false,
            email,
            password,
            providers: ['google'], // You can add more providers here
        });

        setMessage(null)
        if (!validateForm()) {
            return
        }
        setIsLoading(true)
        if (req?.error) {
            setMessage({ text: "Wrong email or password", type: 'error' });
            setIsLoading(false)

        } else {
            setMessage({ text: "Successfully logged in", type: 'success' })
            setTimeout(() => {
                // router.push("/")
            }, 3000)
            setIsLoading(false)
        }

    }
    const handleGoogleSignIn = () => {
        signIn("google", { callbackUrl: "/" });
    };
    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={onSubmit}>
                <div className="grid gap-4">
                    <div className="grid gap-4">

                        <div className="gap-1 flex flex-col">
                            <div className="flex gap-2 items-end">
                                <label className="font-bold">Email </label>
                                <span>    {errors.email && <p className="bg-destructive/15 p-1 rounded-md flex items-center gap-x-2 text-sm text-destructive">{errors.email}</p>}</span>
                            </div>
                            <Input
                                placeholder="name@example.com"
                                type="email"
                                disabled={isLoading}
                                value={email}
                                autoComplete="true"
                                onChange={e => setEmail(e.target.value)}
                            />

                        </div>
                        <div className="gap-1 flex flex-col">
                            <div className="flex gap-2 items-end">
                                <label className="font-bold">Password </label>
                                <span>    {errors.password && <p className="bg-destructive/15 p-1 rounded-md flex items-center gap-x-2 text-sm text-destructive">{errors.password}</p>}</span>
                            </div>
                            <Input
                                placeholder="********"
                                type="password"
                                autoCapitalize="none"
                                autoComplete="off"
                                autoCorrect="off"
                                disabled={isLoading}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />

                        </div>
                    </div>
                    {message && <div className={message.type === 'error' ? "bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive" : "bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-900"}>{message.text}</div>}
                    <Button disabled={isLoading} type="submit">
                        {isLoading && (
                            <FiRefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Log in
                    </Button>
                </div>
            </form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>
            <Button onClick={handleGoogleSignIn} variant="outline" type="button" disabled={isLoading}>
                <FcGoogle className="mr-2 h-6 w-6" />
                Google
            </Button>
        </div>
    )
}