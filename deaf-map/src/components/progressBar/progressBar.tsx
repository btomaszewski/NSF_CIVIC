"use client";
import { useState, CSSProperties } from "react";
import "./progressbar.css";

interface ProgressBarProps {
  steps: number;
  startAt?: number;
  current: number;
}

interface ProgressBarCSS extends CSSProperties {
  "--progress-bar-rect-width": string;
  "--progress-bar-rect-bg-color": string;
}

export default function ProgressBar({
  steps,
  startAt,
  current,
}: ProgressBarProps) {
  const [currentStep, setCurrentStep] = useState(startAt ? startAt : 0);
  let bars = [];
  for (let i = 0; i < steps; i++) {
    let barStyle: ProgressBarCSS = {
      "--progress-bar-rect-width": `${Math.floor(100 / steps)}%`,
      "--progress-bar-rect-bg-color":
        i < current
          ? "rgb(var(--progress-bar-bg-filled))"
          : "rgb(var(--progress-bar-bg-empty))",
    };

    bars.push(
      <div
        key={i}
        style={barStyle}
        className="progress-bar-rect first:ml-0 last:mr-0 mx-2 "
      ></div>
    );
  }

  return <div className="progress-bar-container justify-center">{bars}</div>;
}
