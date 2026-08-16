import { ChevronDown } from "lucide-react";

function Filters({ state, setState, year, setYear, years }) {
  return (
    <section className="filters">
      <div className="filter">
        <label>State</label>

        <div className="select-wrap">
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            <option>Kerala</option>
            <option>Bihar</option>
          </select>

          <ChevronDown size={16} />
        </div>
      </div>

      <div className="filter">
        <label>Year</label>

        <div className="select-wrap">
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            {years.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <ChevronDown size={16} />
        </div>
      </div>
    </section>
  );
}

export default Filters;