import React, {useEffect, useState } from "react";
import { TodoView } from "./views/TodoView";

export type TodoList = {
  todo: string | null;
  status: boolean;

}

const demoData: TodoList[] = [
  {
    todo : "Complete the DSA course",
    status : false,
  },
  {
    todo : "Complete the React course",
    status : false,
  }
];

function App() {
  const [todoList, setTodoList] = useState<TodoList[]>([]);
  useEffect(() => {
    setTodoList(() => demoData);
  }, []);

  return <TodoView setTodoList={setTodoList} todoList={todoList} style="todo-task"/>
}

export default App;
