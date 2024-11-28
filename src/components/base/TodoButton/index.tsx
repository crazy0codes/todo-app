
import React, { ReactNode } from 'react';
import { TodoList } from '../../../App';


interface TodoButtonProps {
    children: ReactNode;
    style?: string;
    onClick?: (param: React.MouseEvent<HTMLButtonElement>, todoList?: TodoList[]) => void
}

export function TodoButton({ children , style, onClick}: TodoButtonProps) {
    return <button
    role={"button"}
    onClick={onClick}
    className={style}>{children}</button>;
}