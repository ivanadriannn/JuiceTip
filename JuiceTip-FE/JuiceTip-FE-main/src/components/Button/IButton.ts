import { ReactNode } from "react";
export interface IButton {
  href?: string;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: any;
}
