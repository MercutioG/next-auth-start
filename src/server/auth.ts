import {
  getServerSession, type NextAuthOptions,
} from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { userService } from './services/userService';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt', // The default strategy is JWT when no adapter is defined, we redefined it here to make it obvious what strategy to use
  },
  callbacks: {
    async jwt({token, account, profile}){
      //This is where you want to store the userID in the User object. The id is coming from the authorize callback and is available in the account parameter when the type is 'credentials'. This is where you can also add additional information to the from database or external APIs
      console.log("-----------------------------JWT-----------------------------")
      console.log({token}, {account}, {profile})
      if(account && account.type === 'credentials'){
        token.userID = account.providerAccountId
        // This ID that is coming from authorize() callback
      }
      return token;
    },
    async session({session, token, user}){
      // After the token is created in JWT call back we need to apss the userID to the user.id so it will be available to the UI
      // Because the user
      console.log("-----------------------------Session-----------------------------")
      console.log({session}, {token}, {user})
      session.user.id = token.userId
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials as {
          username: string,
          password: string
        };
        
        return userService.authenticate(username, password)
        // Here we authenticate the usernames and password
      }
    })
  ]
}

export const getServerAuthSession = () => getServerSession(authOptions);