import { ITask } from "../App";
import NewTask from "./NewTask";

interface ITaskDetails {
  onAddTask: (task: string) => void;
  onDeleteTask: (task: string) => void;
  tasks: ITask[];
}

const Tasks: React.FC<ITaskDetails> = ({ onAddTask, onDeleteTask, tasks }) => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>

      <ul className="p-4 mt-8 rounded-md bg-stone-100">
        <NewTask onAddTask={onAddTask} />
        {tasks && tasks.length > 0 &&
          tasks.map((item) => (
            <li key={item.id}>
              <span className="flex justify-between my-4">{item.text}</span>
              <button
                className="text-stone-700 hover:text-red-500 ml-10"
                onClick={() => onDeleteTask(item.id)}
              >
                Delete Task
              </button>
            </li>
          ))}
        {!tasks && (
          <p className="text-stone-800 mb-4">
            This project does not have any tasks yet.
          </p>
        )}
      </ul>
    </section>
  );
};

export default Tasks;
