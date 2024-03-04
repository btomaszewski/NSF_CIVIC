"use client";
import { useState } from "react";
import { SignIn, onAuthStateChanged } from "@/lib/Firebase/Authentication";

import "./Login.css";
import LabeledInput from "../LabeledInput/LabeledInput";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   onAuthStateChanged((u) => {
  //     console.log("Auth State change: " + u?.displayName);
  //   });

  return (
    <div key="login-form-root" className="login-div">
      <form key="Login-form" className="flex flex-col items-center">
        <LabeledInput
          label="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></LabeledInput>
        <LabeledInput
          label="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button
          className="sign-in-button"
          onClick={(e) => {
            e.preventDefault();
            SignIn(email, password);
          }}
        >
          Sign-In
        </button>
      </form>
    </div>
  );
}
