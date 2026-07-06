import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/ProjectForm";
import DashboardStats from "../components/DashboardStats";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import AIAssistant from "../components/AIAssistant";
import AnalyticsDashboard from "../components/AnalyticsDashboard";




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

  const totalProjects = projects.length;

  const totalBudget = projects.reduce(
    (sum, project) => sum + Number(project.estimated_budget || 0),
    0
  );

  const totalSpent = projects.reduce(
    (sum, project) => sum + Number(project.total_expenses || 0),
    0
  );

  const totalRemaining = projects.reduce(
    (sum, project) => sum + Number(project.remaining_budget || 0),
    0
  );

  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        <div className="container">

          <div className="top-bar">
            <div>
              <h1>Welcome back 👋</h1>

              <p>
                Manage construction projects, budgets and expenses with AI.
              </p>
            </div>

            <button
              className="add-project-btn"
              onClick={() => setShowProjectModal(true)}
            >
              + Add Project
            </button>
          </div>

          <DashboardStats
            totalProjects={totalProjects}
            totalBudget={totalBudget}
            totalSpent={totalSpent}
            totalRemaining={totalRemaining}
          />

        <AnalyticsDashboard projects={projects} />

          {loading ? (
            <div className="empty-state">
              <h3>Loading projects...</h3>
            </div>
          ) : projects.length === 0 ? (
            <div className="empty-state">
              <h3>No Projects Found</h3>
              <p>Create your first construction project.</p>
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
<AIAssistant />
      </main>

    </div>
  );
}

export default Home;