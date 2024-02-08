"use client";
import { useState, CSSProperties } from "react";
import "./progressbar.css";

interface ProgressBarProps {
  steps: number;
  current?: number;
}

interface ProgressBarCSS extends CSSProperties {
  "--progress-bar-rect-width": string;
}

export default function ProgressBar({ steps, current }: ProgressBarProps) {
  let barStyle: ProgressBarCSS = {
    "--progress-bar-rect-width": `${Math.floor(100 / steps)}%`,
  };
  console.log(barStyle);
  let bars = [];
  for (let i = 0; i < steps; i++) {
    bars.push(
      <div
        key={i}
        style={barStyle}
        className="progress-bar-rect first:ml-0 last:mr-0 mx-2"
      ></div>
    );
  }

  return <div className="progress-bar-container justify-center">{bars}</div>;
}
