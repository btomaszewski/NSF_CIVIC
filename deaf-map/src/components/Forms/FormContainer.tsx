"use client";
import {
  useState,
  ReactElement,
  ReactNode,
  cloneElement,
  ChangeEvent,
} from "react";
import ProgressBar from "../progressBar/progressBar";
import "./FormContainer.css";

//Struggling  with Typescript type system
interface InputFormQuestionProps<T extends number | string>
  extends FormQuestionBaseProps {
  inputSubmit(input: T): boolean;
  defaultValue: T;
}

export function InputFormQuestion(props: InputFormQuestionProps<any>) {
  const [response, setResponse] = useState(props.defaultValue);
  const [isValid, setIsValid] = useState(props.inputSubmit(props.defaultValue)); //Initial check on value
  let handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    //These functions serve to trick the Typescript compiler into allowing us to pass the specific values to the supplied functions
    //Probably a better way to do this, just a hack to get around typescript compiler
    const narrowPropsNum = (
      x: InputFormQuestionProps<any>
    ): x is InputFormQuestionProps<number> =>
      typeof x.defaultValue === "number";
    const narrowPropsStr = (
      x: InputFormQuestionProps<any>
    ): x is InputFormQuestionProps<string> =>
      typeof x.defaultValue === "string";
    let newVal;
    if (e.target.type === "number" && narrowPropsNum(props)) {
      newVal = e.target.valueAsNumber;
    } else if (e.target.type === "string" && narrowPropsStr(props)) {
      newVal = e.target.value;
    }
    props.inputSubmit(newVal);
    setResponse(newVal);
  };

  return (
    <FormQuestionBase {...props}>
      <div>
        <input
          type={typeof props.defaultValue}
          onChange={handleChange}
          value={response}
        ></input>
        {!isValid && <p>INVALID</p>}
        <button
          type="button"
          onClick={(e) => {
            if (props.onProceed) {
              props.onProceed();
            }
          }}
        >
          Submit
        </button>
      </div>
    </FormQuestionBase>
  );
}

interface StringInputFormQuestionProps extends FormQuestionBaseProps {
  inputSubmit(input: string): boolean;
}

export function StringInputFormQuestion(props: StringInputFormQuestionProps) {
  const [isValid, setIsValid] = useState(false);
  const [placeHolder, setPlaceHolder] = useState("");
  return (
    <FormQuestionBase {...props}>
      <div>
        <input
          onChange={(e) => {
            setIsValid(props.inputSubmit(e.target.value));
            setPlaceHolder(e.target.value);
          }}
          type="text"
          value={placeHolder}
        ></input>
      </div>
    </FormQuestionBase>
  );
}

interface NumberInputFormQuestionProps extends FormQuestionBaseProps {
  inputSubmit(input: number): boolean;
}

export function NumberInputFormQuestion(props: NumberInputFormQuestionProps) {
  const [isValid, setIsValid] = useState(false);
  const [placeHolder, setPlaceHolder] = useState("");
  return (
    <FormQuestionBase {...props}>
      <div>
        <input
          onChange={(e) => {
            //setIsValid(props.inputSubmit(""));
            setPlaceHolder(e.target.value);
          }}
          type="number"
          value={placeHolder}
          pattern="[0-9]*"
        ></input>
      </div>
    </FormQuestionBase>
  );
}

interface BoolFormQuestionProps extends FormQuestionBaseProps {
  answerCallBack(a: boolean): void;
}

export function BoolFormQuestion(props: BoolFormQuestionProps) {
  return (
    <FormQuestionBase {...props}>
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            props.answerCallBack(true);
            if (props.onProceed) props.onProceed();
          }}
        >
          Yes
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            props.answerCallBack(false);
            if (props.onProceed) props.onProceed();
          }}
        >
          No
        </button>
      </div>
    </FormQuestionBase>
  );
}

interface FormQuestionBaseProps {
  title?: string;
  iconPath?: string;
  children?: ReactNode;
  onProceed?: VoidFunction;
}

function FormQuestionBase({
  title,
  iconPath,
  children,
}: FormQuestionBaseProps) {
  return (
    <div className="question-container">
      <a className="question-title">{title}</a>
      <img src={iconPath}></img>
      {children}
    </div>
  );
}

interface FormContainerProps {
  children:
    | ReactElement<FormQuestionBaseProps>[]
    | ReactElement<FormQuestionBaseProps>;
}

export function FormContainer({ children }: FormContainerProps) {
  const [currentPage, setCurrentPage] = useState(0);
  let steps = Array.isArray(children) ? children.length : 1;

  const activeChild = cloneElement(
    //Cloning allows for us to add the OnProecced prop at runtime
    Array.isArray(children)
      ? children[Math.min(currentPage, children.length - 1)]
      : children,
    {
      onProceed: () => {
        setCurrentPage(currentPage + 1);
      },
    }
  );
  return (
    <div className="form-parent">
      <ProgressBar steps={steps} current={currentPage}></ProgressBar>
      {activeChild}
    </div>
  );
}
