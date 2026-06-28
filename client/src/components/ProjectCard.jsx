import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import api from "../services/api";
import ExpenseTable from "./ExpenseTable";
import ExpenseForm from "./ExpenseForm";

function ProjectCard({ project, refreshProjects }) {
  const [expanded, setExpanded] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const loadExpenses = async () => {
    try {
      const response = await api.get(`/expenses/${project.id}`);
      setExpenses(response.data);
      setLoaded(true);
    } catch (error) {
      console.error(error);
      alert("Failed to load expenses.");
    }
  };

  const refreshExpenses = async () => {
    try {
      const response = await api.get(`/expenses/${project.id}`);
      setExpenses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleAccordion = () => {
    if (!expanded && !loaded) {
      loadExpenses();
    }

    setExpanded(!expanded);
  };

  const handleAddExpense = () => {
    setSelectedExpense(null);
    setShowExpenseModal(true);
  };

  const handleEditExpense = (expense) => {
    setSelectedExpense(expense);
    setShowExpenseModal(true);
  };

  const handleDeleteExpense = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/expenses/${id}`);

      refreshExpenses();
      refreshProjects();
    } catch (error) {
      console.error(error);
      alert("Failed to delete expense.");
    }
  };

  return (
    <div className="project-card">
      <div
        className="project-header"
        onClick={toggleAccordion}
      >
        <div>
          <h2>{project.project_name}</h2>
          <p>{project.client_name}</p>
        </div>

        <button
          className="expand-btn"
          type="button"
        >
          {expanded ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>

      <div className="budget-grid">
        <div className="budget-box">
          <span>Estimated Budget</span>
          <h3>
            AED{" "}
            {Number(project.estimated_budget).toLocaleString()}
          </h3>
        </div>

        <div className="budget-box">
          <span>Total Expenses</span>
          <h3>
            AED{" "}
            {Number(project.total_expenses).toLocaleString()}
          </h3>
        </div>

        <div className="budget-box">
          <span>Remaining Budget</span>
          <h3>
            AED{" "}
            {Number(project.remaining_budget).toLocaleString()}
          </h3>
        </div>
      </div>

      {expanded && (
        <div className="project-details">
          <div className="expense-header">
            <h3>Expenses</h3>

            <button
              className="add-expense-btn"
              onClick={handleAddExpense}
            >
              + Add Expense
            </button>
          </div>

          <ExpenseTable
            expenses={expenses}
            onEdit={handleEditExpense}
            onDelete={handleDeleteExpense}
          />
        </div>
      )}

      {showExpenseModal && (
        <ExpenseForm
          projectId={project.id}
          expense={selectedExpense}
          closeModal={() => {
            setShowExpenseModal(false);
            setSelectedExpense(null);
          }}
          refreshExpenses={refreshExpenses}
          refreshProjects={refreshProjects}
        />
      )}
    </div>
  );
}

export default ProjectCard;