import { auth } from "@/lib/Firebase/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged as _onAuthStateChange,
  NextOrObserver,
  User,
} from "firebase/auth";

export function onAuthStateChanged(cb: NextOrObserver<User>) {
  return _onAuthStateChange(auth, cb);
}

export async function CreateUser(email: string, password: string) {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCreds) => {
      console.log(`New User ${userCreds.user.email}`);
    })
    .catch((error) => {
      console.log(`Create User Error(${error.code}): ${error.message}`);
    });
}

export async function SignIn(email: string, password: string) {
  await signInWithEmailAndPassword(auth, email, password).then((user) => {
    console.log("User signed in: " + user.user.email);
  });
}
