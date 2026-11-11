import { useState } from "react";

import { useLMS } from "../context/LMSContext";
import CourseCard from "../components/common/CourseCard";
import EmptyState from "../components/common/EmptyState";

const MyCourses = () => {
  const {
    courses,
    enrolledCourses,
    getCourseProgress
  } = useLMS();

  const [filter, setFilter] = useState("All");

  const myCourses = courses.filter((course) =>
    enrolledCourses.includes(course.id)
  );

  const filtered = myCourses.filter((course) => {
    const progress = getCourseProgress(course.id);

    if (filter === "Completed") return progress === 100;

    if (filter === "In Progress") {
      return progress > 0 && progress < 100;
    }

    return true;
  });

  return (
    <div>
      <div className="page-heading">
        <h1>My Learning</h1>
        <p>Manage your enrolled courses and learning progress.</p>
      </div>

      <div className="filter-tabs">
        {["All", "In Progress", "Completed"].map((item) => (
          <button
            key={item}
            className={filter === item ? "tab-active" : ""}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="course-grid">
          {filtered.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              showProgress
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title={`No ${filter.toLowerCase()} courses`}
          message="Your courses will appear here as you make progress."
        />
      )}
    </div>
  );
};

export default MyCourses;