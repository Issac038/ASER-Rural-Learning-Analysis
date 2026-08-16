import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  LayoutDashboard,
  Map,
  AlertTriangle,
  ChevronDown,
  BookOpen,
  Calculator,
  TrendingUp,
} from "lucide-react";

import "./App.css";

import Dashboard from "./pages/Dashboard";
import StateComparison from "./pages/StateComparison";
import PriorityAreas from "./pages/PriorityAreas";

const API = "http://localhost:5000";

function getRisk(value) {
  if (value < 0.4) {
    return {
      label: "High Risk",
      className: "high",
    };
  }

  if (value < 0.6) {
    return {
      label: "Moderate",
      className: "moderate",
    };
  }

  return {
    label: "Low Risk",
    className: "low",
  };
}

function App() {
  const [page, setPage] = useState("dashboard");

  const [allIndia, setAllIndia] = useState([]);
  const [keralaBihar, setKeralaBihar] = useState([]);

  const [state, setState] = useState("Kerala");
  const [year, setYear] = useState("All");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [indiaRes, stateRes] = await Promise.all([
          axios.get(`${API}/api/all-india`),
          axios.get(`${API}/api/kerala-bihar`),
        ]);

        setAllIndia(indiaRes.data);
        setKeralaBihar(stateRes.data);
      } catch (error) {
        console.error("Failed to load ASER data:", error);
      }
    };

    loadData();
  }, []);

  const years = useMemo(() => {
    const uniqueYears = [
      ...new Set(
        keralaBihar
          .map((row) => String(row.Year))
          .filter((year) => year !== "undefined")
      ),
    ];

    return ["All", ...uniqueYears.sort()];
  }, [keralaBihar]);

  const filteredStateData = useMemo(() => {
    return keralaBihar.filter((row) => {
      const stateMatch = row.State === state;

      const yearMatch =
        year === "All" ||
        String(row.Year) === String(year);

      return stateMatch && yearMatch;
    });
  }, [keralaBihar, state, year]);

  const averagePercentage = useMemo(() => {
    if (!filteredStateData.length) return 0;

    const total = filteredStateData.reduce(
      (sum, row) => sum + Number(row.Percentage || 0),
      0
    );

    return total / filteredStateData.length;
  }, [filteredStateData]);

  const risk = getRisk(averagePercentage);

  return (
    <div className="app">

      {/* ================= SIDEBAR ================= */}

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
            className={
              page === "dashboard"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => setPage("dashboard")}
          >
            <LayoutDashboard size={19} />
            Dashboard
          </button>

          <button
            className={
              page === "comparison"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() => setPage("comparison")}
          >
            <Map size={19} />
            State Comparison
          </button>

          <button
            className={
              page === "risk"
                ? "nav-item active"
                : "nav-item"
            }
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


      {/* ================= MAIN ================= */}

      <main className="main">

        <header className="topbar">

          <div>
            <span className="eyebrow">
              DISTRICT EDUCATION OFFICER
            </span>

            <h1>
              {page === "dashboard" &&
                "Learning Overview"}

              {page === "comparison" &&
                "State Comparison"}

              {page === "risk" &&
                "Priority Learning Areas"}
            </h1>
          </div>

          <div className="header-status">
            <span className="status-dot"></span>
            Live Dataset
          </div>

        </header>


        {/* ================= FILTERS ================= */}

        {(page === "dashboard" || page === "risk") && (
          <section className="filters">

            {/* STATE FILTER */}

            <div className="filter">

              <label>State</label>

              <div className="select-wrap">

                <select
                  value={state}
                  onChange={(e) =>
                    setState(e.target.value)
                  }
                >

                  <option value="Kerala">
                    Kerala
                  </option>

                  <option value="Bihar">
                    Bihar
                  </option>

                </select>

                <ChevronDown size={16} />

              </div>

            </div>


            {/* YEAR FILTER */}

            <div className="filter">

              <label>Year</label>

              <div className="select-wrap">

                <select
                  value={year}
                  onChange={(e) =>
                    setYear(e.target.value)
                  }
                >

                  {years.map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}

                </select>

                <ChevronDown size={16} />

              </div>

            </div>

          </section>
        )}


        {/* ================= DASHBOARD ================= */}

        {page === "dashboard" && (
          <>

            <section className="hero-card">

              <div>

                <span className="eyebrow">
                  CURRENT LEARNING STATUS
                </span>

                <h2>
                  Monitoring foundational learning in{" "}
                  {state}
                </h2>

                <p>
                  Use the filters to identify where
                  students are performing well and
                  where intervention may be required.
                </p>

              </div>

              <div
                className={`risk-badge ${risk.className}`}
              >

                <span>
                  {risk.label}
                </span>

                <strong>
                  {Math.round(
                    averagePercentage * 100
                  )}
                  %
                </strong>

              </div>

            </section>


            {/* METRICS */}

            <section className="metrics">

              {/* READING */}

              <div className="metric-card">

                <div className="metric-icon">
                  <BookOpen size={20} />
                </div>

                <span>Reading</span>

                <strong>
                  {(() => {

                    const readingRows =
                      filteredStateData.filter(
                        (row) =>
                          String(row.Subject)
                            .toUpperCase()
                            .includes("READ")
                      );

                    if (!readingRows.length) {
                      return "—";
                    }

                    const average =
                      readingRows.reduce(
                        (sum, row) =>
                          sum +
                          Number(
                            row.Percentage || 0
                          ),
                        0
                      ) / readingRows.length;

                    return `${Math.round(
                      average * 100
                    )}%`;

                  })()}
                </strong>

                <small>
                  Foundational learning
                </small>

              </div>


              {/* ARITHMETIC */}

              <div className="metric-card">

                <div className="metric-icon">
                  <Calculator size={20} />
                </div>

                <span>Arithmetic</span>

                <strong>
                  {(() => {

                    const arithmeticRows =
                      filteredStateData.filter(
                        (row) =>
                          String(row.Subject)
                            .toUpperCase()
                            .includes("ARITH")
                      );

                    if (!arithmeticRows.length) {
                      return "—";
                    }

                    const average =
                      arithmeticRows.reduce(
                        (sum, row) =>
                          sum +
                          Number(
                            row.Percentage || 0
                          ),
                        0
                      ) / arithmeticRows.length;

                    return `${Math.round(
                      average * 100
                    )}%`;

                  })()}
                </strong>

                <small>
                  Foundational learning
                </small>

              </div>


              {/* RECORDS */}

              <div className="metric-card">

                <div className="metric-icon">
                  <TrendingUp size={20} />
                </div>

                <span>
                  Records Analysed
                </span>

                <strong>
                  {filteredStateData.length}
                </strong>

                <small>
                  From ASER dataset
                </small>

              </div>

            </section>


            {/* DATA TABLE */}

            <section className="content-card">

              <div className="section-heading">

                <div>

                  <span className="eyebrow">
                    DATA OVERVIEW
                  </span>

                  <h2>
                    Learning records
                  </h2>

                </div>

                <span className="record-count">
                  {filteredStateData.length} records
                </span>

              </div>


              <div className="table-wrap">

                <table>

                  <thead>

                    <tr>
                      <th>Year</th>
                      <th>School Type</th>
                      <th>Grade</th>
                      <th>Subject</th>
                      <th>Learning Level</th>
                      <th>Understanding</th>
                      <th>Risk</th>
                    </tr>

                  </thead>

                  <tbody>

                    {filteredStateData
                      .slice(0, 10)
                      .map((row, index) => {

                        const percentage =
                          Number(
                            row.Percentage || 0
                          );

                        const rowRisk =
                          getRisk(percentage);

                        return (
                          <tr key={index}>

                            <td>
                              {row.Year}
                            </td>

                            <td>
                              {row["School Type"]}
                            </td>

                            <td>
                              {row.Grade}
                            </td>

                            <td>
                              {row.Subject}
                            </td>

                            <td>
                              {row["Learning level"]}
                            </td>

                            <td>
                              {Math.round(
                                percentage * 100
                              )}
                              %
                            </td>

                            <td>

                              <span
                                className={`risk-pill ${rowRisk.className}`}
                              >
                                {rowRisk.label}
                              </span>

                            </td>

                          </tr>
                        );

                      })}

                  </tbody>

                </table>

              </div>

            </section>

          </>
        )}


        {/* ================= STATE COMPARISON ================= */}

        {page === "comparison" && (
          <StateComparison
            data={keralaBihar}
          />
        )}


        {/* ================= PRIORITY AREAS ================= */}

        {page === "risk" && (
          <PriorityAreas
            data={keralaBihar}
            state={state}
            year={year}
          />
        )}

      </main>

    </div>
  );
}

export default App;