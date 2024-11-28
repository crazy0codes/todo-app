import React from "react";
import { TodoList } from "../../App";
import { TodoTaskBox } from "../../components/custom/TodoTaskBox";
import { TodoButton } from "../../components/base/TodoButton";
import { CircleCheck, CircleX, Trash } from "lucide-react";
import '../../styles/TodoListStyle/index.css';
type TodoListState = React.Dispatch<React.SetStateAction<TodoList[]>>;
type MouseBtnEvent = React.MouseEvent<HTMLButtonElement>

export type Props = {
  setTodoList: React.Dispatch<React.SetStateAction<TodoList[]>>;
  style: string;
  todoList: TodoList[];
};

function delTask(event: MouseBtnEvent, setTodoList: TodoListState) {
  const target = event.target as HTMLElement;
  const index = target?.getAttribute("data-index");

  if (index !== null) {
    const idx = parseInt(index, 10);
    setTodoList((prev) => prev.filter((_, i) => i !== idx));
  }
}

function completeTask(event: MouseBtnEvent, setTodoList: TodoListState) {
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

export function TodoListContainer({ setTodoList, todoList, style }: Props) {
  return (
    <>
      {todoList.map((taskObj: TodoList, index) => (
        <TodoTaskBox
          key={index}
          task={taskObj.todo}
          style={!taskObj.status ? style : "todo-task-completed"}
        >
          <div className="todo-options">
            <TodoButton onClick={(e) =>delTask(e, setTodoList)} style="todo-options-btn">
              <Trash size={"20px"} data-index={index} />
            </TodoButton>
            <TodoButton onClick={(e) => completeTask(e, setTodoList)} style="todo-options-btn">
              {taskObj.status ? (
                <CircleX size={"20px"} data-index={index} />
              ) : (
                <CircleCheck size={"20px"} data-index={index} />
              )}
            </TodoButton>
          </div>
        </TodoTaskBox>
      ))}
    </>
  );
}