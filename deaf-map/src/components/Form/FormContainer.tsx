"use client";

import { ReactElement, useState, cloneElement, useContext } from "react";
import ProgressBar from "../progressBar/progressBar";
import {
  BaseQuestionProps,
  BooleanQuestion,
  InputQuestion,
} from "./QuestionContainers";
import { FormContext } from "./FormContext";

interface FormContainerProps {
  children?:
    | ReactElement<BaseQuestionProps>
    | ReactElement<BaseQuestionProps>[];
  onInput(i: InputResponse): boolean;
  questions?: QuestionContent[];
}

type QuestionContent = {
  title?: string;
  imgRef?: string;
  questionType: QuestionTypes;
};

enum QuestionTypes {
  bool,
  str,
  num,
}

type InputResponse = {
  id: any;
  input: any;
};

var Question_Map = {
  [QuestionTypes.bool]: BooleanQuestion,
  [QuestionTypes.num]: InputQuestion,
  [QuestionTypes.str]: InputQuestion,
};
//Question_Map[QuestionTypes.bool] = BooleanQuestion;

function FormContainer({ children, questions }: FormContainerProps) {
  if (questions && questions.length < 1 && !children) {
    return <p>Error, cannot have empty form</p>;
  }

  //   if (!Array.isArray(children)) {
  //     return <div>{children}</div>;
  //   }

  let content = questions
    ? questions.map((q, i) => {
        switch (q.questionType) {
          case QuestionTypes.bool:
            return Question_Map[q.questionType]({ id: i, title: q.title });

          case QuestionTypes.num:
          case QuestionTypes.str:
            return Question_Map[q.questionType]({
              id: i,
              title: q.title,
              initialValue: q.questionType == QuestionTypes.num ? 0 : "",
            });
        }
      })
    : children
    ? Array.isArray(children)
      ? children
      : [children]
    : [<p>nothing here</p>];

  const [activePage, setActivePage] = useState(1);
  return (
    <div className="form-parent">
      <FormContext.Provider
        value={{
          activePage,
          setActivePage,
        }}
      >
        <ProgressBar steps={content.length} current={activePage}></ProgressBar>
        {content[Math.max(0, activePage)]}
      </FormContext.Provider>
    </div>
  );
}

export { FormContainer, QuestionTypes };
export type { QuestionContent };
