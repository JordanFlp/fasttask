import type { IconType } from "react-icons";

export interface Feature {
  id: string;
  icon: IconType;
  text: string;
}

export interface HowItWorksStep {
  id: string;
  stepNumber: number;
  text: string;
}