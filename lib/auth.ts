import NextAuth, { type DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const LOGIN_URL =
  (process.env.BACKEND_URL || "") + (process.env.LOGIN_URL || "");

declare module "next-auth" {
  interface User {
    accessToken?: string;
  }
  interface Session {
    accessToken?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const bodydata = new URLSearchParams();
        /*bodydata.append("username", 
          typeof credentials.username === "string" ? credentials.username : "");
        bodydata.append("password", 
          typeof credentials.password === "string" ? credentials.password : "");
        bodydata.append("grant_type", "password");*/

        bodydata.append("username", process.env.DEMO_USERNAME || "");
        bodydata.append("password", process.env.DEMO_PASSWORD || "");

        console.log("Body Data ::: ", bodydata.toString());
        try {
          const res = await axios.post(LOGIN_URL, bodydata, {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          });

          const data = res.data;

          if (data && data.access_token) {
            return {
              id:
                typeof credentials?.username === "string"
                  ? credentials.username
                  : "",
              name:
                typeof credentials?.username === "string"
                  ? credentials.username
                  : "",
              email:
                typeof credentials?.username === "string"
                  ? credentials.username
                  : "",
              accessToken: data.access_token,
            };
          }

          return null;
        } catch (error) {
          console.error("Error during authorization:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken =
          typeof token.accessToken === "string" ? token.accessToken : "";
      }
      return session;
    },
    /*async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return Response.redirect(new URL("/login", nextUrl)); // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },*/
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 60, // 30 mins
  },
});
