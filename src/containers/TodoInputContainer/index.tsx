import React, { Dispatch, SetStateAction } from "react";
import { TodoList } from "../../App";
import { TodoButton } from "../../components/base/TodoButton";
import { TodoTextArea } from "../../components/base/TodoTextArea";
import "../../styles/TodoInputStyle/index.css";

type TodoInputContainerProps = {
  setTodoList: Dispatch<SetStateAction<TodoList[]>>;
};

export function TodoInputContainer({ setTodoList }: TodoInputContainerProps) {
  const addTodo = () => {
    const todoElement: HTMLTextAreaElement | null =
      document.querySelector<HTMLTextAreaElement>(".todo-textarea");
    const todo = todoElement?.value.trim() || "";
    if (todo && todoElement) {
      setTodoList((prev): TodoList[] => [
        ...prev,
        {
          todo,
          status: false,
        },
      ]);
      todoElement.value = "";
    }

    console.log(`Task: ${todo}`);
  };

  return (
    <div id="TodoInputView">
      <TodoTextArea style="todo-textarea" placeholder="Write it.." />
      <TodoButton onClick={addTodo} style="todo-add-btn">
        Add
      </TodoButton>
    </div>
  );
}
