import {
  FaFolderOpen,
  FaWallet,
  FaArrowTrendDown,
  FaArrowTrendUp,
} from "react-icons/fa6";

function DashboardStats({
  totalProjects,
  totalBudget,
  totalSpent,
  totalRemaining,
}) {
  return (
    <div className="dashboard-stats">
      <div className="stat-card">
        <div className="stat-icon blue">
          <FaFolderOpen />
        </div>

        <h4>Total Projects</h4>

        <h2>{totalProjects}</h2>
      </div>

      <div className="stat-card">
        <div className="stat-icon green">
          <FaWallet />
        </div>

        <h4>Total Budget</h4>

        <h2>
          AED {Number(totalBudget).toLocaleString()}
        </h2>
      </div>

      <div className="stat-card">
        <div className="stat-icon red">
          <FaArrowTrendDown />
        </div>

        <h4>Total Spent</h4>

        <h2>
          AED {Number(totalSpent).toLocaleString()}
        </h2>
      </div>

      <div className="stat-card">
        <div className="stat-icon orange">
          <FaArrowTrendUp />
        </div>

        <h4>Remaining Budget</h4>

        <h2>
          AED {Number(totalRemaining).toLocaleString()}
        </h2>
      </div>
    </div>
  );
}

export default DashboardStats;