import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

interface User {
  id: string;
  token: string;
}

interface Token {
  id: string;
  accessToken: string;
}

interface Session {
  user: Token;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "tavitter-login",
      name: "Tavitter",
      credentials: {},
      async authorize(credentials, req) {
        let data = {
          email: req.body?.email,
          password: req.body?.password,
        };
        try {
          const response = await axios.post(
            "http://localhost:80/user/login",
            data
          );
          if (response.data.status) {
            throw new Error(response.data.msg);
          }
          return response.data;
        } catch (error) {
          throw new Error("invalid username or password");
        }
      },
    }),
    CredentialsProvider({
      id: "tavitter-signup",
      name: "Tavitter",
      credentials: {},
      async authorize(credentials, req) {
        let data = {
          username: req.body?.username,
          email: req.body?.email,
          password: req.body?.password,
          phone: req.body?.phone,
        };
        try {
          const response = await axios.post(
            "http://localhost:80/user/signup",
            data
          );
          if (response.data.status) {
            throw new Error(response.data.msg);
          }
          return response.data;
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
        }
      },
    }),
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async session({ session, token }: { session: Session; token: Token }) {
      session.user.id = token.id;
      session.user.accessToken = token.accessToken;
      return session;
    },
    async jwt({ token, user }: { token: Token; user: User }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.token;
      }
      return token;
    },
  },
};
export default NextAuth(authOptions);
