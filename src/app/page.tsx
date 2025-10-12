import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="text-red-500">Let's Find To Your Vision!</h1>
      <Button asChild>
        <Link href={"/login"}>Login</Link>
      </Button>
    </div>
  );
}
