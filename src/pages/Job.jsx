import { getSingleJob, updateHiringStatus } from "@/api/apiJobs";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import {
  Briefcase,
  BriefcaseBusiness,
  MapPin,
  Building2,
  ChevronLeft,
  Share2,
} from "lucide-react";
import React, { useEffect, useState } from "react"; // ✅ Added useState
import { useParams, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import ReactMarkdown from "react-markdown";
import ApplyJob from "@/components/ApplyJob";
import ApplicationCard from "@/components/ApplicationCard";

const Job = () => {
  const { isLoaded, user } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();

  const jobId = Number(id);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const APPLICATIONS_PER_PAGE = 3;

  const {
    data: job,
    loading,
    error,
    fn: fetchJob,
  } = useFetch(getSingleJob, jobId);

  const { loading: loadHiringStatus, fn: fnHiringStatus } = useFetch(
    updateHiringStatus,
    {
      job_id: id,
    }
  );

  const handleStatusChange = (value) => {
    const isOpen = value === "open";
    fnHiringStatus(isOpen).then(() => fetchJob());
  };

  useEffect(() => {
    if (isLoaded && jobId) {
      fetchJob();
    }
  }, [isLoaded, jobId]);

  if (!isLoaded || loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[70vh] gap-4">
        <BarLoader width={200} color="#3b82f6" />
        <p className="text-slate-500 animate-pulse font-medium">
          Fetching job details...
        </p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="text-center mt-20 p-10 bg-red-50 rounded-2xl max-w-lg mx-auto border border-red-100">
        <h2 className="text-red-600 font-bold text-xl mb-2">
          Oops! Job not found
        </h2>
        <button
          onClick={() => navigate("/jobs")}
          className="text-blue-600 underline"
        >
          Back to Job Board
        </button>
      </div>
    );
  }

  // ✅ SAFE recruiter check
  const isRecruiter =
    job?.recruiter_id &&
    user?.id &&
    String(job.recruiter_id) === String(user.id);

  // Pagination Logic
  const applications = job?.applications || [];
  const totalPages = Math.ceil(applications.length / APPLICATIONS_PER_PAGE);
  const startIndex = (currentPage - 1) * APPLICATIONS_PER_PAGE;
  const currentApplications = applications.slice(
    startIndex,
    startIndex + APPLICATIONS_PER_PAGE
  );

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 mt-10">
      <div className="relative rounded-[2.5rem] bg-white/60 backdrop-blur-xl border border-white/40 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] p-6 sm:p-8 lg:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-blue-50/40 via-transparent to-indigo-50/40 pointer-events-none" />

        <div className="relative z-10">
          {/* Navigation */}
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors group"
            >
              <ChevronLeft
                size={20}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Back to list
            </button>

            <button className="p-2 rounded-full hover:bg-white/60 text-slate-500 transition-all">
              <Share2 size={20} />
            </button>
          </div>

          {/* Header */}
          <header className="flex flex-col md:flex-row justify-between items-start gap-8 bg-white rounded-3xl border border-slate-100 shadow-sm p-8 mb-12">
            <div className="flex flex-col gap-4 flex-1">
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
                  {job?.type || "Full Time"}
                </span>
                <span
                  className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${
                    job.isOpen
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-rose-50 text-rose-600"
                  }`}
                >
                  {job.isOpen ? "Accepting Applications" : "Hiring Closed"}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">
                {job.title}
              </h1>

              <div className="flex flex-wrap gap-y-3 gap-x-6 text-slate-500 font-medium">
                <div className="flex items-center gap-2">
                  <Building2 size={16} /> {job.company?.name}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} /> {job.location || "Remote"}
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase size={16} /> {job.applications?.length ?? 0}{" "}
                  Applied
                </div>
              </div>
            </div>

            <img
              src={job.company?.logo || "/placeholder-logo.png"}
              alt="Company logo"
              className="h-20 w-20 md:h-24 md:w-24 object-contain border border-slate-100 rounded-2xl p-3 bg-white shadow-sm"
            />
          </header>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  About the Role
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600">
                  <ReactMarkdown>{job.description}</ReactMarkdown>
                </div>
              </section>

              {job.recuirements && (
                <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    Key Requirements
                  </h2>
                  <div className="prose prose-slate max-w-none">
                    <ReactMarkdown>{job.recuirements}</ReactMarkdown>
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-start-3">
              <div className="sticky top-10 space-y-6">
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-lg">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {isRecruiter ? "Manage Job Posting" : "Interested?"}
                  </h3>

                  <div className="text-slate-500 mb-6">
                    {isRecruiter ? (
                      <p>Monitor applications and control hiring status.</p>
                    ) : (
                      <p>
                        Join{" "}
                        <span className="font-semibold">
                          {job.company?.name}
                        </span>{" "}
                        and help build the future.
                      </p>
                    )}
                  </div>

                  {isRecruiter ? (
                    <button
                      disabled={loadHiringStatus}
                      onClick={() =>
                        handleStatusChange(job.isOpen ? "closed" : "open")
                      }
                      className={`w-full py-4 cursor-pointer rounded-2xl font-bold text-lg transition-all ${
                        job.isOpen
                          ? "bg-red-600 hover:bg-red-500 text-white"
                          : "bg-green-600 hover:bg-green-500 text-white"
                      } ${loadHiringStatus ? "opacity-70 cursor-wait" : ""}`}
                    >
                      {loadHiringStatus
                        ? "Updating..."
                        : job.isOpen
                        ? "Close Hiring"
                        : "Open Hiring"}
                    </button>
                  ) : (
                    <ApplyJob
                      job={job}
                      user={user}
                      fetchJob={fetchJob}
                      applied={job?.applications?.find(
                        (ap) => ap.candidate_id === user.id
                      )}
                    />
                  )}
                </div>

                <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                    Hiring Status
                  </h4>
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        job.isOpen ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                    <span className="text-slate-700 font-semibold">
                      {job.isOpen ? "Actively Recruiting" : "Positions Filled"}
                    </span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {isRecruiter && (
        <section className="relative mt-28 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50/40 via-transparent to-indigo-50/40 blur-3xl opacity-60" />

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div className="space-y-2">
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">
                Applications
              </h2>
              <p className="text-slate-500 font-medium">
                Review, track, and manage your candidate pipeline
              </p>
            </div>

            <div className="flex items-center gap-4 px-6 py-3 rounded-2xl bg-white/80 backdrop-blur-xl border border-slate-100 shadow-[0_8px_30px_-18px_rgba(0,0,0,0.15)]">
              <div className="h-9 w-1.5 rounded-full bg-gradient-to-b from-blue-300 to-indigo-300" />
              <div className="flex flex-col leading-tight">
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                  Total Applications
                </span>
                <span className="text-2xl font-black text-slate-800">
                  {job?.applications?.length || 0}
                </span>
              </div>
            </div>
          </div>

          {applications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 rounded-[2.5rem] bg-white/60 backdrop-blur-xl border border-dashed border-slate-200 shadow-sm transition-all hover:bg-white/70">
              <div className="h-16 w-16 rounded-2xl bg-white shadow-md border border-slate-100 flex items-center justify-center mb-5">
                <BriefcaseBusiness className="h-8 w-8 text-slate-300" />
              </div>
              <p className="text-slate-900 font-black text-xl">
                No applications yet
              </p>
              <p className="text-slate-400 text-sm mt-1">
                Candidates who apply will appear here.
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {currentApplications.map((application) => (
                  <ApplicationCard
                    key={application.id}
                    application={application}
                    isRecruiter={isRecruiter}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="px-3 py-2 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-100 disabled:opacity-40"
                  >
                    ←
                  </button>

                  {Array.from({ length: totalPages }).map((_, index) => {
                    const page = index + 1;
                    const isActive = page === currentPage;
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`h-10 w-10 rounded-xl text-sm font-black transition-all ${
                          isActive
                            ? "bg-blue-600 text-white shadow-md"
                            : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="px-3 py-2 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-100 disabled:opacity-40"
                  >
                    →
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      )}
    </div>
  );
};

export default Job;