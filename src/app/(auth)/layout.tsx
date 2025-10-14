import { Card } from "@/components/ui/card";
import AuthFooter from "../../components/features/auth/AuthFooter";
import { Suspense } from "react";
import { getAuthenticatedUser } from "../(auth)/action";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthenticatedUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col items-center h-screen md:max-h-180">
      <div className="w-full px-6 max-w-md my-auto flex flex-col items-center gap-4">
        <Suspense>
          <Card className="w-full max-w-sm">{children}</Card>
        </Suspense>
        <div className="flex gap-4 items-center text-sm">
          <AuthFooter />
        </div>
      </div>
    </div>
  );
}
