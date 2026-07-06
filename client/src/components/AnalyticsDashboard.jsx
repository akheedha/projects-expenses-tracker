import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function AnalyticsDashboard({ projects }) {
  const pieData = [
    {
      name: "Spent",
      value: projects.reduce(
        (sum, p) => sum + Number(p.total_expenses || 0),
        0
      ),
    },
    {
      name: "Remaining",
      value: projects.reduce(
        (sum, p) => sum + Number(p.remaining_budget || 0),
        0
      ),
    },
  ];

  const barData = projects.map((project) => ({
    name: project.project_name,
    Budget: Number(project.estimated_budget),
    Spent: Number(project.total_expenses),
  }));

  const COLORS = ["#2563eb", "#16a34a"];

  return (
    <div className="analytics-section">
      <h2>📊 Analytics Dashboard</h2>

      <div className="analytics-grid">
        <div className="chart-card">
          <h3>Budget Overview</h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Project Budgets</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="Budget"
                fill="#2563eb"
              />

              <Bar
                dataKey="Spent"
                fill="#16a34a"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsDashboard;