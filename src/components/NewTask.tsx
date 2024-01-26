import React, { useState } from "react";

interface INewTask {
  onAddTask: (task: string) => void;
}

const NewTask: React.FC<INewTask> = ({ onAddTask }) => {
  const [enteredTask, setEnteredTask] = useState<string>("");

  function handleChange(event: React.ChangeEvent) {
    setEnteredTask(event.target.value);
  }

  function saveTask() {
    if(enteredTask.trim() === "") return;
    onAddTask(enteredTask);
  }

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        onChange={handleChange}
        value={enteredTask}
      />
      <button
        className="text-stone-700 hover:text-stone-950"
        onClick={saveTask}
      >
        Add Task
      </button>
    </div>
  );
};

export default NewTask;
