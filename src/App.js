import { useState } from "react";
import "./app.css";
import Task from "./Task";
import TaskHookForm from "./TaskHookForm";
import PeopleForm from "./PeopleForm";
import { initialTasks, initialTeam } from "./data";
import { toast } from "react-toastify";

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [team, setTeam] = useState(initialTeam);

  function handleTaskSubmit(yeniTask) {
    setTasks([yeniTask, ...tasks]);
  }

  function handlePeopleSubmit(yeniKisi) {
    setTeam([...team, yeniKisi]);
  }

  function handleComplete(id) {
    const tasksCopy = [...tasks];
    const ilgiliTask = tasksCopy.filter((t) => t.id === id)[0];
    ilgiliTask.status = "yapıldı";
    setTasks(tasksCopy);

    toast.success(`Tebrikler! "${ilgiliTask.title}" tamamlandı!`);
  }

  return (
    <div className="app h-screen flex">
      <div className="formColumn bg-[#fff] flex-initial border-r-4 border-solid border-[#f3d4b0] overflow-auto">
        <div className="form-container pt-8 px-8 pb-6 border-b-4 border-solid border-[#ddd] ">
          <h2 className="text-2xl pb-2">Yeni Task</h2>
          <TaskHookForm kisiler={team} submitFn={handleTaskSubmit} />
        </div>

        <div className="form-container pt-8 px-8 pb-6 border-b-4 border-solid border-[#ddd] ">
          <h2 className="text-2xl pb-2">Yeni Kişi</h2>
          <PeopleForm kisiler={team} submitFn={handlePeopleSubmit} />
        </div>
      </div>
      <div className="columns flex-1 flex justify-center flex-wrap pt-8 px-8 pb-6 gap-4 overflow-auto">
        <div className="column flex-1 min-w-240 max-w-360">
          <h2 className="column-title text-2xl pl-3">Yapılacaklar</h2>
          <div className="column-list">
            {tasks
              .filter((t) => t.status === "yapılacak")
              .map((t) => (
                <Task key={t.id} taskObj={t} onComplete={handleComplete} />
              ))}
          </div>
        </div>
        <div className="column flex-1 min-w-240 max-w-360">
          <h2 className="column-title text-2xl pl-3">Tamamlananlar</h2>
          <div className="column-list">
            {tasks
              .filter((t) => t.status === "yapıldı")
              .map((t) => (
                <Task key={t.id} taskObj={t} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
