import React, { useEffect, useState } from "react";
import { Link, NavLink, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { BriefcaseBusiness, PenBox, Save, ChevronDown } from "lucide-react";

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const role = user?.unsafeMetadata?.role || user?.publicMetadata?.role;
  const isRecruiter = isLoaded && role === "recruiter";

  useEffect(() => {
    if (searchParams.get("sign-in") === "true") {
      setShowSignIn(true);
    }
  }, [searchParams]);

  const closeModal = () => {
    setShowSignIn(false);
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("sign-in");
    setSearchParams(newParams);
  };

  const openUserMenu = () => {
    document.querySelector(".cl-userButtonTrigger")?.click();
  };

  return (
    <>
      <header className="top-0 z-100 w-full">
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#14a7b8]/50 to-transparent" />

        {/* MOBILE: stacked | DESKTOP: row */}
        <nav className="mx-auto max-w-8xl px-4 py-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* TOP ROW (mobile): brand left, actions right */}
          <div className="flex items-center justify-between w-full md:w-auto">
            {/* BRAND */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="relative">
                <div className="absolute -inset-1 bg-[#14a7b8] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <img
                  src="/JobPilot.png"
                  alt="JobPilot"
                  className="relative h-10 w-10 object-contain transition-transform group-hover:scale-110"
                />
              </div>
              <span className="hidden sm:block text-2xl font-black tracking-tight text-slate-900">
                Job<span className="text-[#14a7b8]">Pilot</span>
              </span>
            </Link>

            {/* MOBILE RIGHT ACTIONS */}
            <SignedIn>
              <div className="flex items-center gap-2 md:hidden">
                {isRecruiter && (
                  <Link to="/post-job">
                    <Button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#14a7b8] to-[#0e8a99] px-4 h-11 text-sm font-bold text-white shadow-lg">
                      <PenBox size={18} />
                    </Button>
                  </Link>
                )}
                <UserButton />
              </div>
            </SignedIn>
          </div>

          {/* CENTER NAV — centered on mobile */}
          <div className="w-full flex justify-center md:flex-1 md:justify-center">
            <div className="flex items-center gap-1 bg-slate-100/50 p-1 rounded-xl border border-slate-200/50">
              {[
                { name: "Home", path: "/" },
                { name: "Jobs", path: "/jobs" },
                {
                  name: isRecruiter ? "Postings" : "Applications",
                  path: "/my-jobs",
                },
              ].map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3 py-1.5 md:px-5 md:py-2
                    text-xs md:text-sm font-bold rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-white text-[#14a7b8] shadow-sm ring-1 ring-slate-200"
                        : "text-slate-500 hover:text-slate-900 hover:bg-white/50"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* DESKTOP RIGHT ACTIONS */}
          <div className="hidden md:flex items-center gap-4">
            <SignedOut>
              <Button
                className="rounded-xl bg-slate-900 text-white hover:bg-slate-800 px-7 h-11 font-bold shadow-xl shadow-slate-200 transition-all active:scale-95"
                onClick={() => setShowSignIn(true)}
              >
                Sign In
              </Button>
            </SignedOut>

            <SignedIn>
              {isRecruiter && (
                <Link to="/post-job">
                  <Button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#14a7b8] to-[#0e8a99] px-6 h-11 text-sm font-bold text-white shadow-lg">
                    <PenBox size={18} />
                    Post Job
                  </Button>
                </Link>
              )}

              <div className="flex items-center gap-2 p-1 pr-3 rounded-2xl bg-slate-50 border border-slate-200/60 hover:border-[#14a7b8]/30 transition-colors">
                <UserButton
                  appearance={{
                    elements: {
                      userButtonPopoverCard:
                        "right-0 left-auto origin-top-right",
                      userButtonTrigger: "focus:ring-0",
                    },
                  }}
                >
                  <UserButton.MenuItems>
                    <UserButton.Action
                      label={isRecruiter ? "Postings" : "Applications"}
                      labelIcon={
                        <BriefcaseBusiness
                          size={16}
                          className="text-[#14a7b8]"
                        />
                      }
                      onClick={() => navigate("/my-jobs")}
                    />
                    {!isRecruiter && (
                      <UserButton.Action
                        label="Saved Jobs"
                        labelIcon={
                          <Save size={16} className="text-orange-500" />
                        }
                        onClick={() => navigate("/saved-jobs")}
                      />
                    )}
                    <UserButton.Action label="manageAccount" />
                    <UserButton.Action label="signOut" />
                  </UserButton.MenuItems>
                </UserButton>

                {/* This is now just DISPLAY, not a trigger */}
                <div
                  className="hidden sm:flex flex-col ml-1"
                 
                >
                  <span className="text-[13px] font-bold text-slate-800">
                    {user?.firstName}
                  </span>
                  <span className="text-[10px] font-bold text-[#14a7b8] uppercase">
                    {role || "Member"}
                  </span>
                </div>

                {/* <ChevronDown size={14} className="text-slate-400" /> */}
              </div>
            </SignedIn>
          </div>
        </nav>
      </header>

      {showSignIn && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/40 backdrop-blur-md"
          onClick={closeModal}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <SignIn
              signUpForceRedirectUrl="/onboarding"
              fallbackRedirectUrl="/onboarding"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
