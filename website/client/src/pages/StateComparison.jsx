import { useMemo } from "react";

function StateComparison({ data }) {
  const comparison = useMemo(() => {
    const states = ["Kerala", "Bihar"];

    return states.map((state) => {
      const rows = data.filter(
        (row) => row.State === state
      );

      if (!rows.length) {
        return {
          state,
          reading: 0,
          arithmetic: 0,
          overall: 0,
        };
      }

      const readingRows = rows.filter((row) =>
        String(row.Subject)
          .toUpperCase()
          .includes("READ")
      );

      const arithmeticRows = rows.filter((row) =>
        String(row.Subject)
          .toUpperCase()
          .includes("ARITH")
      );

      const average = (rows) => {
        if (!rows.length) return 0;

        return (
          rows.reduce(
            (sum, row) =>
              sum + Number(row.Percentage || 0),
            0
          ) / rows.length
        );
      };

      return {
        state,
        reading: average(readingRows),
        arithmetic: average(arithmeticRows),
        overall: average(rows),
      };
    });
  }, [data]);

  return (
    <section className="content-card">

      <div className="section-heading">
        <div>
          <span className="eyebrow">
            STATE ANALYSIS
          </span>

          <h2>Kerala vs Bihar</h2>

          <p className="placeholder-text">
            Comparison of foundational learning
            performance using ASER data.
          </p>
        </div>
      </div>


      {/* COMPARISON CARDS */}

      <div className="metrics">

        {comparison.map((item) => (

          <div
            className="metric-card"
            key={item.state}
          >

            <span>{item.state}</span>

            <strong>
              {Math.round(item.overall * 100)}%
            </strong>

            <small>
              Overall understanding
            </small>

          </div>

        ))}

      </div>


      {/* COMPARISON TABLE */}

      <div className="table-wrap">

        <table>

          <thead>

            <tr>
              <th>State</th>
              <th>Reading</th>
              <th>Arithmetic</th>
              <th>Overall</th>
            </tr>

          </thead>

          <tbody>

            {comparison.map((item) => (

              <tr key={item.state}>

                <td>
                  <strong>{item.state}</strong>
                </td>

                <td>
                  {Math.round(
                    item.reading * 100
                  )}
                  %
                </td>

                <td>
                  {Math.round(
                    item.arithmetic * 100
                  )}
                  %
                </td>

                <td>
                  <strong>
                    {Math.round(
                      item.overall * 100
                    )}
                    %
                  </strong>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </section>
  );
}

export default StateComparison;