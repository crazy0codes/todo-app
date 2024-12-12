import React, { useContext, useEffect, useState } from "react";
import "../../styles/TodoInputStyle/index.css";
import "../../styles/TodoListStyle/index.css";
import { HomeView } from "../../views/HomeView";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { firebaseConfig } from "../../utils/firebaseConfig";
import {
  collection,
  onSnapshot,
  getFirestore,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export type TodoList = {
  todo_id: string;
  todo: string | null;
  status: boolean;
};

const demoData: TodoList[] = [
  { todo_id: "w", todo: "Complete the DSA course", status: false },
  {
    todo_id: "d",
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
  const Context = useContext(AuthContext);
  const [todoList, setTodoList] = useState<TodoList[]>(demoData);
  const navigate = useNavigate();

  useEffect(() => {
    if (!Context?.user?.isLogged) {
      navigate("/login");
      return;
    }
    const userTodosRef = collection(db, `todos-${Context.user.userId}`);
    const unsubscribe = onSnapshot(userTodosRef, (snapshot) => {
      const fetchedTodos: TodoList[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          todo_id: doc.id,
          todo: data.todo || null,
          status: data.status || false,
        };
      });
      setTodoList(fetchedTodos);
    });

    return () => unsubscribe();
  }, [Context.user?.isLogged, navigate]);

  async function delTask(event: MouseBtnEvent) {
    const target = event.target as HTMLElement;
    const index = target?.getAttribute("data-index");

    if (index !== null) {
      const userTodosRef = collection(db, `todos-${Context?.user?.userId}`);
      const docRef = doc(userTodosRef, index);
      await deleteDoc(docRef);
    }
  }

  async function completeTask(event: MouseBtnEvent) {
    const target = event.target as HTMLElement;
    const index = target?.getAttribute("data-index");

    if (index) {
      if (index !== null) {
        const userTodosRef = collection(db, `todos-${Context?.user?.userId}`);
        const docRef = doc(userTodosRef, index);
        const docData = await getDoc(docRef);
        if(docData.data()?.status){
          await updateDoc(docRef, { status: false });
        }
        else {
          await updateDoc(docRef, {status : true});
        }
      }
    }
  }

  async function addTodo() {
    const todoElement =
      document.querySelector<HTMLTextAreaElement>(".todo-textarea");
    const todo = todoElement?.value.trim() || "";
    if (todo) {
      const userTodosRef = collection(db, `todos-${Context?.user?.userId}`);
      await addDoc(userTodosRef, { todo, status: false });
      if (todoElement) todoElement.value = "";
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
