"use client";
import {
  FormContainer,
  QuestionContent,
  QuestionTypes,
} from "@/components/Form/FormContainer";
import { BooleanQuestion } from "@/components/Form/QuestionContainers";

export default function accessibility_form() {
  let testQuestions: QuestionContent[] = [
    { title: "Yes or No", questionType: QuestionTypes.bool, value: false },
    {
      title: "Input Value",
      questionType: QuestionTypes.str,
      value: "",
      label: "Input value here",
    },
  ];
  return (
    <div>
      {/* <FormContainer onInput={(i) => {
            console.log(`Received: ${i}`);
            return true;
        }}>
        </FormContainer> */}
      <FormContainer questions={testQuestions} />
    </div>
  );
}
