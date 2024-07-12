import { Button } from "@/components/ui/button";
import Link from "next/link";
export default async function Home() {
  return (
    <main>
      <Button variant={"link"} ><Link href="/register">Register</Link></Button>
    </main>
  );
}
