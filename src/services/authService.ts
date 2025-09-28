import { prisma } from "@/lib/prisma";

export const createUserProfile = async (userId: string, name: string) => {
  try {
    const user = await prisma.user.create({
      data: {
        id: userId,
        name,
      },
    });
    return user;
  } catch (e) {
    console.error("Failed to create user profile:", e);
    throw new Error("Failed to create user profile");
  }
};

export const getUserProfileById = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    return user;
  } catch (e) {
    console.error("Failed to fetch user profile:", e);
    throw new Error("Failed to fetch user profile");
  }
};
