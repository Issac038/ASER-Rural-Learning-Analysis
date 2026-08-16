import {
  LayoutDashboard,
  Map,
  AlertTriangle,
} from "lucide-react";

function Sidebar({ page, setPage }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">A</div>

        <div>
          <h2>ASER Monitor</h2>
          <span>DEO Portal</span>
        </div>
      </div>

      <nav>
        <button
          className={page === "dashboard" ? "nav-item active" : "nav-item"}
          onClick={() => setPage("dashboard")}
        >
          <LayoutDashboard size={19} />
          Dashboard
        </button>

        <button
          className={page === "comparison" ? "nav-item active" : "nav-item"}
          onClick={() => setPage("comparison")}
        >
          <Map size={19} />
          State Comparison
        </button>

        <button
          className={page === "risk" ? "nav-item active" : "nav-item"}
          onClick={() => setPage("risk")}
        >
          <AlertTriangle size={19} />
          Priority Areas
        </button>
      </nav>

      <div className="sidebar-bottom">
        <span>Data Source</span>
        <strong>ASER Rural Learning Data</strong>
      </div>
    </aside>
  );
}

export default Sidebar;