import React, { useState } from "react";
import { FaPaintBrush, FaCheck } from "react-icons/fa";

export function Task({ id, text, status, setTasks, tasks, handleDragStart }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditting, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(text);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleEditMod = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleChangeText = () => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { id, status, text: newText } : task
    );

    setTasks(newTasks);
    setIsEditing(false);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleChangeText();
    }
  };

  const bgColorMap = {
    backlog: "bg-neutral-500",
    todo: "bg-yellow-500",
    inProgress: "bg-blue-500",
    done: "bg-green-500",
  };

  return (
    <>
      <div
        onDragStart={(e) => handleDragStart(e, { id, text, status })}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        draggable="true"
        className={`flex items-center cursor-grab rounded-xl border border-neutral-700 ${bgColorMap[status]} p-3 acitve:cursor-grabbing ${id}`}
      >
        {isEditting ? (
          <form className="w-full">
            <textarea
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={text}
              autoFocus
              className="w-full font-semibold rounded border border-violet-400 bg-violet-400/20 p-3 text-xl text-neutral-50 placeholder-violet-300 focus:outline-0"
            ></textarea>
          </form>
        ) : (
          <>
            <FaCheck className="text-neutral-50" />
            <p className="grow-10 font-semibold text-base text-neutral-100">
              {text}
            </p>
            {isHovered && (
              <button
                onClick={handleEditMod}
                className="grow-0 left-2 top-2 rounded border border-neutral-500 z-10 "
              >
                <FaPaintBrush size={14} className="text-neutral-100 " />
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
}
