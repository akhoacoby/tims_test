import React from "react";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";

export function AddTask({ status, setTasks, getNextId }) {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);
  const textColorMap = {
    backlog: "text-neutral-400",
    todo: "text-yellow-500",
    inProgress: "text-blue-400",
    done: "text-green-500",
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (text.trim() === "") return;
    setText("");

    const newTask = {
      status,
      text: text.trim(),
      id: getNextId(),
    };

    setTasks((pv) => [...pv, newTask]);
  }

  return (
    <>
      {adding ? (
        <form onSubmit={handleSubmit}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Enter new task"
            className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
          />
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 bg-neutral-50 rounded px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:text-neutral-500"
            >
              Add <FiPlus />
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className={`flex w-full items-center gap-1.5 px-3 py-1.5 text-base ${textColorMap[status]} transition-colors hover:text-neutral-50`}
        >
          <span>Add Task</span>
          <FiPlus />
        </button>
      )}
    </>
  );
}
