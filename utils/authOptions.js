import {connect} from "./config/dbConfig"
import User from "../models/User"
import NextAuth, {NextAuthOptions} from "next-auth"
import  CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
export const authOptions = {
    // Configure one or more authentication providers
    providers: [
      CredentialsProvider({
        id: "credentials",
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          await connect();
          try {
            const user = await User.findOne({ email: credentials.email });
            if (user) {
              const isPasswordCorrect = await bcrypt.compare(
                credentials.password,
                user.password
              );
              if (isPasswordCorrect) {
                return user;
              }
            }
          } catch (err) {
            throw new Error(err);
          }
        },
      }),
      // GithubProvider({
      //   clientId: process.env.GITHUB_ID ?? "",
      //   clientSecret: process.env.GITHUB_SECRET ?? "",
      // }),
      // ...add more providers here
    ],
    callbacks: {
      async signIn({ user, account }) {
        console.log(account,"the account")
        if (account?.provider == "credentials") {
          return user;
        }
        // if (account?.provider == "github") {
        //   await connect();
        //   try {
        //     const existingUser = await User.findOne({ email: user.email });
        //     if (!existingUser) {
        //       const newUser = new User({
        //         email: user.email,
        //       });
  
        //       await newUser.save();
        //       return true;
        //     }
        //     return true;
        //   } catch (err) {
        //     console.log("Error saving user", err);
        //     return false;
        //   }
        // }
      },
    },
  };