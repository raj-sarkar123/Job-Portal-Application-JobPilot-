import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-slate-900 via-slate-950 to-black text-slate-300 px-6 pt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-12 md:grid-cols-4">

        {/* Brand */}
        <div className="space-y-5">
          <h2 className="text-3xl font-extrabold tracking-tight text-white">
            Job<span className="text-[#14a7b8]">Pilot</span>
          </h2>
          <p className="text-base leading-relaxed text-slate-400 max-w-sm">
            A modern job portal built to connect skilled professionals with
            verified opportunities. Designed for clarity, speed, and real-world
            hiring workflows.
          </p>
        </div>

        {/* Platform */}
        <div>
          <h3 className="mb-5 text-lg font-semibold text-white">
            Platform
          </h3>
          <ul className="space-y-3 text-base">
            <li>
              <a href="#" className="hover:text-[#14a7b8] transition-colors">
                Browse Jobs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#14a7b8] transition-colors">
                Saved Jobs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#14a7b8] transition-colors">
                Post a Job
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#14a7b8] transition-colors">
                Companies
              </a>
            </li>
          </ul>
        </div>

        {/* Project */}
        <div>
          <h3 className="mb-5 text-lg font-semibold text-white">
            Project
          </h3>
          <ul className="space-y-3 text-base">
            <li>
              <a href="#" className="hover:text-[#14a7b8] transition-colors">
                About the Project
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#14a7b8] transition-colors">
                Tech Stack
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#14a7b8] transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#14a7b8] transition-colors">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Social / Creator */}
        <div>
          <h3 className="mb-5 text-lg font-semibold text-white">
            Connect
          </h3>
          <ul className="space-y-3 text-base">
            <li>
              <a href="#" className="hover:text-[#14a7b8] transition-colors">
                GitHub
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#14a7b8] transition-colors">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#14a7b8] transition-colors">
                Portfolio
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-20 border-t border-slate-800 py-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-between gap-4 text-sm md:flex-row">
          <p className="text-slate-500">
            © {new Date().getFullYear()} JobPilot. Built with React, Clerk & Supabase.
          </p>
          <p className="text-slate-500">
            Designed & developed by <span className="text-[#14a7b8] font-semibold">Raj Sarkar</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
