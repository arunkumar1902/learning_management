import { FiCheckCircle, FiAlertCircle, FiX } from "react-icons/fi";

const Toast = ({ message, type = "success", onClose }) => {
  if (!message) return null;

  return (
    <div className={`toast toast-${type}`}>
      {type === "success" ? (
        <FiCheckCircle />
      ) : (
        <FiAlertCircle />
      )}

      <span>{message}</span>

      <button onClick={onClose}>
        <FiX />
      </button>
    </div>
  );
};

export default Toast;