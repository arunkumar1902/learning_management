import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import {
  initialCourses,
  initialUser
} from "../data/initialData";

const LMSContext = createContext();

const getStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

export const LMSProvider = ({ children }) => {
  const [courses, setCourses] = useState(() =>
    getStorage("lms_courses", initialCourses)
  );

  const [enrolledCourses, setEnrolledCourses] = useState(() =>
    getStorage("lms_enrolled", [1, 2])
  );

  const [completedLessons, setCompletedLessons] = useState(() =>
    getStorage("lms_completed", {})
  );

  const [quizResults, setQuizResults] = useState(() =>
    getStorage("lms_quiz_results", {})
  );

  const [user, setUser] = useState(() =>
    getStorage("lms_user", initialUser)
  );

  useEffect(() => {
    localStorage.setItem("lms_courses", JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem("lms_enrolled", JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  useEffect(() => {
    localStorage.setItem("lms_completed", JSON.stringify(completedLessons));
  }, [completedLessons]);

  useEffect(() => {
    localStorage.setItem("lms_quiz_results", JSON.stringify(quizResults));
  }, [quizResults]);

  useEffect(() => {
    localStorage.setItem("lms_user", JSON.stringify(user));
  }, [user]);

  // NEW: Switch between Student and Admin workspaces.
  const switchRole = (role) => {
    if (!["student", "admin"].includes(role)) return;

    setUser((prev) => ({
      ...prev,
      role
    }));
  };

  const enrollCourse = (courseId) => {
    setEnrolledCourses((prev) =>
      prev.includes(courseId) ? prev : [...prev, courseId]
    );
  };

  const unenrollCourse = (courseId) => {
    setEnrolledCourses((prev) =>
      prev.filter((id) => id !== courseId)
    );
  };

  const addCourse = (course) => {
    const newCourse = {
      ...course,
      id: Date.now(),
      students: 0,
      rating: 0,
      lessons: course.lessons || [],
      quiz: course.quiz || []
    };

    setCourses((prev) => [...prev, newCourse]);
  };

  const updateCourse = (updatedCourse) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === updatedCourse.id ? updatedCourse : course
      )
    );
  };

  const deleteCourse = (courseId) => {
    setCourses((prev) =>
      prev.filter((course) => course.id !== courseId)
    );

    setEnrolledCourses((prev) =>
      prev.filter((id) => id !== courseId)
    );

    setCompletedLessons((prev) => {
      const updated = { ...prev };
      delete updated[courseId];
      return updated;
    });
  };

  const markLessonComplete = (courseId, lessonId) => {
    setCompletedLessons((prev) => {
      const courseLessons = prev[courseId] || [];

      if (courseLessons.includes(lessonId)) return prev;

      return {
        ...prev,
        [courseId]: [...courseLessons, lessonId]
      };
    });
  };

  const getCourseProgress = (courseId) => {
    const course = courses.find(
      (item) => item.id === Number(courseId)
    );

    if (!course || !course.lessons.length) return 0;

    const completed = completedLessons[courseId] || [];

    return Math.round(
      (completed.length / course.lessons.length) * 100
    );
  };

  const submitQuiz = (courseId, score, total) => {
    const percentage = total
      ? Math.round((score / total) * 100)
      : 0;

    setQuizResults((prev) => ({
      ...prev,
      [courseId]: {
        score,
        total,
        percentage,
        passed: percentage >= 60,
        date: new Date().toISOString()
      }
    }));
  };

  const updateProfile = (profile) => {
    setUser((prev) => ({
      ...prev,
      ...profile
    }));
  };

  return (
    <LMSContext.Provider
      value={{
        courses,
        enrolledCourses,
        completedLessons,
        quizResults,
        user,
        switchRole,
        enrollCourse,
        unenrollCourse,
        addCourse,
        updateCourse,
        deleteCourse,
        markLessonComplete,
        getCourseProgress,
        submitQuiz,
        updateProfile
      }}
    >
      {children}
    </LMSContext.Provider>
  );
};

export const useLMS = () => {
  const context = useContext(LMSContext);

  if (!context) {
    throw new Error("useLMS must be used inside LMSProvider");
  }

  return context;
};