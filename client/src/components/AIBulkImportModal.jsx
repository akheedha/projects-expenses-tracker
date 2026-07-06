import { useState } from "react";
import api from "../services/api";

function AIBulkImportModal({
  projectId,
  closeModal,
  refreshExpenses,
  refreshProjects,
}) {
  const [expenseText, setExpenseText] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState([]);

  const analyzeExpenses = async () => {
    if (!expenseText.trim()) {
      alert("Please paste your expenses.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/ai/bulk-import", {
        text: expenseText,
      });

      setPreview(res.data.data);

    } catch (err) {
      console.error(err);
      alert("AI failed to analyze expenses.");
    } finally {
      setLoading(false);
    }
  };

  const importExpenses = async () => {
    try {
      setLoading(true);

      for (const expense of preview) {
        await api.post("/expenses", {
          project_id: projectId,
          description: expense.description,
          amount: expense.amount,
          category: expense.category,
        });
      }

      alert("Expenses imported successfully!");

      refreshExpenses();
      refreshProjects();
      closeModal();

    } catch (err) {
      console.error(err);
      alert("Failed to import expenses.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div
        className="modal"
        style={{ width: "700px", maxWidth: "95%" }}
      >
        <h2>✨ AI Bulk Expense Import</h2>

        <p
          style={{
            marginBottom: "15px",
            color: "#666",
          }}
        >
          Paste multiple expenses and let AI organize them automatically.
        </p>

        <textarea
          rows="8"
          placeholder={`Example:

Purchased Cement - AED 3200
Labor Payment - AED 4500
Fuel - AED 350`}
          value={expenseText}
          onChange={(e) => setExpenseText(e.target.value)}
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "10px",
            border: "1px solid #ddd",
            resize: "vertical",
            marginBottom: "20px",
          }}
        />

        <button
          className="save-btn"
          style={{
            width: "100%",
            marginBottom: "20px",
          }}
          onClick={analyzeExpenses}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "✨ Analyze with AI"}
        </button>

        {preview.length > 0 && (
          <>
            <h3 style={{ marginBottom: "15px" }}>
              AI Preview
            </h3>

            <table className="expense-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Category</th>
                </tr>
              </thead>

              <tbody>
                {preview.map((expense, index) => (
                  <tr key={index}>
                    <td>{expense.description}</td>

                    <td>
                      AED {expense.amount}
                    </td>

                    <td>{expense.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        <div className="modal-actions">
          <button
            className="cancel-btn"
            onClick={closeModal}
          >
            Cancel
          </button>

          {preview.length > 0 && (
            <button
              className="save-btn"
              onClick={importExpenses}
              disabled={loading}
            >
              Import Expenses
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AIBulkImportModal;