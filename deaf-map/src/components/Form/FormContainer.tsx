"use client";

import { ReactElement, useState, cloneElement, useContext } from "react";
import ProgressBar from "../progressBar/progressBar";
import {
  BaseQuestionProps,
  BooleanQuestion,
  InputQuestion,
  InputResponse,
  RadioButtonQuestion,
  SummaryQuestion,
} from "./QuestionContainers";
import { FormContext } from "./FormContext";
import { title } from "process";
import "./FormContainer.css";

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
  options?: OptionChoice[]; //Options for multiple choice questions
  label?: string;
};

type OptionChoice = {
  text: string;
  imgRef?: string;
};

enum QuestionTypes {
  bool,
  str,
  num,
  summary,
  multi,
}

var Question_Map = {
  [QuestionTypes.bool]: BooleanQuestion,
  [QuestionTypes.num]: InputQuestion,
  [QuestionTypes.str]: InputQuestion,
  [QuestionTypes.multi]: RadioButtonQuestion,
};
//Question_Map[QuestionTypes.bool] = BooleanQuestion;

function FormContainer({ questions }: FormContainerProps) {
  if (questions && questions.length < 1) {
    return <p>Error, cannot have empty form</p>;
  }

  //   if (!Array.isArray(children)) {
  //     return <div>{children}</div>;
  //   }

  const [activePage, setActivePage] = useState(0);

  let submitData = (i: InputResponse) => {
    if (!questions) return;
    if (i.id < 0) {
      setActivePage(Math.max(0, activePage - 1));
    } else {
      questions[i.id].value = i.input;
      console.log(questions[i.id]);
      setActivePage(Math.min(questions.length, activePage + 1));
    }
  };

  let content = questions.map((q, i) => {
    switch (q.questionType) {
      case QuestionTypes.bool:
        return Question_Map[q.questionType]({
          id: i,
          title: q.title,
          submitData,
          imgRef: q.imgRef,
        });
      case QuestionTypes.multi:
        if (!q.options) {
          console.warn("Options should be present for multi-type questions");
          return;
        }
        return Question_Map[q.questionType]({
          id: i,
          title: q.title,
          imgRef: q.imgRef,
          submitData,
          options: q.options.map((o, j) => {
            return { id: j, title: o.text, imgRef: o.imgRef };
          }),
        });
      case QuestionTypes.num:
      case QuestionTypes.str:
        return Question_Map[q.questionType]({
          id: i,
          title: q.title,
          initialValue: q.value, //q.questionType == QuestionTypes.num ? 0 : "",
          validator: q.validator ? q.validator : (_) => true, // If none specified always return true
          submitData,
          imgRef: q.imgRef,
          label: q.label,
        });
    }
  });
  content.push(
    SummaryQuestion({
      id: content.length,
      submitData,
      questionList: questions.map((q, i) => {
        let presentation: JSX.Element;
        switch (q.questionType) {
          case QuestionTypes.bool:
            presentation = <p>{q.value ? "Yes" : "No"}</p>;
            break;
          case QuestionTypes.num:
          case QuestionTypes.str:
            presentation = <p>{q.value}</p>;
            break;
          case QuestionTypes.multi:
            presentation = q.options ? (
              <div>
                <img src={q.options[q.value].imgRef} />
                <p>{q.options[q.value].text}</p>
              </div>
            ) : (
              <></>
            );
            break;
          default:
            presentation = <></>;
            break;
        }
        return {
          id: i,
          title: q.title ? q.title : "",
          presentation: presentation,
        };
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
