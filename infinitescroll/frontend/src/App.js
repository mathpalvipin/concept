import { useState } from "react";
import "./App.css";
import Task from "./pages/Task";

import Event from "./pages/Event.js";

function App() {
  const [task, setTask] = useState(false);
  return (
    <div className="App flex justify-center bg-gray-400">
      <div className="relative w-full  h-screen overflow-y-auto bg-white  md:w-3/6 border-2 border-black shadow-cyan-500/50">
        <div className="sticky top-0 h-10 w-full  bg-gray-700 text-white flex justify-evenly items-center z-10 ">
          <div
            onClick={() => setTask(!task)}
            className={` border-0 ${
              !task ? "bg-slate-100 text-black " : "rounded-br-sm "
            }  w-full h-full flex justify-center items-center`}
          >
            Task Page
          </div>
          <div
            onClick={() => setTask(!task)}
            className={`${
              task ? "bg-slate-100 text-black " : "rounded-bl-lg "
            }border-0  w-full h-full flex justify-center items-center`}
          >
            Event Page
          </div>
        </div>
        {task ? <Task></Task> : <Event></Event>}
      </div>
    </div>
  );
}

export default App;
