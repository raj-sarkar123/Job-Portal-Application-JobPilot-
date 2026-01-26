import React from "react";

const ThemeLayout = ({ children }) => {
  return (
    <div className="theme-wrapper">
      <style>{`
        :root {
          --bg-color: #f6feff;
          --primary-teal: #14a7b8;
        }

        .theme-wrapper {
          min-height: 100vh;
          width: 100%;
          background-color: var(--bg-color);
          background-image:
            radial-gradient(at 0% 0%, hsla(186, 80%, 95%, 1) 0, transparent 50%),
            radial-gradient(at 50% 0%, hsla(186, 80%, 97%, 1) 0, transparent 50%),
            radial-gradient(at 100% 0%, hsla(186, 70%, 96%, 1) 0, transparent 50%);
          overflow-x: visible;
        }

        /* Fixed overlay — does NOT affect sticky */
        .theme-wrapper::before {
          content: "";
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2314a7b8' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6z'/%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        .content-container {
          position: relative;
          z-index: 1;
        }
      `}</style>

      <div className="content-container">{children}</div>
    </div>
  );
};

export default ThemeLayout;
