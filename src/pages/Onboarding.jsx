import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { BriefcaseBusiness, UserRound } from "lucide-react";

const Onboarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  // Auto-redirect if role already selected
  useEffect(() => {
    if (isLoaded && user?.unsafeMetadata?.role) {
      navigate(
        user.unsafeMetadata.role === "recruiter" ? "/post-job" : "/jobs"
      );
    }
  }, [isLoaded, user, navigate]);

  if (!isLoaded) {
    return (
      <div className="w-full flex justify-center mt-20">
        <BarLoader width={"30%"} color="#14a7b8" />
      </div>
    );
  }

  const handleRoleSelection = async (role) => {
    try {
      await user.update({
        unsafeMetadata: { role },
      });
      navigate(role === "recruiter" ? "/post-job" : "/jobs");
    } catch (error) {
      console.error("Failed to update role:", error);
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-100px)] flex items-center justify-center px-4">
      
      {/* Soft background glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#14a7b8]/10 via-transparent to-transparent" />

      <div className="w-full max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          {/* <p className="text-sm font-semibold text-[#14a7b8] uppercase tracking-wide mb-3">
            Almost there
          </p> */}
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Choose how you want to use JobPilot
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            This helps us personalize your experience and show you the most
            relevant features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

  {/* Candidate */}
  <div
    onClick={() => handleRoleSelection("candidate")}
    className="group cursor-pointer rounded-3xl border border-slate-200 bg-white p-10 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
  >
    {/* Image */}
    <div className="mb-6 overflow-hidden rounded-2xl bg-[#e6fbfd]">
      <img
        src="./candidate.png"
        alt="Candidate illustration"
        className="w-full h-40 object-contain group-hover:scale-105 transition"
      />
    </div>

    <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#e6fbfd] mb-5">
      <UserRound className="w-7 h-7 text-[#14a7b8]" />
    </div>

    <h3 className="text-2xl font-bold mb-3">
      I’m a Candidate
    </h3>
    <p className="text-gray-500 mb-6">
      Discover opportunities, apply to jobs, and track your applications.
    </p>

    <Button className="rounded-xl bg-[#14a7b8] hover:bg-[#118a99] cursor-pointer">
      Explore Jobs
    </Button>
  </div>

  {/* Recruiter */}
  <div
    onClick={() => handleRoleSelection("recruiter")}
    className="group cursor-pointer rounded-3xl border border-slate-200 bg-white p-10 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
  >
    {/* Image */}
    <div className="mb-6 overflow-hidden rounded-2xl bg-[#eef2ff]">
      <img
        src="/recruiter.png"
        alt="Recruiter illustration"
        className="w-full h-40 object-contain group-hover:scale-105 transition"
      />
    </div>

    <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#eef2ff] mb-5">
      <BriefcaseBusiness className="w-7 h-7 text-indigo-600" />
    </div>

    <h3 className="text-2xl font-bold mb-3">
      I’m a Recruiter
    </h3>
    <p className="text-gray-500 mb-6">
      Post jobs, manage applicants, and hire talent faster.
    </p>

    <Button
      variant="outline"
      className="rounded-xl border-indigo-500 text-indigo-600 hover:bg-indigo-50 cursor-pointer "
    >
      Post a Job
    </Button>
  </div>

</div>







      </div>
    </section>
  );
};

export default Onboarding;
