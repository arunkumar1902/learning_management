import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { LMSProvider, useLMS } from "./context/LMSContext";

import Layout from "./components/layout/Layout";

import Dashboard from "./pages/Dashboard";
import Catalogue from "./pages/Catalogue";
import CourseDetails from "./pages/CourseDetails";
import MyCourses from "./pages/MyCourses";
import LessonViewer from "./pages/LessonViewer";
import Quiz from "./pages/Quiz";
import Profile from "./pages/Profile";
import AdminCourses from "./pages/AdminCourses";

import "./styles/global.css";
import "./styles/dashboard.css";
// import "./styles/reference-theme.css";

const AppRoutes = () => {
  const { user } = useLMS();

  const isAdmin = user.role === "admin";

  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={
            isAdmin
              ? <Navigate to="/admin/courses" replace />
              : <Dashboard />
          }
        />

        <Route
          path="/catalogue"
          element={<Catalogue />}
        />

        <Route
          path="/courses/:id"
          element={<CourseDetails />}
        />

        <Route
          path="/my-courses"
          element={
            !isAdmin
              ? <MyCourses />
              : <Navigate to="/admin/courses" replace />
          }
        />

        <Route
          path="/lesson/:courseId/:lessonId"
          element={<LessonViewer />}
        />

        <Route
          path="/quiz/:id"
          element={<Quiz />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/admin"
          element={
            isAdmin
              ? <Navigate to="/admin/courses" replace />
              : <Navigate to="/" replace />
          }
        />

        <Route
          path="/admin/courses"
          element={
            isAdmin
              ? <AdminCourses />
              : <Navigate to="/" replace />
          }
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </Layout>
  );
};

const App = () => {
  return (
    <LMSProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </LMSProvider>
  );
};

export default App;