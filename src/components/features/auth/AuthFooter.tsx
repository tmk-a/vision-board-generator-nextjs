"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthFooter() {
  const pathname = usePathname();

  return (
    <>
      {pathname === "/signup" ? (
        <Button asChild variant="secondary" className="px-8">
          <Link href="/login">Back to login</Link>
        </Button>
      ) : (
        <>
          Not a user yet?
          <Button asChild variant="secondary" className="px-8">
            <Link href="/signup">Register Now</Link>
          </Button>
        </>
      )}
    </>
  );
}
