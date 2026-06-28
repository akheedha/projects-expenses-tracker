const pool = require("../db/db");

// Add Expense
const addExpense = async (req, res) => {
  try {
    const { project_id, description, amount, category } = req.body;

    if (!project_id || !description || !amount || !category) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO expenses
      (project_id, description, amount, category)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [project_id, description, amount, category]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get Expenses by Project
const getExpenses = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT *
       FROM expenses
       WHERE project_id = $1
       ORDER BY id DESC`,
      [id]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Update Expense
const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, amount, category } = req.body;

    const result = await pool.query(
      `UPDATE expenses
       SET description=$1,
           amount=$2,
           category=$3
       WHERE id=$4
       RETURNING *`,
      [description, amount, category, id]
    );

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Delete Expense
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      `DELETE FROM expenses WHERE id=$1`,
      [id]
    );

    res.status(200).json({
      message: "Expense deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
};