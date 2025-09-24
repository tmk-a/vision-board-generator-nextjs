"use client";

import { CardContent } from "@/components/ui/card";
import { LoginForm } from "../../../components/features/auth/LoginForm";
import { AuthFormHeader } from "../../../components/features/auth/AuthFormHeader";
import { useSearchParams } from "next/navigation";

const LoginPage = () => {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  return (
    <div className="flex flex-col gap-4">
      <AuthFormHeader
        title="Login to your account"
        linkName="Sign Up"
        url="/signup"
      />
      {message && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {message}
        </div>
      )}
      <CardContent>
        <LoginForm />
      </CardContent>
    </div>
  );
};

export default LoginPage;
