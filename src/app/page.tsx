import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 p-4">
      <h1 className="text-9xl font-extrabold text-indigo-600 tracking-wider">
        Find Your Vision!
      </h1>

      <p className="text-2xl md:text-3xl font-semibold mt-4 mb-2">
        Vision Board Generator
      </p>

      <p className="text-lg text-gray-600 mb-8 text-center">
        Through answering questions, you can find your own word and image
      </p>

      <Button asChild>
        <Link href={"/login"}>Get Stared</Link>
      </Button>
    </div>
  );
}
