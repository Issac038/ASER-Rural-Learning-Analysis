import { useMemo } from "react";

function getRisk(value) {
  if (value < 0.4) {
    return {
      label: "HIGH PRIORITY",
      className: "high",
    };
  }

  if (value < 0.6) {
    return {
      label: "MODERATE",
      className: "moderate",
    };
  }

  return {
    label: "LOW",
    className: "low",
  };
}

function PriorityAreas({ data, state, year }) {
  const priorityRows = useMemo(() => {
    return data
      .filter((row) => {
        const stateMatch = row.State === state;

        const yearMatch =
          year === "All" ||
          String(row.Year) === String(year);

        const percentage = Number(row.Percentage || 0);

        return (
          stateMatch &&
          yearMatch &&
          percentage < 0.4
        );
      })
      .sort(
        (a, b) =>
          Number(a.Percentage || 0) -
          Number(b.Percentage || 0)
      );
  }, [data, state, year]);

  return (
    <section className="content-card priority-card">

      {/* HEADER */}

      <div className="priority-header">

        <div className="priority-title">

          <span className="eyebrow">
            DEO INTERVENTION
          </span>

          <h2>
            High Priority Areas — {state}
          </h2>

          <p>
            Learning areas where fewer than 40% of
            students demonstrate understanding.
          </p>

        </div>

        <div className="priority-count">

          <strong>
            {priorityRows.length} 
          </strong>

          <span>
             High priority areas
          </span>

        </div>

      </div>


      {/* TABLE */}

      {priorityRows.length === 0 ? (

        <div className="empty-state">

          <div className="empty-icon">
            ✓
          </div>

          <h3>
            No high-priority areas
          </h3>

          <p>
            No learning areas for {state}
            {year !== "All" ? ` in ${year}` : ""}
            are below the 40% understanding threshold.
          </p>

        </div>

      ) : (

        <div className="priority-table-wrap">

          <table>

            <thead>

              <tr>
                <th>Year</th>
                <th>Grade</th>
                <th>Subject</th>
                <th>Learning Level</th>
                <th>Understanding</th>
                <th>Priority</th>
              </tr>

            </thead>

            <tbody>

              {priorityRows.map((row, index) => {

                const percentage =
                  Number(row.Percentage || 0);

                const risk =
                  getRisk(percentage);

                return (

                  <tr key={index}>

                    <td>
                      {row.Year}
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
                      <strong>
                        {Math.round(
                          percentage * 100
                        )}
                        %
                      </strong>
                    </td>

                    <td>

                      <span
                        className={`risk-pill ${risk.className}`}
                      >
                        {risk.label}
                      </span>

                    </td>

                  </tr>

                );

              })}

            </tbody>

          </table>

        </div>

      )}

    </section>
  );
}

export default PriorityAreas;