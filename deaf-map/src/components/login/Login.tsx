import { signIn } from "next-auth/react";

import "./Login.css";
import LabeledInput from "../LabeledInput/LabeledInput";
import { SignIn, SignOut } from "./auth-components";
import { auth } from "@/lib/auth";

export async function Login() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  //   onAuthStateChanged((u) => {
  //     console.log("Auth State change: " + u?.displayName);
  //   });

  const session = await auth();
  if (!session?.user) return <SignIn />;

  return (
    <div key="login-form-root" className="login-div">
      {/* <form key="Login-form" className="flex flex-col items-center">
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
            signIn("google");
          }}
        >
          Sign-In
        </button>
      </form> */}
      <p>{session.user.name}</p>
      <SignOut></SignOut>
    </div>
  );
}
