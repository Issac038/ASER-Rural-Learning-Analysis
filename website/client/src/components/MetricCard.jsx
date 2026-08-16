function MetricCard({ icon, title, value, description }) {
  return (
    <div className="metric-card">
      <div className="metric-icon">
        {icon}
      </div>

      <span>{title}</span>

      <strong>{value}</strong>

      <small>{description}</small>
    </div>
  );
}

export default MetricCard;