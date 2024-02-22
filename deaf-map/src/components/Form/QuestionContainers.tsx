import { ReactElement, useContext, useState } from "react";
import { FormContext } from "./FormContext";

import "./QuestionContainers.css";
import { title } from "process";

export interface BaseQuestionProps {
  id: any;
  title?: string;
  imgRef?: string;
}

export function BooleanQuestion({ title }: BaseQuestionProps) {
  return (
    <BaseQuestion buttonComponent={BoolButtons} title={title}></BaseQuestion>
  );
}

export interface InputQuestionProps<T = string | number>
  extends BaseQuestionProps {
  initialValue: T;
}

export function InputQuestion<T = string | number>({
  title,
  initialValue,
}: InputQuestionProps) {
  const [inputValue, setInputValue] = useState(initialValue);
  return (
    <BaseQuestion title={title} buttonComponent={SubmitButton}>
      <input
        type={typeof initialValue}
        pattern={typeof initialValue === "number" ? "[0-9]*" : ""}
        value={inputValue}
        onChange={(e) => {
          console.log(e.target.value);
          setInputValue(e.target.value);
        }}
        className="my-10"
      ></input>
    </BaseQuestion>
  );
}

interface _BaseQuestionProps {
  title?: string;
  imgRef?: string;
  children?: ReactElement<BaseQuestionProps>;
  buttonComponent: (props: FormButtonProps) => ReactElement<FormButtonProps>;
}

function BaseQuestion({
  title,
  imgRef,
  children,
  buttonComponent,
}: _BaseQuestionProps) {
  const { activePage, setActivePage } = useContext(FormContext);
  return (
    <div className="question-grid">
      <div className="question-content">
        <a className="text-center question-title my-4">{title}</a>

        {imgRef ? <img src={imgRef}></img> : children}
      </div>

      <div className="question-navigation">
        <FormContext.Provider value={{ activePage, setActivePage }}>
          {buttonComponent({})}
        </FormContext.Provider>

        <button
          className="form-button large-button mx-6"
          onClick={(e) => {
            if (setActivePage) {
              setActivePage(activePage - 1);
            }
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
}

interface FormButtonProps {}

function BoolButtons({}: FormButtonProps) {
  const ctx = useContext(FormContext);
  return (
    <div>
      <button
        className="bool-button form-button ml-6 mr-3"
        onClick={(e) => {
          if (ctx.setActivePage) {
            console.log("pressed");
            ctx.setActivePage(ctx.activePage + 1);
          }
        }}
      >
        Yes
      </button>
      <button
        className="bool-button form-button mr-6 ml-3"
        onClick={(e) => {
          if (ctx.setActivePage) {
            ctx.setActivePage(ctx.activePage - 1);
          }
        }}
      >
        No
      </button>
    </div>
  );
}

function SubmitButton({}: FormButtonProps) {
  const ctx = useContext(FormContext);
  return (
    <div>
      <button className="form-button large-button mx-6">Submit</button>
    </div>
  );
}
