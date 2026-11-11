import {
  FiCheckCircle,
  FiCircle,
  FiPlayCircle,
  FiClock
} from "react-icons/fi";

const LessonItem = ({
  lesson,
  index,
  completed,
  active,
  onClick
}) => {
  return (
    <div
      className={`lesson-item ${active ? "active" : ""}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick();
        }
      }}
    >
      <div className="lesson-status">
        {completed ? (
          <FiCheckCircle className="completed-icon" />
        ) : active ? (
          <FiPlayCircle />
        ) : (
          <FiCircle />
        )}
      </div>

      <div className="lesson-info">
        <span>Lesson {index + 1}</span>
        <strong>{lesson.title}</strong>
        <small>
          <FiClock /> {lesson.duration}
        </small>
      </div>
    </div>
  );
};

export default LessonItem;