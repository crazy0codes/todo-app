import React from "react";
import { TodoListContainer } from "../../containers/TodoListContainer";
import { TodoInputContainer } from "../../containers/TodoInputContainer";
import { TodoList } from "../../App";
import "../../styles/TodoViewStyle/index.css";

export type TodoViewProps = {
  todoList: TodoList[];
  style: string;
  setTodoList: React.Dispatch<React.SetStateAction<TodoList[]>>;
};

export type MouseBtnEvent = React.MouseEvent<HTMLButtonElement>;

export function TodoView({ setTodoList, todoList, style }: TodoViewProps) {
  return (
    <main id="todo-view-container">
      <div id="todo-view">
        <TodoInputContainer setTodoList={setTodoList} />
        <TodoListContainer
          setTodoList={setTodoList}
          todoList={todoList}
          style={style}
        />
      </div>
    </main>
  );
}
