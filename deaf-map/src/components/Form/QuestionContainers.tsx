import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { FormContext } from "./FormContext";

import "./QuestionContainers.css";

export type InputResponse = {
  id: number;
  input: any;
};

export interface BaseQuestionProps {
  id: number;
  title?: string;
  imgRef?: string;
  submitData: (d: InputResponse) => void;
}

export function BooleanQuestion({ id, title }: BaseQuestionProps) {
  return (
    <BaseQuestion
      id={id}
      buttonComponent={BoolButtons}
      title={title}
    ></BaseQuestion>
  );
}

export interface InputQuestionProps<T = string | number>
  extends BaseQuestionProps {
  initialValue: T;
  validator: (d: T) => boolean;
}

export function InputQuestion<T = string | number>({
  id,
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
      id={id}
      title={title}
      buttonComponent={SubmitButton}
      buttonProps={{
        submitData,
        canProgress: isValid,
        payload: inputValue,
        id,
      }}
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

export interface FormSubmitScreenProps extends BaseQuestionProps {
  questionList: { id: any; title: string; value: any }[];
  onEditPress: Dispatch<SetStateAction<number>>;
}

//Only a question in name
export function SummaryQuestion({
  id,
  submitData,
  questionList,
  onEditPress,
}: FormSubmitScreenProps) {
  return (
    <BaseQuestion
      id={id}
      title="Summary of your submission"
      buttonComponent={SubmitButton}
    >
      <div className="summary-parent">
        {questionList.map((q) => {
          return (
            <div key={q.id} className="summary-box">
              <div className="info-review">
                <p key={q.title} className="text-base text-center">
                  {q.title}
                </p>
                <p key="value" className="text-lg">
                  {q.value}
                </p>
              </div>
              <button
                className="form-button"
                onClick={(e) => {
                  e.preventDefault();

                  onEditPress(q.id);
                }}
              >
                Edit
              </button>
            </div>
          );
        })}
      </div>
    </BaseQuestion>
  );
}

interface _BaseQuestionProps {
  id: number;
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
        {children}
        {/* {imgRef ? <img src={imgRef}></img> : children} */}
      </div>

      <div className="question-navigation">
        <FormContext.Provider value={{ activePage, setActivePage }}>
          {buttonComponent(
            buttonProps ? buttonProps : { id: -1, submitData: (d) => {} }
          )}
        </FormContext.Provider>

        <button
          className="form-button large-button mx-10"
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
  submitData: (d: InputResponse) => void;
  canProgress?: boolean;
  payload?: any;
  id: number;
}

function BoolButtons({ submitData, id }: FormButtonProps) {
  const ctx = useContext(FormContext);
  return (
    <div>
      <button
        className="bool-button form-button ml-10 mr-3"
        onClick={(e) => {
          if (ctx.setActivePage) {
            ctx.setActivePage(ctx.activePage + 1);
            submitData({ id, input: true });
          }
        }}
      >
        Yes
      </button>
      <button
        className="bool-button form-button mr-10 ml-3"
        onClick={(e) => {
          if (ctx.setActivePage) {
            ctx.setActivePage(ctx.activePage - 1);
            submitData({ id, input: false });
          }
        }}
      >
        No
      </button>
    </div>
  );
}

function SubmitButton({
  submitData,
  canProgress,
  payload,
  id,
}: FormButtonProps) {
  const ctx = useContext(FormContext);
  return (
    <div>
      <button
        className="form-button large-button mx-10"
        onClick={(e) => {
          if (canProgress && ctx.setActivePage) {
            ctx.setActivePage(ctx.activePage + 1);
            submitData({ id, input: payload });
          }
        }}
      >
        Submit
      </button>
    </div>
  );
}
