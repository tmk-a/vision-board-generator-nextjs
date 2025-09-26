"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signup } from "../../../app/(auth)/action";

export function SignUpForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignupSubmit = async (formData: FormData) => {
    setErrorMessage(null);

    const email = formData.get("email") as string;
    const password = formData.get("password");

    // validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setErrorMessage("Email address is not in a valid format.");
      return;
    }

    if (!password || String(password).length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    await signup(formData);
  };

  return (
    <CardContent>
      <form action={handleSignupSubmit} className="flex flex-col gap-4">
        {errorMessage && (
          <div className="text-red-600 text-sm">{errorMessage}</div>
        )}
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="username">Name</Label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="John Doe"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <a
                href="#"
                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
              ></a>
            </div>
            <Input id="password" name="password" type="password" required />
          </div>
        </div>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
          <Button variant="outline" className="w-full">
            Sign Up with Google
          </Button>
        </CardFooter>
      </form>
    </CardContent>
  );
}
