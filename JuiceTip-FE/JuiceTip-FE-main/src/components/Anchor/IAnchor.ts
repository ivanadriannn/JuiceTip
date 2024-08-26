import { ReactNode } from "react";

export interface IAnchor {
    children: ReactNode
    variant?: string
    href: string
    target?: boolean
}