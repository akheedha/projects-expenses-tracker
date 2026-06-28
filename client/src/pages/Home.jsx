import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/ProjectForm";
import api from "../services/api";

function Home() {
  const [projects, setProjects] = useState([]);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="container">
      <div className="top-bar">
        <div>
          <h1>Projects</h1>
          <p>Manage projects and track expenses.</p>
        </div>

        <button
          className="add-project-btn"
          onClick={() => setShowProjectModal(true)}
        >
          + Add Project
        </button>
      </div>

      {loading ? (
        <div className="empty-state">
          <h3>Loading projects...</h3>
        </div>
      ) : projects.length === 0 ? (
        <div className="empty-state">
          <h3>No projects found</h3>
          <p>Create your first project.</p>
        </div>
      ) : (
        projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            refreshProjects={fetchProjects}
          />
        ))
      )}

      {showProjectModal && (
        <ProjectForm
          closeModal={() => setShowProjectModal(false)}
          refreshProjects={fetchProjects}
        />
      )}
    </div>
  );
}

export default Home;