import { Card } from "@/components/ui/card";
import AuthFooter from "../../components/features/auth/AuthFooter";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center h-screen md:max-h-180">
      <div className="w-full px-6 max-w-md my-auto flex flex-col items-center gap-4">
        <Card className="w-full max-w-sm">{children}</Card>
        <div className="flex gap-4 items-center text-sm">
          <AuthFooter />
        </div>
      </div>
    </div>
  );
}
