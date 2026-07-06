import {
  FaChartPie,
  FaFolderOpen,
  FaChartLine,
  FaGear,
} from "react-icons/fa6";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>🏗 BuildMetrics AI</h2>
        <p>Construction Intelligence</p>
      </div>

      <nav className="sidebar-menu">

        <div className="menu-item active">
          <FaChartPie />
          <span>Dashboard</span>
        </div>


      </nav>
    </aside>
  );
}

export default Sidebar;