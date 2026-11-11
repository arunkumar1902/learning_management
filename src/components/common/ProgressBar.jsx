// import "../../styles/courses.css";

const ProgressBar = ({ progress = 0 }) => {
  const value = Math.min(100, Math.max(0, progress));

  return (
    <div className="progress-wrapper">
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${value}%` }}
        />
      </div>

      <span>{value}%</span>
    </div>
  );
};

export default ProgressBar;