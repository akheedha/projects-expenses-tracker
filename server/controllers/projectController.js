const pool = require("../db/db");

// Create Project
const createProject = async (req, res) => {
  try {
    const { project_name, client_name, estimated_budget } = req.body;

    if (!project_name || !client_name || !estimated_budget) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO projects
      (project_name, client_name, estimated_budget)
      VALUES ($1,$2,$3)
      RETURNING *`,
      [project_name, client_name, estimated_budget]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get All Projects
const getProjects = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        p.id,
        p.project_name,
        p.client_name,
        p.estimated_budget,
        COALESCE(SUM(e.amount),0) AS total_expenses,
        p.estimated_budget - COALESCE(SUM(e.amount),0) AS remaining_budget
      FROM projects p
      LEFT JOIN expenses e
      ON p.id = e.project_id
      GROUP BY p.id
      ORDER BY p.id;
    `);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get Single Project + Expenses
const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await pool.query(
      `
      SELECT
        p.id,
        p.project_name,
        p.client_name,
        p.estimated_budget,
        COALESCE(SUM(e.amount),0) AS total_expenses,
        p.estimated_budget - COALESCE(SUM(e.amount),0) AS remaining_budget
      FROM projects p
      LEFT JOIN expenses e
      ON p.id=e.project_id
      WHERE p.id=$1
      GROUP BY p.id
      `,
      [id]
    );

    const expenses = await pool.query(
      `
      SELECT *
      FROM expenses
      WHERE project_id=$1
      ORDER BY id DESC
      `,
      [id]
    );

    res.json({
      project: project.rows[0],
      expenses: expenses.rows,
    });
  } catch (error) {
    console.error("PROJECT ERROR:", error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
};