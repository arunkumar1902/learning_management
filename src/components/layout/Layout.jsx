import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-layout">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="main-layout">
        <Topbar
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;