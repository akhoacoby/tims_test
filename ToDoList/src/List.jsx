import React, { useState } from "react";
import { Task } from "./Task/task";
import { AddTask } from "./Task/addTask";

export default function List({
  title,
  status,
  tasks,
  setTasks,
  getNextId,
  headingColor,
}) {
  const [active, setActive] = useState(false);
  const filterTasks = tasks.filter((task) => task.status === status);
  const bgColorMap = {
    "bg-neutral-400": "bg-neutral-700",
    "bg-yellow-300/75": "bg-yellow-300/50",
    "bg-blue-300/75": "bg-blue-300/50",
    "bg-emerald-300/75": "bg-green-300/50",
  };

  //-------------------------------INDICATOR-----------------------------
  const DropIndicator = ({ beforeId, status }) => {
    return (
      <div
        data-before={beforeId || "-1"}
        data-column={status}
        className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
      ></div>
    );
  };

  const highlightIndicator = (e) => {
    const indicators = getIndicators();
    clearHighlights(indicators);
    const el = getNeareastIndicator(e, indicators);
    el.element.style.opacity = "100";
  };

  const clearHighlights = (els) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${status}"]`));
  };

  const getNeareastIndicator = (e, indicators) => {
    const DISTANCE_OFFSET = 50;
    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - (box.top + DISTANCE_OFFSET);
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );
    return el;
  };
  //-----------------------------------------------------------------------------

  //---------------------------DRAG & DROP----------------------------------------
  const handleDragStart = (e, task) => {
    e.dataTransfer.setData("taskid", task.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
    clearHighlights();
  };

  const handleDrop = (e) => {
    setActive(false);
    clearHighlights();

    const taskId = Number(e.dataTransfer.getData("taskid"));

    const indicators = getIndicators();
    const { element } = getNeareastIndicator(e, indicators);

    const before = Number(element.dataset.before || "-1");
    console.log(taskId, before);

    if (before !== taskId) {
      let copy = [...tasks];

      let taskToTransfer = copy.find((c) => c.id === taskId);

      if (!taskToTransfer) return;

      taskToTransfer = { ...taskToTransfer, status };

      copy = copy.filter((c) => c.id !== taskId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(taskToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, taskToTransfer);
      }

      setTasks(copy);
    }
  };
  //----------------------------------------------------------------------------------

  return (
    <div
      className={`w-56 shrink-0 ${status} ${bgColorMap[headingColor]} rounded-xl`}
    >
      <div className="mb-3 flex item-center justify-between">
        <h2
          className={`titlename ml-2 mt-2 font-bold tracking-wide text-neutral-50 p-2 rounded-full shadow-2xs ${headingColor}`}
        >
          {title}
        </h2>
        <span className="count mr-5 mt-4 font-bold rounded text-medium text-neutral-100">
          {filterTasks.length}
        </span>
      </div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`h-full w-full transition-colors ${
          !active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {filterTasks.map((task) => (
          <React.Fragment key={task.id}>
            <DropIndicator beforeId={task.id} status={status} />
            <Task
              id={task.id}
              text={task.text}
              status={task.status}
              setTasks={setTasks}
              tasks={tasks}
              handleDragStart={handleDragStart}
            />
          </React.Fragment>
        ))}
        <DropIndicator beforeId={null} status={status} />
        <AddTask status={status} setTasks={setTasks} getNextId={getNextId} />
      </div>
    </div>
  );
}
