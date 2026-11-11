import { Link } from "react-router-dom";
import { FiClock, FiStar, FiUsers } from "react-icons/fi";
import ProgressBar from "./ProgressBar";

import { useLMS } from "../../context/LMSContext";

const CourseCard = ({ course, showProgress = false }) => {
  const { getCourseProgress } = useLMS();

  const progress = getCourseProgress(course.id);

  return (
    <div className="course-card">
      <Link
        to={`/courses/${course.id}`}
        className="course-image-link"
      >
        <img
          src={course.image}
          alt={course.title}
          className="course-image"
        />
      </Link>

      <div className="course-card-body">
        <span className="category-tag">
          {course.category}
        </span>

        <h3>{course.title}</h3>

        <p className="instructor-name">
          By {course.instructor}
        </p>

        <div className="course-meta">
          <span>
            <FiStar /> {course.rating || "New"}
          </span>

          <span>
            <FiClock /> {course.duration}
          </span>

          <span>
            <FiUsers /> {course.students}
          </span>
        </div>

        {showProgress && (
          <div className="course-progress">
            <div className="progress-heading">
              <span>Your Progress</span>
              <strong>{progress}%</strong>
            </div>

            <ProgressBar progress={progress} />
          </div>
        )}

        <div className="course-card-footer">
          <strong>
            {course.price === 0
              ? "Free"
              : `$${course.price}`}
          </strong>

          <Link
            to={`/courses/${course.id}`}
            className="btn-primary"
          >
            {showProgress ? "Continue" : "View Course"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;