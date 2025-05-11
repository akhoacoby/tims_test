import React, { useState } from "react";
import { FaFire } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";

export default function BurnBarrel({ setTasks }) {
  const [active, setActive] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDrop = (e) => {
    const taskId = Number(e.dataTransfer.getData("taskid"));
    setTasks((pv) => pv.filter((c) => c.id !== taskId));
    console.log("Dropped taskId:", taskId);
    setActive(false);
  };
  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`mt10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3rl ${
        active
          ? "border-red-800 bg-red-800/20 text-red-500"
          : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
      }`}
    >
      {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
    </div>
  );
}
