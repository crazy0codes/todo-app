import React, {useEffect, useState } from "react";
import "../../styles/TodoInputStyle/index.css";
import "../../styles/TodoListStyle/index.css";
import { HomeView } from "../../views/HomeView";

export type TodoList = {
  todo: string | null;
  status: boolean;
};

const demoData: TodoList[] = [
  {
    todo: "Complete the DSA course",
    status: false,
  },
  {
    todo: "Complete the React course",
    status: false,
  },
];

export type TodoListState = React.Dispatch<React.SetStateAction<TodoList[]>>;
export type MouseBtnEvent = React.MouseEvent<HTMLButtonElement>;

export type Props = {
  setTodoList: React.Dispatch<React.SetStateAction<TodoList[]>>;
  style: string;
  todoList: TodoList[];
};



export function HomeContainer() {
  const [todoList, setTodoList] = useState<TodoList[]>([]);
  useEffect(() => {
    setTodoList(() => demoData);
  }, []);
  
  function delTask(event: MouseBtnEvent) {
    const target = event.target as HTMLElement;
    const index = target?.getAttribute("data-index");
  
    if (index !== null) {
      const idx = parseInt(index, 10);
      setTodoList((prev) => prev.filter((_, i) => i !== idx));
    }
  }
  
  function completeTask(event: MouseBtnEvent) {
    const target = event.target as HTMLElement;
    const index = target?.getAttribute("data-index");
  
    if (index) {
      const id = parseInt(index, 10);
      setTodoList((prev) =>
        prev.map((todoObj, i) =>
          i === id ? { ...todoObj, status: !todoObj.status } : todoObj
        )
      );
    }
  }
  
  function addTodo() {
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
  }
  
  return (
    <HomeView 
    setTodoList={setTodoList}
    todoList={todoList}
    style="todo-task"
    delTask={delTask}
    completeTask={completeTask}
    addTodo={addTodo}
    />
  );
}
