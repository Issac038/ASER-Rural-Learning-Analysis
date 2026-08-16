import { useMemo } from "react";
import {
  BookOpen,
  Calculator,
  TrendingUp,
} from "lucide-react";
import MetricCard from "../components/MetricCard";

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

function Dashboard({ filteredStateData, state }) {
  const averagePercentage = useMemo(() => {
    if (!filteredStateData.length) return 0;

    const total = filteredStateData.reduce(
      (sum, row) => sum + Number(row.Percentage || 0),
      0
    );

    return total / filteredStateData.length;
  }, [filteredStateData]);

  const readingData = filteredStateData.filter(
    (row) => row.Subject === "READING"
  );

  const arithmeticData = filteredStateData.filter(
    (row) => row.Subject === "ARITHMETIC"
  );

  const readingPercentage = readingData.length
    ? readingData.reduce(
        (sum, row) => sum + Number(row.Percentage || 0),
        0
      ) / readingData.length
    : 0;

  const arithmeticPercentage = arithmeticData.length
    ? arithmeticData.reduce(
        (sum, row) => sum + Number(row.Percentage || 0),
        0
      ) / arithmeticData.length
    : 0;

  const risk = getRisk(averagePercentage);

  return (
    <>
      <section className="hero-card">
        <div>
          <span className="eyebrow">
            CURRENT LEARNING STATUS
          </span>

          <h2>
            Monitoring foundational learning in {state}
          </h2>

          <p>
            Use the filters to identify where students are
            performing well and where intervention may be required.
          </p>
        </div>

        <div className={`risk-badge ${risk.className}`}>
          <span>{risk.label}</span>

          <strong>
            {Math.round(averagePercentage * 100)}%
          </strong>
        </div>
      </section>

      <section className="metrics">
        <MetricCard
          icon={<BookOpen size={20} />}
          title="Reading"
          value={`${Math.round(readingPercentage * 100)}%`}
          description="Foundational learning"
        />

        <MetricCard
          icon={<Calculator size={20} />}
          title="Arithmetic"
          value={`${Math.round(arithmeticPercentage * 100)}%`}
          description="Foundational learning"
        />

        <MetricCard
          icon={<TrendingUp size={20} />}
          title="Records Analysed"
          value={filteredStateData.length}
          description="From ASER dataset"
        />
      </section>

      <section className="content-card">
        <div className="section-heading">
          <div>
            <span className="eyebrow">DATA OVERVIEW</span>
            <h2>Learning records</h2>
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
                  const percentage = Number(
                    row.Percentage || 0
                  );

                  const rowRisk = getRisk(percentage);

                  return (
                    <tr key={index}>
                      <td>{row.Year}</td>
                      <td>{row["School Type"]}</td>
                      <td>{row.Grade}</td>
                      <td>{row.Subject}</td>
                      <td>{row["Learning level"]}</td>

                      <td>
                        {Math.round(percentage * 100)}%
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
  );
}

export default Dashboard;