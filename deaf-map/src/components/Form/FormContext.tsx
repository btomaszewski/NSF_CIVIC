import { Dispatch, SetStateAction, createContext } from "react";

// type fCTX = {
//   activePage: number;
//   setActivePage?(p: number): void;
// };

// let test: fCTX = {
//   activePage: 0,
//   setActivePage(p) {
//     console.log(`Default func ${p}`);
//   },
// };
interface FormCtrl {
  activePage: number;
  setActivePage: Dispatch<SetStateAction<number>>;
}
export const FormContext = createContext({} as FormCtrl);
