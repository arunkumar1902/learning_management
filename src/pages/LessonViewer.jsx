import {
  useNavigate,
  useParams
} from "react-router-dom";

import {
  FiArrowLeft,
  FiArrowRight,
  FiCheckCircle
} from "react-icons/fi";

import { useLMS } from "../context/LMSContext";
import LessonItem from "../components/common/LessonItem";

const LessonViewer = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();

  const {
    courses,
    enrolledCourses,
    completedLessons,
    markLessonComplete
  } = useLMS();

  const course = courses.find(
    (item) => item.id === Number(courseId)
  );

  if (!course || !enrolledCourses.includes(Number(courseId))) {
    return <div className="empty-state">Course not found or not enrolled.</div>;
  }

  const lessons = course.lessons;

  const currentIndex = lessons.findIndex(
    (lesson) => lesson.id === Number(lessonId)
  );

  if (currentIndex === -1) {
    return <div className="empty-state">Lesson not found.</div>;
  }

  const currentLesson = lessons[currentIndex];

  const completed = completedLessons[course.id] || [];

  const isCompleted = completed.includes(currentLesson.id);

  const goToLesson = (index) => {
    if (index >= 0 && index < lessons.length) {
      navigate(
        `/lesson/${course.id}/${lessons[index].id}`
      );
    }
  };

  const handleComplete = () => {
    markLessonComplete(course.id, currentLesson.id);

    if (currentIndex < lessons.length - 1) {
      goToLesson(currentIndex + 1);
    } else {
      navigate(`/quiz/${course.id}`);
    }
  };

  return (
    <div className="lesson-viewer">
      <div className="lesson-main">
        <button
          className="back-link"
          onClick={() => navigate(`/courses/${course.id}`)}
        >
          <FiArrowLeft /> Back to Course
        </button>

        <div className="lesson-video-placeholder">
          <FiCheckCircle size={55} />
          <h2>Learning Content</h2>
          <p>Lesson {currentIndex + 1} of {lessons.length}</p>
        </div>

        <div className="lesson-content">
          <span className="category-tag">{course.category}</span>

          <h1>{currentLesson.title}</h1>

          <p>{currentLesson.content}</p>

          <div className="lesson-navigation">
            <button
              className="btn-secondary"
              disabled={currentIndex === 0}
              onClick={() => goToLesson(currentIndex - 1)}
            >
              <FiArrowLeft /> Previous
            </button>

            <button
              className="btn-primary"
              onClick={handleComplete}
              disabled={isCompleted && currentIndex === lessons.length - 1}
            >
              {isCompleted
                ? "Completed"
                : "Mark as Complete"}

              <FiCheckCircle />
            </button>

            <button
              className="btn-secondary"
              disabled={currentIndex === lessons.length - 1}
              onClick={() => goToLesson(currentIndex + 1)}
            >
              Next <FiArrowRight />
            </button>
          </div>
        </div>
      </div>

      <aside className="lesson-sidebar">
        <h3>{course.title}</h3>

        <p>
          {completed.length} / {lessons.length} lessons completed
        </p>

        {lessons.map((lesson, index) => (
          <LessonItem
            key={lesson.id}
            lesson={lesson}
            index={index}
            completed={completed.includes(lesson.id)}
            active={lesson.id === currentLesson.id}
            onClick={() => goToLesson(index)}
          />
        ))}

        <button
          className="btn-primary full-width"
          onClick={() => navigate(`/quiz/${course.id}`)}
        >
          Start Quiz
        </button>
      </aside>
    </div>
  );
};

export default LessonViewer;