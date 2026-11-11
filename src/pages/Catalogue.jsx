import { useMemo, useState } from "react";
import { FiSearch, FiFilter } from "react-icons/fi";

import { useLMS } from "../context/LMSContext";
import CourseCard from "../components/common/CourseCard";
import EmptyState from "../components/common/EmptyState";

const Catalogue = () => {
  const { courses } = useLMS();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All");
  const [sort, setSort] = useState("default");

  const categories = [
    "All",
    ...new Set(courses.map((course) => course.category))
  ];

  const filteredCourses = useMemo(() => {
    let result = courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.instructor.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || course.category === category;

      const matchesLevel =
        level === "All" || course.level === level;

      return matchesSearch && matchesCategory && matchesLevel;
    });

    if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (sort === "name") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [courses, search, category, level, sort]);

  return (
    <div>
      <div className="page-heading">
        <h1>Explore Courses</h1>
        <p>Discover courses and develop new skills.</p>
      </div>

      <div className="catalogue-toolbar">
        <div className="search-box">
          <FiSearch />

          <input
            type="text"
            placeholder="Search courses or instructors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option value="All">All Levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="default">Sort By</option>
          <option value="rating">Highest Rated</option>
          <option value="name">Course Name</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      <div className="results-heading">
        <span>
          <FiFilter /> {filteredCourses.length} courses found
        </span>
      </div>

      {filteredCourses.length ? (
        <div className="course-grid">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No matching courses"
          message="Try changing your search or filters."
        />
      )}
    </div>
  );
};

export default Catalogue;