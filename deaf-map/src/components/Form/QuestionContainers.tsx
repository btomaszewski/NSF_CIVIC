import { ReactElement, useContext, useState } from "react";
import { FormContext } from "./FormContext";

import "./QuestionContainers.css";
import { title } from "process";

export type InputResponse = {
  id: any;
  input: any;
};

export interface BaseQuestionProps {
  id: any;
  title?: string;
  imgRef?: string;
  submitData: (d: InputResponse) => void;
}

export function BooleanQuestion({ title }: BaseQuestionProps) {
  return (
    <BaseQuestion buttonComponent={BoolButtons} title={title}></BaseQuestion>
  );
}

export interface InputQuestionProps<T = string | number>
  extends BaseQuestionProps {
  initialValue: T;
  validator: (d: T) => boolean;
}

export function InputQuestion<T = string | number>({
  title,
  initialValue,
  validator,
  submitData,
}: InputQuestionProps) {
  const [inputValue, setInputValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(
    validator ? validator(inputValue) : true
  );
  return (
    <BaseQuestion
      title={title}
      buttonComponent={SubmitButton}
      buttonProps={{ submitData, canProgress: isValid, payload: inputValue }}
    >
      <input
        type={typeof initialValue}
        pattern={typeof initialValue === "number" ? "[0-9]*" : ""}
        value={inputValue}
        onChange={(e) => {
          console.log(e.target.value);
          setInputValue(e.target.value);
          setIsValid(
            validator
              ? validator(
                  typeof initialValue === "number"
                    ? e.target.valueAsNumber
                    : e.target.value
                )
              : true
          );
        }}
        className="form-input"
      ></input>
    </BaseQuestion>
  );
}

interface _BaseQuestionProps {
  title?: string;
  imgRef?: string;
  children?: ReactElement<BaseQuestionProps>;
  buttonComponent: (props: FormButtonProps) => ReactElement<FormButtonProps>; //Allows for context to be inherited
  buttonProps?: FormButtonProps;
}

function BaseQuestion({
  title,
  imgRef,
  children,
  buttonComponent,
  buttonProps,
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
          {buttonComponent(
            buttonProps ? buttonProps : { submitData: (d) => {} }
          )}
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

interface FormButtonProps {
  submitData: (d: any) => void;
  canProgress?: boolean;
  payload?: any;
}

function BoolButtons({ submitData }: FormButtonProps) {
  const ctx = useContext(FormContext);
  return (
    <div>
      <button
        className="bool-button form-button ml-6 mr-3"
        onClick={(e) => {
          if (ctx.setActivePage) {
            console.log("pressed");
            ctx.setActivePage(ctx.activePage + 1);
            submitData(true);
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
            submitData(false);
          }
        }}
      >
        No
      </button>
    </div>
  );
}

function SubmitButton({ submitData, canProgress, payload }: FormButtonProps) {
  const ctx = useContext(FormContext);
  return (
    <div>
      <button
        className="form-button large-button mx-6"
        onClick={(e) => {
          if (canProgress && ctx.setActivePage) {
            ctx.setActivePage(ctx.activePage + 1);
            submitData(payload);
          }
        }}
      >
        Submit
      </button>
    </div>
  );
}