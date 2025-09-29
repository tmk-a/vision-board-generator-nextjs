"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { createUserProfile } from "@/services/authService";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // Zod schema
  const loginSchema = z.object({
    email: z.string().email("Email address is not in a valid format."),
    password: z.string().min(8, "Password must be at least 8 characters long."),
  });

  // check form data by schema
  const validatedData = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedData.success) {
    const errorMessages = validatedData.error.issues
      .map((issue) => issue.message)
      .join(", ");
    throw new Error(errorMessages);
  }

  const { error } = await supabase.auth.signInWithPassword(validatedData.data);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // Zod schema
  const signupSchema = z.object({
    email: z.string().email("Email address is not in a valid format."),
    password: z.string().min(8, "Password must be at least 8 characters long."),
  });

  // check form data by schema
  const validatedData = signupSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedData.success) {
    const errorMessages = validatedData.error.issues
      .map((issue) => issue.message)
      .join(", ");
    throw new Error(errorMessages);
  }

  const { data, error } = await supabase.auth.signUp(validatedData.data);

  if (error) {
    throw new Error(error.message);
  }

  // create user profile in supabase
  if (data.user) {
    try {
      const name = formData.get("username") as string;
      await createUserProfile(data.user.id, name);
    } catch (profileError) {
      console.error(profileError);
      throw new Error(
        "Your account was created, but an error occurred while registering your profile."
      );
    }
  }

  if (data.user && !data.user.email_confirmed_at) {
    redirect("/login?message=Please check your email to confirm your account");
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/login");
}

export const getAuthenticatedUser = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  return user;
};

export const getRequiredUserId = async (): Promise<string> => {
  const user = await getAuthenticatedUser();

  if (!user) {
    throw new Error("User not authenticated.");
  }
  return user.id;
};
