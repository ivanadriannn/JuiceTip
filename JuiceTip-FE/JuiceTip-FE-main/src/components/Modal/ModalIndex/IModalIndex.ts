import { ReactNode } from "react";

export interface IModalIndex {
    children: ReactNode
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void
}