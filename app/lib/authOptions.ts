import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";
import { Session, User } from "next-auth";

// Define custom user type
interface CustomUser extends User {
  avatarUrl?: string; // Remove null to match NextAuth User interface
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter your Email" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { email, password } = credentials;
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          console.log("User not found");
          return null;
        }

        // Ensure user.password is defined and not null before comparison
        if (!user.password) {
          console.log("User password is missing");
          return null; // Handle the case where the password is null
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          console.log("Invalid password");
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          avatarUrl: user.avatarUrl ?? undefined,
        } as CustomUser; // Ensure you return the correct type
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      async profile(profile) {
        // Check if the user exists in the database
        let user = await prisma.user.findUnique({
          where: { email: profile.email },
        });

        // If user doesn't exist, create a new user
        if (!user) {
          user = await prisma.user.create({
            data: {
              name: profile.name,
              email: profile.email,
              avatarUrl: profile.picture, // Use the profile picture from Google
              // Optionally, you can add a default password or other fields
            },
          });
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          avatarUrl: user.avatarUrl ?? undefined,
        } as CustomUser; // Ensure you return the correct type
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: ({ token, user }: { token: JWT; user?: CustomUser }) => { // Specify the types here
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.picture = user.avatarUrl ?? null;
      }
      return token;
    },
    session: ({ session, token }: { session: Session; token: JWT }) => { // Specify the types here
      if (session && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.avatarUrl = token.picture ?? "";
      }
      return session;
    },
  },
};
