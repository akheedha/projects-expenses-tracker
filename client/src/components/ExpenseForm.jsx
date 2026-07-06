import { useEffect, useState } from "react";
import api from "../services/api";

function ExpenseForm({
  projectId,
  expense,
  closeModal,
  refreshExpenses,
  refreshProjects,
}) {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
  });

  useEffect(() => {
    if (expense) {
      setFormData({
        description: expense.description,
        amount: expense.amount,
        category: expense.category,
      });
    }
  }, [expense]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (expense) {
        await api.put(`/expenses/${expense.id}`, formData);
      } else {
        await api.post("/expenses", {
          project_id: projectId,
          ...formData,
        });
      }

      refreshExpenses();
      refreshProjects();
      closeModal();
    } catch (err) {
      console.error(err);
      alert("Failed to save expense.");
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{expense ? "Edit Expense" : "Add Expense"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Material">Material</option>
            <option value="Labor">Labor</option>
            <option value="Machinery">Machinery</option>
            <option value="Other">Other</option>
          </select>

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
              {expense ? "Update Expense" : "Save Expense"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ExpenseForm;