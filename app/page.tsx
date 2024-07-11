import { auth } from "@/auth";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth()
  // console.log("****", session?.user);
  const user = session?.user
  if (user) redirect('/')
  return (
    <main>
      <Button variant={"link"} ><Link href="/register">Register</Link></Button>
    </main>
  );
}
