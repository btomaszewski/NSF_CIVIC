"use client";

import { ChangeEventHandler, ReactElement } from "react";

import "./LabeledInput.css";

interface LabeledInputProps {
  label?: string;
  pattern?: string;
  value: string | number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  type?: string;
}

export default function LabeledInput({
  label,
  pattern,
  value,
  onChange,
  type,
}: LabeledInputProps) {
  return (
    <div className="labeled-input-container">
      <input onChange={onChange} pattern={pattern} value={value} type={type} />
      <label className={value ? "input-filled" : ""}>{label}</label>
    </div>
  );
}
