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
import { BriefcaseBusiness, PenBox, Save } from "lucide-react";

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

  // Reusable User Profile Component to avoid duplication
  const UserProfile = () => (
    <div className="flex items-center gap-2 p-1 pr-3 rounded-2xl bg-slate-50 border border-slate-200/60 hover:border-[#14a7b8]/30 transition-colors max-w-fit">
      <div className="shrink-0">
        <UserButton
          appearance={{
            elements: {
              userButtonPopoverCard: "right-0 left-auto origin-top-right",
              userButtonTrigger: "focus:ring-0",
            },
          }}
        >
          <UserButton.MenuItems>
            <UserButton.Action
              label={isRecruiter ? "Postings" : "Applications"}
              labelIcon={<BriefcaseBusiness size={16} className="text-[#14a7b8]" />}
              onClick={() => navigate("/my-jobs")}
            />
            {!isRecruiter && (
              <UserButton.Action
                label="Saved Jobs"
                labelIcon={<Save size={16} className="text-orange-500" />}
                onClick={() => navigate("/saved-jobs")}
              />
            )}
            <UserButton.Action label="manageAccount" />
            <UserButton.Action label="signOut" />
          </UserButton.MenuItems>
        </UserButton>
      </div>

      <div className="flex flex-col ml-1 min-w-0">
        <span className="text-[12px] sm:text-[13px] font-bold text-slate-800 truncate">
          {user?.firstName}
        </span>
        <span className="text-[9px] sm:text-[10px] font-bold text-[#14a7b8] uppercase tracking-wider">
          {role || "Member"}
        </span>
      </div>
    </div>
  );

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
    <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#14a7b8]/50 to-transparent" />

    <nav className="mx-auto max-w-8xl px-4 py-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* TOP ROW */}
          <div className="flex items-center justify-between w-full md:w-auto">
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

            {/* MOBILE ONLY ACTIONS */}
            <SignedIn>
              <div className="flex items-center gap-2 md:hidden">
                {isRecruiter && (
                  <Link to="/post-job">
                    <Button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#14a7b8] to-[#0e8a99] px-4 h-11 text-sm font-bold text-white shadow-lg">
                      <PenBox size={18} />
                    </Button>
                  </Link>
                )}
                {/* NOW SHOWING FULL PROFILE ON MOBILE */}
                <UserProfile />
              </div>
            </SignedIn>
            
            <SignedOut>
               <div className="md:hidden">
                  <Button
                    className="rounded-xl bg-slate-900 text-white px-5 h-10 text-xs font-bold"
                    onClick={() => setShowSignIn(true)}
                  >
                    Sign In
                  </Button>
               </div>
            </SignedOut>
          </div>

          {/* CENTER NAV */}
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
                    `px-3 py-1.5 md:px-5 md:py-2 text-xs md:text-sm font-bold rounded-xl transition-all duration-300 ${
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

          {/* DESKTOP ONLY ACTIONS */}
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
              <UserProfile />
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