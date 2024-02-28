/*
QuestionContainter.tsx

Description: Contains all of the question components for use in the forms

TODO: remove the use of context, introduce props to pass events down instead, redundancy is being introduced with question-content 
needing the same functionality
*/
import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useContext,
  useState,
} from "react";

import "./QuestionContainers.css";

export type InputResponse = {
  id: number;
  input: any;
};

export interface BaseQuestionProps extends CoreInformation {
  submitData: (d: InputResponse) => void;
}

export interface CoreInformation {
  id: number;
  title?: string;
  imgRef?: string;
}

export function BooleanQuestion({
  id,
  title,
  submitData,
  imgRef,
}: BaseQuestionProps) {
  return (
    <BaseQuestion
      id={id}
      buttonComponent={BoolButtons}
      buttonProps={{ submitData, id, canProgress: true }}
      title={title}
      imgRef={imgRef}
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
  imgRef,
}: InputQuestionProps) {
  const [inputValue, setInputValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(
    validator ? validator(inputValue) : true
  );
  return (
    <BaseQuestion
      id={id}
      title={title}
      imgRef={imgRef}
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
  questionList: { id: any; title: string; presentation: ReactElement }[];
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
      buttonProps={{ id, submitData }}
    >
      <div className="summary-parent">
        {questionList.map((q) => {
          return (
            <div key={q.id} className="summary-box">
              <div className="info-review">
                <p key={q.title} className="text-base text-center">
                  {q.title}
                </p>
                {q.presentation}
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

export interface RadioButtonQuestionProps extends BaseQuestionProps {
  options: CoreInformation[];
}
export function RadioButtonQuestion({
  title,
  imgRef,
  id,
  options,
  submitData,
}: RadioButtonQuestionProps) {
  return (
    <BaseQuestion
      id={id}
      title={title}
      imgRef={imgRef}
      buttonProps={{ id, submitData }}
    >
      <div className="radio-parent">
        {options.map((o) => {
          return (
            <button
              key={o.id}
              className="radio-button"
              onClick={(e) => {
                e.preventDefault();
                submitData({ id: id, input: o.id });
              }}
            >
              <div>
                <img src={o.imgRef}></img> <p>{o.title}</p>
              </div>
            </button>
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
  buttonComponent?: (props: FormButtonProps) => ReactElement<FormButtonProps>; //Allows for context to be inherited
  buttonProps: FormButtonProps;
}

function BaseQuestion({
  title,
  imgRef,
  children,
  buttonComponent,
  buttonProps,
}: _BaseQuestionProps) {
  return (
    <div className="question-grid">
      <div className="question-content">
        <>
          {imgRef ? <img src={imgRef}></img> : <></>}
          <a className="text-center question-title my-4">{title}</a>
        </>
        {children}
        {/* {imgRef ? <img src={imgRef}></img> : children} */}
      </div>

      <div className="question-navigation">
        {buttonComponent ? (
          buttonComponent(
            buttonProps ? buttonProps : { id: -1, submitData: (d) => {} }
          )
        ) : (
          <></>
        )}

        <BackFormButton {...buttonProps} />
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
  return (
    <div>
      <button
        className="bool-button form-button ml-10 mr-3"
        onClick={(e) => {
          submitData({ id, input: true });
        }}
      >
        Yes
      </button>
      <button
        className="bool-button form-button mr-10 ml-3"
        onClick={(e) => {
          submitData({ id, input: false });
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
  return (
    <div>
      <button
        className="form-button large-button mx-10"
        onClick={(e) => {
          submitData({ id, input: payload });
        }}
      >
        Submit
      </button>
    </div>
  );
}

function BackFormButton({ submitData }: FormButtonProps) {
  return (
    <button
      className="form-button large-button mx-10"
      onClick={(e) => {
        submitData({ id: -1, input: null });
      }}
    >
      Back
    </button>
  );
}
