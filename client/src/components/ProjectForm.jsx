import { useState } from "react";
import api from "../services/api";

function ProjectForm({ closeModal, refreshProjects }) {
  const [formData, setFormData] = useState({
    project_name: "",
    client_name: "",
    estimated_budget: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/projects", formData);

      refreshProjects();

      closeModal();
    } catch (error) {
      console.error(error);
      alert("Unable to create project.");
    }
  };

  return (
    <div className="modal-backdrop">

      <div className="modal">

        <h2>Add Project</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="project_name"
            placeholder="Project Name"
            value={formData.project_name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="client_name"
            placeholder="Client Name"
            value={formData.client_name}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="estimated_budget"
            placeholder="Estimated Budget"
            value={formData.estimated_budget}
            onChange={handleChange}
            required
          />

          <div className="modal-actions">

            <button
              type="button"
              className="cancel-btn"
              onClick={closeModal}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
            >
              Save Project
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default ProjectForm;