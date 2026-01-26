import React, { useEffect, useState } from "react";
import { Link, NavLink, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import {
  BriefcaseBusiness,
  PenBox,
  Save,
  ChevronDown,
  Sparkles,
} from "lucide-react";

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, isLoaded } = useUser();

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
    const btn = document.querySelector(".cl-userButtonTrigger");
    btn?.click();
  };

  return (
    <>
      <header className="top-0 z-100 w-full">
        {/* Top accent line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#14a7b8]/50 to-transparent" />

        <nav className="mx-auto flex h-20 max-w-8xl items-center justify-between px-6">
         
            {/* LEFT — BRAND */}
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
            <div className="flex-1 flex justify-center">
              {/* CENTER — NAVIGATION */}
              <div
                className="flex items-center gap-1 bg-slate-100/50 p-1 rounded-xl border border-slate-200/50
                max-w-full overflow-x-auto md:overflow-visible"
              >
                {[
                  { name: "Home", path: "/" },
                  { name: "Jobs", path: "/jobs" },
                  { name: "Applications", path: "/my-jobs" },
                ].map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `px-3 py-1.5 md:px-5 md:py-2
   text-xs md:text-sm
   font-bold rounded-xl transition-all duration-300 ${
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

            {/* RIGHT — AUTH & ACTIONS */}
            <div className="flex items-center gap-4">
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
                  <Link to="/post-job" className="hidden lg:block">
                    <Button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#14a7b8] to-[#0e8a99] hover:shadow-cyan-200/50 px-6 h-11 text-sm font-bold text-white transition-all shadow-lg cursor-pointer border-t border-white/20">
                      <PenBox size={18} />
                      Post Job
                    </Button>
                  </Link>
                )}

                <div className="flex items-center gap-2 p-1 pr-3 rounded-2xl bg-slate-50 border border-slate-200/60 hover:border-[#14a7b8]/30 transition-colors group">
                  <UserButton
                    appearance={{
                      elements: {
                        userButtonAvatarStackContainer: "rounded-xl",
                        userButtonTrigger: "focus:shadow-none focus:ring-0",
                      },
                    }}
                  >
                    <UserButton.MenuItems>
                      <UserButton.Link
                        label={isRecruiter ? "Postings" : "Applications"}
                        labelIcon={
                          <BriefcaseBusiness
                            size={16}
                            className="text-[#14a7b8]"
                          />
                        }
                        href="/my-jobs"
                      />
                      <UserButton.Link
                        label="Saved Jobs"
                        labelIcon={
                          <Save size={16} className="text-orange-500" />
                        }
                        href="/saved-jobs"
                      />
                    </UserButton.MenuItems>
                  </UserButton>

                  <div
                    className="hidden sm:flex flex-col items-start gap-[1px] leading-tight ml-1 cursor-pointer"
                    onClick={openUserMenu}
                  >
                    <span className="text-[13px] font-bold text-slate-800">
                      {user?.firstName}
                    </span>
                    <span className="text-[10px] font-bold text-[#14a7b8] uppercase tracking-wide">
                      {role || "Member"}
                    </span>
                  </div>

                  <ChevronDown
                    size={14}
                    className="text-slate-400 group-hover:text-slate-600 transition-colors"
                  />
                </div>
              </SignedIn>
            </div>
          
        </nav>
      </header>

      {/* SIGN IN MODAL */}
      {showSignIn && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/40 backdrop-blur-md transition-all"
          onClick={closeModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="animate-in fade-in slide-in-from-bottom-4 duration-300"
          >
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
