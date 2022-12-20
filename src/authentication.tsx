import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
type Props = {};

export default function authentication({}: Props) {
  // state for signup email and password
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  // authentication submit function
  function handleAuth(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
      .then((cred) => {
        // console.log("user created:", cred.user);
      })
      .catch((err) => {
        console.log(err);
      });
    // reset states
    setSignupEmail("");
    setSignupPassword("");
  }

  // state for login email and password
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // login submit function
  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((cred) => {
        // console.log("user logged in:", cred.user);
      })
      .catch((err) => {
        console.log(err);
      });
    // reset states
    setLoginEmail("");
    setLoginPassword("");
  }

  // logout submit function
  function handleLogout() {
    signOut(auth)
      .then(() => {
        // console.log("user signed out");
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  useEffect(() => {
    // subscribing to auth changes
    return onAuthStateChanged(auth, (user) => {
      console.log("user state changed:", user);
    });
  }, []);

  // const unsubAuth = onAuthStateChanged(auth, (user) => {
  //   console.log("user state changed:", user);
  // });



  return (
    <>
      <h2>Firebase Auth</h2>
      <form className="signup" onSubmit={handleAuth}>
        <label htmlFor="email">email:</label>
        <input
          type="email"
          name="email"
          value={signupEmail}
          onChange={(data) => setSignupEmail(data.target.value)}
        />
        <label htmlFor="password">password:</label>
        <input
          type="password"
          name="password"
          value={signupPassword}
          onChange={(data) => setSignupPassword(data.target.value)}
        />
        <button>signup</button>
      </form>

      <form className="login" onSubmit={handleLogin}>
        <label htmlFor="email">email:</label>
        <input
          type="email"
          name="email"
          value={loginEmail}
          onChange={(data) => setLoginEmail(data.target.value)}
        />
        <label htmlFor="password">password:</label>
        <input
          type="password"
          name="password"
          value={loginPassword}
          onChange={(data) => setLoginPassword(data.target.value)}
        />
        <button>login</button>
      </form>

      <button className="logout" onClick={handleLogout}>
        logout
      </button>
    </>
  );
}
