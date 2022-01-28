import { createContext, useEffect, useState } from "react";
import {
  auth,
  googleProvider,
  githubProvider,
} from "../service/firebase-config";

import { signInWithPopup, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export const AuthContext = createContext({});

export function AuthContextProvider(props) {
  const roteamento = useRouter();
  const [user, setUser] = useState({});

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (auth.currentUser) {
        const { displayName, photoURL, uid } = user;

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function SignIn(provider) {
    if (auth.currentUser) {
      roteamento.push("/chat");
      return;
    }

    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        const { displayName, photoURL } = user;

        console.log(user);

        setUser({
          name: displayName,
          avatar: photoURL,
        });

        console.log(user);
      }
    } catch (e) {
      toast.error("Login failure");
      console.log(e);
      return;
    }

    roteamento.push("/chat");
  }

  function SignInWithGoogle() {
    SignIn(googleProvider);
  }

  async function SignInWithGithub() {
    if (auth.currentUser) {
      roteamento.push("/chat");
      return;
    }

    try {
      const result = await signInWithPopup(auth, githubProvider);
      if (result.user) {
        // const { displayName, photoURL } = user;

        // setUser({
        //   name: displayName,
        //   avatar: photoURL,
        // });
      }
    } catch (e) {
      toast.error("Login failure");
      console.log(e);
      return;
    }

    roteamento.push("/chat");
  }

  async function ExitAccount() {
    try {
      const signOutPromisse = await signOut(auth);
      roteamento.push("/");
    } catch (er) {
      toast.error("Deu ruim!");
    }
  }

  return (
    <AuthContext.Provider
      value={{ SignInWithGoogle, SignInWithGithub, user, ExitAccount }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
