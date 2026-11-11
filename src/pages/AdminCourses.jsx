
import { useMemo, useState } from "react";

import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiBookOpen,
  FiUsers,
  FiLayers,
  FiSearch
} from "react-icons/fi";

import { useLMS } from "../context/LMSContext";
import Modal from "../components/common/Modal";
import ConfirmDialog from "../components/common/ConfirmDialog";
import EmptyState from "../components/common/EmptyState";

const emptyCourse = {
  title: "",
  category: "Web Development",
  instructor: "",
  instructorBio: "",
  level: "Beginner",
  duration: "",
  price: 0,
  image: "",
  description: "",
  lessons: [],
  quiz: []
};

const AdminCourses = () => {
  const {
    courses,
    addCourse,
    updateCourse,
    deleteCourse
  } = useLMS();

  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [form, setForm] = useState(emptyCourse);

  const [lessonInput, setLessonInput] = useState({
    title: "",
    duration: "",
    content: ""
  });

  const [quizInput, setQuizInput] = useState({
    question: "",
    options: ["", "", "", ""],
    answer: 0
  });

  // ADMIN STATISTICS

  const totalLearners = courses.reduce(
    (total, course) =>
      total + (Number(course.students) || 0),
    0
  );

  const categoriesCount = new Set(
    courses
      .map((course) => course.category)
      .filter(Boolean)
  ).size;

  // SEARCH COURSES

  const filteredCourses = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    if (!search) return courses;

    return courses.filter((course) => {
      return [
        course.title,
        course.instructor,
        course.category
      ].some((value) =>
        String(value || "")
          .toLowerCase()
          .includes(search)
      );
    });
  }, [courses, searchTerm]);

  // OPEN ADD COURSE MODAL

  const openAdd = () => {
    setEditingCourse(null);
    setForm({ ...emptyCourse, lessons: [], quiz: [] });
    setLessonInput({
      title: "",
      duration: "",
      content: ""
    });
    setQuizInput({
      question: "",
      options: ["", "", "", ""],
      answer: 0
    });
    setError("");
    setShowModal(true);
  };

  // OPEN EDIT COURSE MODAL

  const openEdit = (course) => {
    setEditingCourse(course);

    setForm({
      ...course,
      lessons: [...(course.lessons || [])],
      quiz: [...(course.quiz || [])]
    });

    setLessonInput({
      title: "",
      duration: "",
      content: ""
    });

    setQuizInput({
      question: "",
      options: ["", "", "", ""],
      answer: 0
    });

    setError("");
    setShowModal(true);
  };

  // HANDLE COURSE INPUTS

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // ADD LESSON

  const addLesson = () => {
    if (
      !lessonInput.title.trim() ||
      !lessonInput.duration.trim() ||
      !lessonInput.content.trim()
    ) {
      setError("Complete all lesson fields.");
      return;
    }

    setForm((prev) => ({
      ...prev,
      lessons: [
        ...prev.lessons,
        {
          ...lessonInput,
          id: Date.now()
        }
      ]
    }));

    setLessonInput({
      title: "",
      duration: "",
      content: ""
    });

    setError("");
  };

  // REMOVE LESSON

  const removeLesson = (id) => {
    setForm((prev) => ({
      ...prev,
      lessons: prev.lessons.filter(
        (lesson) => lesson.id !== id
      )
    }));
  };

  // ADD QUIZ QUESTION

  const addQuizQuestion = () => {
    if (
      !quizInput.question.trim() ||
      quizInput.options.some(
        (option) => !option.trim()
      )
    ) {
      setError("Enter a question and all four options.");
      return;
    }

    setForm((prev) => ({
      ...prev,
      quiz: [
        ...prev.quiz,
        { ...quizInput }
      ]
    }));

    setQuizInput({
      question: "",
      options: ["", "", "", ""],
      answer: 0
    });

    setError("");
  };

  // SAVE COURSE

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (
      !form.title.trim() ||
      !form.instructor.trim()
    ) {
      setError(
        "Course title and instructor are required."
      );
      return;
    }

    if (!form.lessons.length) {
      setError("Add at least one lesson.");
      return;
    }

    const payload = {
      ...form,
      price: Number(form.price),
      students: editingCourse?.students || 0,
      rating: editingCourse?.rating || 0
    };

    if (editingCourse) {
      updateCourse({
        ...payload,
        id: editingCourse.id
      });
    } else {
      addCourse(payload);
    }

    setShowModal(false);
    setForm(emptyCourse);
    setEditingCourse(null);
  };

  // DELETE COURSE

  const handleDelete = () => {
    deleteCourse(deleteId);
    setDeleteId(null);
  };

  return (
    <div className="admin-page-reference">

      {/* PAGE HEADING */}

      <div className="reference-admin-heading">
        <div>
          <span className="eyebrow">
            ADMINISTRATION
          </span>

          <h1>Course management</h1>

          <p>
            Create, update and organise the learning catalogue.
          </p>
        </div>

        <button
          className="btn-primary"
          onClick={openAdd}
        >
          <FiPlus />
          Add new course
        </button>
      </div>

      {/* STATISTICS */}

      <div className="reference-stats admin-reference-stats">

        <article className="reference-stat-card">
          <div className="reference-stat-icon blue">
            <FiBookOpen />
          </div>

          <div>
            <span>Total courses</span>
            <h2>{courses.length}</h2>
            <small>In catalogue</small>
          </div>
        </article>

        <article className="reference-stat-card">
          <div className="reference-stat-icon green">
            <FiUsers />
          </div>

          <div>
            <span>Total learners</span>
            <h2>{totalLearners.toLocaleString()}</h2>
            <small>Across listed courses</small>
          </div>
        </article>

        <article className="reference-stat-card">
          <div className="reference-stat-icon cyan">
            <FiLayers />
          </div>

          <div>
            <span>Categories</span>
            <h2>{categoriesCount}</h2>
            <small>Learning topics</small>
          </div>
        </article>

      </div>

      {/* COURSE MANAGEMENT TABLE */}

      <div className="admin-course-table-card">

        <div className="admin-table-heading">
          <div>
            <h2>All courses</h2>
            <p>
              Manage the courses available to students.
            </p>
          </div>

          <div className="admin-search">
            <FiSearch />

            <input
              type="search"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />
          </div>
        </div>

        {filteredCourses.length > 0 ? (

          <div className="admin-table-wrapper">
            <table className="admin-table">

              <thead>
                <tr>
                  <th>Course</th>
                  <th>Instructor</th>
                  <th>Category</th>
                  <th>Lessons</th>
                  <th>Quiz</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredCourses.map((course) => (

                  <tr key={course.id}>

                    <td>
                      <div className="admin-course-cell">

                        {course.image ? (
                          <img
                            src={course.image}
                            alt=""
                          />
                        ) : (
                          <div className="admin-course-placeholder">
                            <FiBookOpen />
                          </div>
                        )}

                        <div>
                          <strong>{course.title}</strong>
                          <small>{course.level || "Beginner"}</small>
                        </div>

                      </div>
                    </td>

                    <td>{course.instructor}</td>

                    <td>
                      <span className="admin-category-badge">
                        {course.category}
                      </span>
                    </td>

                    <td>
                      {(course.lessons || []).length}
                    </td>

                    <td>
                      {(course.quiz || []).length} Qs
                    </td>

                    <td>
                      {Number(course.price) === 0
                        ? "Free"
                        : `$${course.price}`}
                    </td>

                    <td>
                      <div className="table-actions">

                        <button
                          className="edit-btn"
                          onClick={() => openEdit(course)}
                          aria-label="Edit course"
                          title="Edit course"
                        >
                          <FiEdit2 />
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            setDeleteId(course.id)
                          }
                          aria-label="Delete course"
                          title="Delete course"
                        >
                          <FiTrash2 />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        ) : (
          <div className="admin-empty">
            {courses.length === 0 ? (
              <EmptyState
                title="No courses available"
              />
            ) : (
              <EmptyState
                title="No matching courses"
                message="Try another course name, instructor or category."
              />
            )}
          </div>
        )}

      </div>

      {/* ADD / EDIT COURSE MODAL */}

      {showModal && (
        <Modal
          title={
            editingCourse
              ? "Edit Course"
              : "Create Course"
          }
          onClose={() => setShowModal(false)}
          size="large"
        >
          <form
            className="admin-course-form"
            onSubmit={handleSubmit}
          >

            <div className="form-grid">

              <div className="form-group">
                <label>Course Title *</label>

                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Instructor *</label>

                <input
                  name="instructor"
                  value={form.instructor}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Category</label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                >
                  <option>Web Development</option>
                  <option>Programming</option>
                  <option>Design</option>
                  <option>Data Science</option>
                  <option>Business</option>
                  <option>Marketing</option>
                </select>
              </div>

              <div className="form-group">
                <label>Level</label>

                <select
                  name="level"
                  value={form.level}
                  onChange={handleChange}
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>

              <div className="form-group">
                <label>Duration</label>

                <input
                  name="duration"
                  placeholder="e.g. 10 hours"
                  value={form.duration}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Price</label>

                <input
                  type="number"
                  name="price"
                  min="0"
                  value={form.price}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="form-group">
              <label>Course Image URL</label>

              <input
                name="image"
                type="url"
                value={form.image}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>

            <div className="form-group">
              <label>Instructor Bio</label>

              <textarea
                name="instructorBio"
                value={form.instructorBio}
                onChange={handleChange}
                rows="2"
              />
            </div>

            <div className="form-group">
              <label>Course Description</label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="3"
                required
              />
            </div>

            {/* LESSON MANAGEMENT */}

            <div className="admin-form-section">

              <h3>Course Lessons</h3>

              <div className="form-grid">

                <input
                  placeholder="Lesson title"
                  value={lessonInput.title}
                  onChange={(e) =>
                    setLessonInput({
                      ...lessonInput,
                      title: e.target.value
                    })
                  }
                />

                <input
                  placeholder="Duration"
                  value={lessonInput.duration}
                  onChange={(e) =>
                    setLessonInput({
                      ...lessonInput,
                      duration: e.target.value
                    })
                  }
                />

              </div>

              <textarea
                placeholder="Lesson content"
                rows="2"
                value={lessonInput.content}
                onChange={(e) =>
                  setLessonInput({
                    ...lessonInput,
                    content: e.target.value
                  })
                }
              />

              <button
                type="button"
                className="btn-secondary"
                onClick={addLesson}
              >
                <FiPlus /> Add Lesson
              </button>

              {form.lessons.map((lesson, index) => (

                <div
                  className="admin-item"
                  key={lesson.id}
                >
                  <span>
                    {index + 1}. {lesson.title}
                  </span>

                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() =>
                      removeLesson(lesson.id)
                    }
                  >
                    <FiTrash2 />
                  </button>
                </div>

              ))}

            </div>

            {/* QUIZ MANAGEMENT */}

            <div className="admin-form-section">

              <h3>Quiz Questions</h3>

              <input
                placeholder="Enter question"
                value={quizInput.question}
                onChange={(e) =>
                  setQuizInput({
                    ...quizInput,
                    question: e.target.value
                  })
                }
              />

              {quizInput.options.map((option, index) => (

                <div
                  className="quiz-option-editor"
                  key={index}
                >
                  <input
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) =>
                      setQuizInput((prev) => ({
                        ...prev,
                        options: prev.options.map(
                          (item, i) =>
                            i === index
                              ? e.target.value
                              : item
                        )
                      }))
                    }
                  />

                  <label>
                    <input
                      type="radio"
                      name="correct-answer"
                      checked={
                        quizInput.answer === index
                      }
                      onChange={() =>
                        setQuizInput((prev) => ({
                          ...prev,
                          answer: index
                        }))
                      }
                    />

                    Correct
                  </label>
                </div>

              ))}

              <button
                type="button"
                className="btn-secondary"
                onClick={addQuizQuestion}
              >
                <FiPlus /> Add Quiz Question
              </button>

              {form.quiz.map((question, index) => (

                <div
                  className="admin-item"
                  key={index}
                >
                  <span>
                    {index + 1}. {question.question}
                  </span>

                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        quiz: prev.quiz.filter(
                          (_, i) => i !== index
                        )
                      }))
                    }
                  >
                    <FiTrash2 />
                  </button>
                </div>

              ))}

            </div>

            {error && (
              <p className="form-error">{error}</p>
            )}

            {/* FORM ACTIONS */}

            <div className="modal-actions">

              <button
                type="button"
                className="btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn-primary"
              >
                {editingCourse
                  ? "Save Changes"
                  : "Create Course"}
              </button>

            </div>

          </form>
        </Modal>
      )}

      {/* DELETE CONFIRMATION */}

      {deleteId !== null && (
        <ConfirmDialog
          title="Delete Course"
          message="Are you sure you want to delete this course? This action cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}

    </div>
  );
};

export default AdminCourses;
