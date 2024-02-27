"use client";

import { ReactElement, useState, cloneElement, useContext } from "react";
import ProgressBar from "../progressBar/progressBar";
import {
  BaseQuestionProps,
  BooleanQuestion,
  InputQuestion,
  InputResponse,
  SummaryQuestion,
} from "./QuestionContainers";
import { FormContext } from "./FormContext";
import { title } from "process";

interface FormContainerProps {
  // children?:
  //   | ReactElement<BaseQuestionProps>
  //   | ReactElement<BaseQuestionProps>[];
  questions: QuestionContent[];
}

type QuestionContent = {
  title?: string;
  imgRef?: string;
  questionType: QuestionTypes;
  validator?: (d: any) => boolean;
  value: any; // Initial starting value
};

enum QuestionTypes {
  bool,
  str,
  num,
  summary,
}

var Question_Map = {
  [QuestionTypes.bool]: BooleanQuestion,
  [QuestionTypes.num]: InputQuestion,
  [QuestionTypes.str]: InputQuestion,
};
//Question_Map[QuestionTypes.bool] = BooleanQuestion;

function FormContainer({ questions }: FormContainerProps) {
  if (questions && questions.length < 1) {
    return <p>Error, cannot have empty form</p>;
  }

  //   if (!Array.isArray(children)) {
  //     return <div>{children}</div>;
  //   }

  const [activePage, setActivePage] = useState(1);

  let submitData = (i: InputResponse) => {
    if (!questions) return;
    //console.log(i);
    questions[i.id].value = i.input;
    console.log(questions[i.id]);
  };

  let content = questions.map((q, i) => {
    switch (q.questionType) {
      case QuestionTypes.bool:
        return Question_Map[q.questionType]({
          id: i,
          title: q.title,
          submitData,
        });

      case QuestionTypes.num:
      case QuestionTypes.str:
        return Question_Map[q.questionType]({
          id: i,
          title: q.title,
          initialValue: q.value, //q.questionType == QuestionTypes.num ? 0 : "",
          validator: q.validator ? q.validator : (_) => true, // If none specified always return true
          submitData,
        });
    }
  });
  content.push(
    SummaryQuestion({
      id: content.length,
      submitData,
      questionList: questions.map((q, i) => {
        return { id: i, title: q.title ? q.title : "", value: q.value };
      }),
      onEditPress: setActivePage,
    })
  );

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
