import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import List from "./List";
import BurnBarrel from "./Task/BurnBarrel";
import { BsCircleHalf } from "react-icons/bs";

function App() {
  const [tasks, setTasks] = useState([]);
  const [hasChecked, setHasChecked] = useState(false);
  const [theme, setTheme] = useState(false);
  const nextIdRef = useRef(0);

  useEffect(() => {
    hasChecked && localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const taskData = localStorage.getItem("tasks");

    setTasks(taskData ? JSON.parse(taskData) : []);
    setHasChecked(true);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("nextId");
    nextIdRef.current = stored ? parseInt(stored, 10) : 0;
  }, []);

  useEffect(() => {
    if (theme) {
      //change background
      document.documentElement.style.backgroundImage =
        "url('src/paperbackground.jpg')";
      document.documentElement.style.backgroundSize = "cover"; // optional
      document.documentElement.style.backgroundRepeat = "no-repeat"; // optional
      document.documentElement.style.backgroundPosition = "center"; // optional

      //change h1
      document
        .getElementsByTagName("h1")[0]
        .style.setProperty("color", "var(--color-neutral-950)");

      //change buttons
      const btns = document.getElementsByClassName("topbutton");

      for (let i = 0; i < btns.length; i++) {
        btns[i].style.backgroundColor = "#111827"; // dark background
        btns[i].style.color = "#f5f5f5"; // light text
        btns[i].style.borderRadius = "0.5rem"; // rounded corners
      }

      //change title color on each list
      const titlename = document.getElementsByClassName("titlename");

      for (let i = 0; i < titlename.length; i++) {
        titlename[i].style.color = "var(--color-violet-500)"; // light text
      }

      //change count number color on each list
      const count = document.getElementsByClassName("count");

      for (let i = 0; i < count.length; i++) {
        count[i].style.color = "var(--color-violet-500)"; // light text
      }
    } else {
      //change background
      document.documentElement.style.backgroundImage = "none"; // fallback or reset

      //change h1
      document
        .getElementsByTagName("h1")[0]
        .style.setProperty("color", "antiquewhite");

      //change buttons
      const btns = document.getElementsByClassName("topbutton");

      for (let i = 0; i < btns.length; i++) {
        btns[i].style.backgroundColor = "#f5f5f5"; // dark background
        btns[i].style.color = "#111827"; // light text
        btns[i].style.borderRadius = "0.5rem"; // rounded corners
      }

      //change title color on each list
      const titlename = document.getElementsByClassName("titlename");

      for (let i = 0; i < titlename.length; i++) {
        titlename[i].style.color = "var(--color-neutral-50)"; // light text
      }

      //change count number color on each list
      const count = document.getElementsByClassName("count");

      for (let i = 0; i < count.length; i++) {
        count[i].style.color = "var(--color-neutral-100)"; // light text
      }
    }
  }, [theme]);

  const getNextId = () => {
    const nextId = nextIdRef.current;
    nextIdRef.current += 1;
    localStorage.setItem("nextId", nextIdRef.current.toString());
    return nextId;
  };

  return (
    <main className="h-screen w-full text-neutral-500">
      <div className="flex">
        <button
          onClick={() => {
            localStorage.setItem("tasks", JSON.stringify([]));
            setTasks([]);
          }}
          className="topbutton flex items-center ml-3 mt-3 gap-1.5 bg-neutral-50 rounded px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:text-neutral-500"
        >
          Reset
        </button>
        <button
          onClick={() => {
            localStorage.clear();
          }}
          className="topbutton flex items-center ml-3 mt-3 gap-1.5 bg-neutral-50 rounded px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:text-neutral-500"
        >
          Delete Log
        </button>

        <button
          onClick={() => {
            setTheme((prev) => !prev);
          }}
          className="topbutton flex items-center ml-3 mt-3 gap-1.5 bg-neutral-50 rounded px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:text-neutral-500"
        >
          <BsCircleHalf />
          <span>Theme</span>
        </button>
      </div>

      <div>
        <h1>WELCOME TO YOUR TO-DO LIST</h1>
      </div>

      <div className="flex h-full w-full gap-3 overflow-scroll p-12">
        <List
          title="Backlog"
          status="backlog"
          tasks={tasks}
          setTasks={setTasks}
          getNextId={getNextId}
          headingColor="bg-neutral-400"
        />
        <List
          title="To-do"
          status="todo"
          tasks={tasks}
          setTasks={setTasks}
          getNextId={getNextId}
          headingColor="bg-yellow-300/75"
        />
        <List
          title="In progress"
          status="inProgress"
          tasks={tasks}
          setTasks={setTasks}
          getNextId={getNextId}
          headingColor="bg-blue-300/75"
        />
        <List
          title="Completed"
          status="done"
          tasks={tasks}
          setTasks={setTasks}
          getNextId={getNextId}
          headingColor="bg-emerald-300/75"
        />
        <BurnBarrel setTasks={setTasks} />
      </div>
    </main>
  );
}

export default App;
