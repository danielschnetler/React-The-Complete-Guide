import Button from "./Button";

interface IProjectsSidebar {
  onStartAddProject: () => void;
  projects: {
    title: string;
    description: string;
    dueDate: string;
    id: number;
    tasks: string[];
  }[];
  onProjectDetailsClick: (id: number) => void;
  selectedId: number | null | undefined;
}
const ProjectsSidebar: React.FC<IProjectsSidebar> = ({
  onStartAddProject,
  projects,
  onProjectDetailsClick,
  selectedId,
}) => {
  const classes =
    "w-full text-left px-2 py-1 rounded-sm my-1  hover:text-stone-200 hover:bg-stone-800";
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        Your Projects
      </h2>

      <div>
        <Button onClick={onStartAddProject}>+ Add Project</Button>
      </div>
      <ul className="mt-8">
        {projects &&
          projects.map((project) => {
            return (
              <li key={project.id}>
                <button
                  onClick={() => onProjectDetailsClick(project.id)}
                  className={
                    project.id === selectedId
                      ? `${classes} bg-stone-800 text-stone-200`
                      : `${classes} text-stone-400`
                  }
                >
                  {project.title}
                </button>
              </li>
            );
          })}
      </ul>
    </aside>
  );
};
export default ProjectsSidebar;
