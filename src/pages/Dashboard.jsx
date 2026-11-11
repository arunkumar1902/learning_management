import {
  FiBookOpen,
  FiCheckCircle,
  FiAward,
  FiClock
} from "react-icons/fi";

import { Link } from "react-router-dom";

import { useLMS } from "../context/LMSContext";
import CourseCard from "../components/common/CourseCard";
import EmptyState from "../components/common/EmptyState";

const Dashboard = () => {
  const {
    courses,
    enrolledCourses,
    completedLessons,
    quizResults,
    getCourseProgress,
    user
  } = useLMS();

  const myCourses = courses.filter((course) =>
    enrolledCourses.includes(course.id)
  );

  const lessonsCount = Object.values(completedLessons)
    .reduce((total, lessons) => total + lessons.length, 0);

  const totalLessons = myCourses.reduce(
    (total, course) => total + course.lessons.length,
    0
  );

  const averageProgress = myCourses.length
    ? Math.round(
        myCourses.reduce(
          (total, course) =>
            total + getCourseProgress(course.id),
          0
        ) / myCourses.length
      )
    : 0;

  const quizzesAttempted = Object.keys(quizResults).length;

  const stats = [
    {
      label: "Enrolled courses",
      value: myCourses.length,
      note: "Courses in your library",
      icon: <FiBookOpen />,
      color: "blue"
    },
    {
      label: "Lessons completed",
      value: `${lessonsCount} / ${totalLessons}`,
      note: "Keep it up!",
      icon: <FiCheckCircle />,
      color: "green"
    },
    {
      label: "Average progress",
      value: `${averageProgress}%`,
      note: "Across your courses",
      icon: <FiAward />,
      color: "orange"
    },
    {
      label: "Quizzes attempted",
      value: quizzesAttempted,
      note: "Quiz attempts recorded",
      icon: <FiClock />,
      color: "cyan"
    }
  ];

  const recommended = courses
    .filter((course) => !enrolledCourses.includes(course.id))
    .slice(0, 3);

  return (
    <div className="reference-dashboard">
      <section className="reference-welcome">
        <div>
          <span className="eyebrow">
            WELCOME TO YOUR LEARNING SPACE
          </span>

          <h1>
            Welcome back, {user.name} <span>✦</span>
          </h1>

          <p>
            Keep your momentum going. You're making great progress.
          </p>
        </div>

        <Link to="/catalogue" className="btn-primary">
          Explore courses →
        </Link>
      </section>

      <section className="reference-stats">
        {stats.map((stat) => (
          <article className="reference-stat-card" key={stat.label}>
            <div className={`reference-stat-icon ${stat.color}`}>
              {stat.icon}
            </div>

            <div>
              <span>{stat.label}</span>
              <h2>{stat.value}</h2>
              <small>{stat.note}</small>
            </div>
          </article>
        ))}
      </section>

      <section className="reference-section">
        <div className="reference-section-heading">
          <div>
            <span className="eyebrow">YOUR LEARNING PATH</span>
            <h2>Enrolled courses</h2>
            <p>Pick up right where you left off.</p>
          </div>

          <Link to="/my-courses">View all courses →</Link>
        </div>

        {myCourses.length ? (
          <div className="course-grid">
            {myCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                showProgress
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No enrolled courses"
            message="Explore the catalogue and enrol in your first course."
          />
        )}
      </section>

      <section className="reference-section">
        <div className="reference-section-heading">
          <div>
            <span className="eyebrow">KEEP EXPLORING</span>
            <h2>Recommended courses</h2>
            <p>Discover something new to learn.</p>
          </div>

          <Link to="/catalogue">Browse catalogue →</Link>
        </div>

        {recommended.length ? (
          <div className="course-grid">
            {recommended.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="You're all caught up!"
            message="You have enrolled in all available courses."
          />
        )}
      </section>
    </div>
  );
};

export default Dashboard;