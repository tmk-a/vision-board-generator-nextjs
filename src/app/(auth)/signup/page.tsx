"use client";

import { CardContent } from "@/components/ui/card";
import { SignUpForm } from "../../../components/features/auth/SignUpForm";
import { AuthFormHeader } from "../../../components/features/auth/AuthFormHeader";

const SignUpPage = () => {
  return (
    <>
      <AuthFormHeader
        title="Sign Up to your account"
        linkName="Login"
        url="/login"
      />
      <CardContent>
        <SignUpForm />
      </CardContent>
    </>
  );
};

export default SignUpPage;
