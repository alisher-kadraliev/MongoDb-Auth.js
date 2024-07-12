import Link from "next/link"
import { UserAuthForm } from "./UserAuthForm"
import { Button } from "@/components/ui/button"
import bg from '/public/front/bg.jpg'
import { auth } from "@/auth"
import { redirect } from "next/navigation"



export default async function RegisterPage() {
  const session = await auth()
  const user = session?.user
  if (user) redirect('/')
  return (
    <>
      <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Button className="absolute right-4 text-xl top-4 md:right-8 md:top-8" variant={"link"}>
          <Link
            href="/login"
          >
            Log in
          </Link>
        </Button>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-black bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bg.src})` }} />
          <Link href={"/"} className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Acme Inc
          </Link>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full max-lg:h-screen flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email & password below to create your account
              </p>
            </div>
            <UserAuthForm />

          </div>
        </div>
      </div>
    </>
  )
}