
import { IProjectDetails } from "../App";
import Tasks from "./Tasks";

interface IProjectDetailsDetail {
  project: IProjectDetails
  onDelete: () => void;
  onAddTask: (id: number, task: string) => void;
  onDeleteTask: (id: number, task: string) => void;
}

const ProjectDetails: React.FC<IProjectDetailsDetail> = ({
  project,
  onDelete,
  onAddTask,
  onDeleteTask,
}) => {
  const formattedDate = new Date(project.dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  function addIdToNewTaskAndForwardToAdd(task: string) {
    onAddTask(project.id, task);
  }

  function addIdToNewTaskAndForwardToDelete(task: string) {
    onDeleteTask(project.id, task);
  }

  return (
    <div className="w-[3] mt-16">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 mb-2">
            {project.title}
          </h1>
          <button
            className="text-stone-600 hover:text-stone-950"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
        <p className="mb-4 text-stone-400">{formattedDate}</p>
        <p className="text-stone-600 whitespace-pre-wrap">
          {project.description}
        </p>
      </header>
      <Tasks onAddTask={addIdToNewTaskAndForwardToAdd} onDeleteTask={addIdToNewTaskAndForwardToDelete} tasks={project.tasks} />
    </div>
  );
};

export default ProjectDetails;
