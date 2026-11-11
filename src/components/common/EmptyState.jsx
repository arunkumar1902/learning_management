import { FiBookOpen } from "react-icons/fi";

const EmptyState = ({
  title = "No courses found",
  message = "There is nothing to display here yet."
}) => {
  return (
    <div className="empty-state">
      <FiBookOpen size={42} />

      <h3>{title}</h3>

      <p>{message}</p>
    </div>
  );
};

export default EmptyState;