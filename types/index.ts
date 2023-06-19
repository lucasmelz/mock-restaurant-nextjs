import { UUID } from "crypto";
import { MouseEventHandler, ReactNode } from "react";

export interface DishProps {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    category: string;
}

export interface CategoryProps {
    id: string;
    name: string;
    priority: number;
}

export interface CustomButtonProps {
    isDisabled?: boolean;
    btnType?: "button" | "submit";
    containerStyles?: string;
    textStyles?: string;
    title: string;
    rightIcon?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    children?: ReactNode;
  }