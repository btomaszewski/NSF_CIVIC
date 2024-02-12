"use client";
import { useState, ReactElement, ReactNode, cloneElement } from "react";
import ProgressBar from "../progressBar/progressBar";

interface FormContainerProps {
  children:
    | ReactElement<FormQuestionBaseProps>[]
    | ReactElement<FormQuestionBaseProps>;
}

interface FormQuestionBaseProps {
  title?: string;
  iconPath?: string;
  children?: ReactNode;
  onProceed?: VoidFunction;
}

//class FormQuestionContainer implements FormQuestionBaseProps, React

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

function FormQuestionBase({
  title,
  iconPath,
  children,
}: FormQuestionBaseProps) {
  return (
    <div>
      <a>{title}</a>
      <img src={iconPath}></img>
      {children}
    </div>
  );
}

export function FormContainer({ children }: FormContainerProps) {
  const [currentPage, setCurrentPage] = useState(0);
  let steps = Array.isArray(children) ? children.length : 1;

  const activeChild = cloneElement(
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
