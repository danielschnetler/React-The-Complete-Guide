import { useState } from "react";
import "./App.css";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import ProjectDetails from "./components/ProjectDetails";

export interface ITask {
  id: number;
  text: string;
}
export interface IProjectDetails {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  tasks: ITask;
}
export interface IProject {
  selectedProjectId: number | null | undefined;
  projects: IProjectDetails[];
}
function App() {
  const [projectsState, setProjectState] = useState<IProject>({
    selectedProjectId: undefined,
    projects: [],
  });

  function handleStartAddProject() {
    setProjectState((prevValue) => ({
      ...prevValue,
      selectedProjectId: null,
    }));
  }

  function handleAddProject(project: {}) {
    const id = Math.random();
    setProjectState((prevState) => {
      const projectToAdd = { ...project, id: id };

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, projectToAdd],
      };
    });
  }

  function handleCancelAddProject() {
    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: undefined,
    }));
  }

  function handleProjectDetailsClick(id: number) {
    setProjectState((prevState) => ({
      ...prevState,
      selectedProjectId: id,
    }));
  }

  function handleDeleteProjectClick() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        projects: prevState.projects.filter(
          (item) => item.id !== prevState.selectedProjectId
        ),
        selectedProjectId: undefined,
      };
    });
  }

  function handleAddTaskClick(projectId: number, task: string) {
    setProjectState((prevState) => {
      const projectToAdd = prevState.projects.find((item) => item.id === projectId);
      if (!projectToAdd) return;
      const tasksToReAdd = projectToAdd.tasks;
      projectToAdd.tasks =
        tasksToReAdd && tasksToReAdd.length > 0
          ? [...tasksToReAdd, { id: Math.random(), text: task }]
          : [{ id: Math.random(), text: task }];
      const projectsToKeep = prevState.projects.filter(
        (item) => item.id !== projectId
      );
      return {
        ...prevState,
        projects: [...projectsToKeep, projectToAdd],
        selectedProjectId: prevState.selectedProjectId,
      };
    });
  }

  function handleDeleteTaskClick(projectId: number, taskId: number) {
    setProjectState((prevState) => {
      const projectToUpdate = prevState.projects.find(
        (item) => item.id === projectId
      );
      if (!projectToUpdate) return;
      projectToUpdate.tasks = projectToUpdate.tasks.filter(
        (item) => item.id !== taskId
      );
      const projectsToKeep = prevState.projects.filter(
        (item) => item.id !== projectId
      );
      return {
        ...prevState,
        projects: [...projectsToKeep, projectToUpdate],
        selectedProjectId: prevState.selectedProjectId,
      };
    });
  }

  let content;

  if (projectsState.selectedProjectId) {
    const selectedProject = projectsState.projects.find(
      (project) => project.id === projectsState.selectedProjectId
    );
    content = (
      <ProjectDetails
        project={selectedProject}
        onDelete={handleDeleteProjectClick}
        onAddTask={handleAddTaskClick}
        onDeleteTask={handleDeleteTaskClick}
      />
    );
  } else if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject
        handleSave={handleAddProject}
        handleCancel={handleCancelAddProject}
      />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        onProjectDetailsClick={handleProjectDetailsClick}
        projects={[...projectsState.projects]}
        selectedId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
