import React from "react";
import { TodoTaskBox } from "../../components/custom/TodoTaskBox";
import { Button } from "../../components/base/Button";
import { CircleCheck, CircleX, Trash } from "lucide-react";
import { TodoTextArea } from "../../components/base/TodoTextArea";
import { TodoList, TodoListState } from "../../containers/HomeContaier";
import "../../styles/TodoViewStyle/index.css";

export type TodoViewProps = {
  todoList: TodoList[];
  style: string;
  setTodoList: React.Dispatch<React.SetStateAction<TodoList[]>>;
  delTask: (event: MouseBtnEvent, setTodoList: TodoListState) => void;
  addTodo: (param: React.Dispatch<React.SetStateAction<TodoList[]>>) => void;
  completeTask: (event: MouseBtnEvent, setTodoList: TodoListState) => void;
};

export type MouseBtnEvent = React.MouseEvent<HTMLButtonElement>;

export function HomeView({
  setTodoList,
  todoList,
  style,
  addTodo,
  delTask,
  completeTask,
}: TodoViewProps) {
  return (
    <main id="todo-view-container">
      <div id="todo-view">
        <div id="TodoInputView">
          <TodoTextArea style="todo-textarea" placeholder="Write it.." />
          <Button onClick={() => addTodo(setTodoList)} style="todo-add-btn">
            Add
          </Button>
        </div>
        {todoList.map((taskObj: TodoList, index) => (
          <TodoTaskBox
            key={index}
            task={taskObj.todo}
            style={!taskObj.status ? style : "todo-task-completed"}
          >
            <div className="todo-options">
              <Button
                onClick={(e) => delTask(e, setTodoList)}
                style="todo-options-btn"
              >
                <Trash size={"20px"} data-index={taskObj.todo_id} />
              </Button>
              <Button
                onClick={(e) => completeTask(e, setTodoList)}
                style="todo-options-btn"
              >
                {taskObj.status ? (
                  <CircleX size={"20px"} data-index={taskObj.todo_id} />
                ) : (
                  <CircleCheck size={"20px"} data-index={taskObj.todo_id} />
                )}
              </Button>
            </div>
          </TodoTaskBox>
        ))}
      </div>
    </main>
  );
}
