import React from "react";

interface TodoTaskBoxProps {
  children : React.ReactNode;
  task: string | null;
  style?: string;
}

export function TodoTaskBox({ children, task, style }: TodoTaskBoxProps) {
  return (
    <div className={style}>
      {children}
      <p>
        {task ||
          `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, enim sunt velit recusandae, omnis error illo dolor magni unde ullam similique aperiam et nihil ducimus soluta nostrum quasi dolorem quisquam?`}
      </p>
    </div>
  );
}
