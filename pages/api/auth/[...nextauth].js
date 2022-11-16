import { compare } from "bcryptjs";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import client from "../../../utils/client";
import { findUserQuery } from "../../../utils/queries";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        //Check user existance
        const query = findUserQuery(credentials.email);
        const user = await client.fetch(query);

        if (!user) {
          throw new Error("Invalid Credentials");
        }
        const checkPassword = await compare(
          credentials.password,
          user.password
        );
        //incorrect password
        if (!checkPassword || user.email !== credentials.email) {
          throw new Error("Invalid credentials");
        }
        return user;
      },
    }),
  ],
  //Stack overflow solution
  //If no callback used.. useSession resturn user object with only name and email... we required role also.
  callbacks: {
    jwt: async ({ token, user }) => {
      //  "user" parameter is the object received from "authorize"
      //  "token" is being send below to "session" callback...
      //  ...so we set "user" param of "token" to object from "authorize"...
      //  ...and return it...
      if (user) {
        token.user = {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      }
      console.log(token.user);

      return token;
    },
    session: async ({ session, token }) => {
      //  "session" is current session object
      //  below we set "user" param of "session" to value received from "jwt" callback
      session.user = token.user;
      return session;
    },
  },
});
