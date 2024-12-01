
import React, { ReactNode } from 'react';

interface ButtonProps {
    children: ReactNode;
    style?: string;
    onClick?: (param: React.MouseEvent<HTMLButtonElement>) => void
}

export function Button({ children , style, onClick}: ButtonProps) {
    return <button
    role={"button"}
    onClick={onClick}
    className={style}>{children}</button>;
}