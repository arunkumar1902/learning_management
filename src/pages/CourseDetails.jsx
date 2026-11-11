import { Link, useNavigate, useParams } from "react-router-dom";

import {
  FiClock,
  FiStar,
  FiUsers,
  FiBookOpen,
  FiCheckCircle
} from "react-icons/fi";

import { useLMS } from "../context/LMSContext";
import LessonItem from "../components/common/LessonItem";
import ProgressBar from "../components/common/ProgressBar";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    courses,
    enrolledCourses,
    enrollCourse,
    getCourseProgress,
    completedLessons
  } = useLMS();

  const course = courses.find(
    (item) => item.id === Number(id)
  );

  if (!course) {
    return <div className="empty-state">Course not found.</div>;
  }

  const isEnrolled = enrolledCourses.includes(course.id);
  const progress = getCourseProgress(course.id);

  const completed = completedLessons[course.id] || [];

  const handleEnroll = () => {
    enrollCourse(course.id);
  };

  const startLearning = () => {
    if (course.lessons.length) {
      navigate(`/lesson/${course.id}/${course.lessons[0].id}`);
    }
  };

  return (
    <div className="course-details-page">
      <div className="details-hero">
        <div className="details-information">
          <span className="category-tag">{course.category}</span>

          <h1>{course.title}</h1>

          <p>{course.description}</p>

          <div className="details-meta">
            <span><FiStar /> {course.rating || "New"} Rating</span>
            <span><FiUsers /> {course.students} Students</span>
            <span><FiClock /> {course.duration}</span>
          </div>

          <p>Created by <strong>{course.instructor}</strong></p>

          <h2>
            {course.price === 0 ? "Free" : `$${course.price}`}
          </h2>

          {!isEnrolled ? (
            <button
              className="btn-primary"
              onClick={handleEnroll}
            >
              Enrol Now
            </button>
          ) : (
            <button
              className="btn-primary"
              onClick={startLearning}
            >
              Continue Learning
            </button>
          )}
        </div>

        <img
          src={course.image}
          alt={course.title}
          className="details-image"
        />
      </div>

      {isEnrolled && (
        <div className="details-progress">
          <h3>Your Course Progress</h3>
          <ProgressBar progress={progress} />
        </div>
      )}

      <div className="details-content">
        <section>
          <h2>Course Curriculum</h2>
          <p>{course.lessons.length} lessons</p>

          <div className="lesson-list">
            {course.lessons.map((lesson, index) => (
              <LessonItem
                key={lesson.id}
                lesson={lesson}
                index={index}
                completed={completed.includes(lesson.id)}
                onClick={() => {
                  if (isEnrolled) {
                    navigate(`/lesson/${course.id}/${lesson.id}`);
                  }
                }}
              />
            ))}
          </div>

          {isEnrolled && (
            <Link
              to={`/quiz/${course.id}`}
              className="btn-secondary quiz-link"
            >
              <FiCheckCircle /> Take Course Quiz
            </Link>
          )}
        </section>

        <aside className="instructor-card">
          <h3>Your Instructor</h3>

          <div className="instructor-avatar">
            {course.instructor.charAt(0)}
          </div>

          <h3>{course.instructor}</h3>
          <p>{course.instructorBio}</p>
        </aside>
      </div>
    </div>
  );
};

export default CourseDetails;