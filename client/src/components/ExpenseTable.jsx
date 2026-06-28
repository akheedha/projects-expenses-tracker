function ExpenseTable({
  expenses,
  onEdit,
  onDelete,
}) {
  return (
    <table className="expense-table">
      <thead>
        <tr>
          <th>Description</th>
          <th>Amount</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {expenses.length === 0 ? (
          <tr>
            <td colSpan="4" className="no-data">
              No expenses added.
            </td>
          </tr>
        ) : (
          expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.description}</td>

              <td>
                AED{" "}
                {Number(expense.amount).toLocaleString()}
              </td>

              <td>{expense.category}</td>

              <td className="action-buttons">
                <button
                  className="edit-btn"
                  onClick={() => onEdit(expense)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => onDelete(expense.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default ExpenseTable;