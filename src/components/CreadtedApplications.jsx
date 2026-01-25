import { getApplications } from "@/api/apiApplications";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState, useMemo } from "react";
import { BarLoader } from "react-spinners";
import ApplicationCard from "./ApplicationCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Inbox, Briefcase, MapPin, LayoutDashboard } from "lucide-react";

const ITEMS_PER_PAGE = 3;

const CreatedApplications = () => {
  const { user, isLoaded } = useUser();
  const [page, setPage] = useState(1);

  const {
    loading: loadingApplications,
    data: applications,
    fn: fnApplications,
  } = useFetch(getApplications, {
    user_id: user?.id,
  });

  useEffect(() => {
    if (isLoaded && user?.id) {
      fnApplications();
    }
  }, [isLoaded, user?.id]);

  // Sorting: Newest applications first
  const applicationsList = useMemo(() => {
    if (!applications) return [];
    return [...applications].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  }, [applications]);

  const totalPages = Math.ceil(applicationsList.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const currentApplications = applicationsList.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "applied": return "bg-blue-50 text-blue-600 border-blue-100";
      case "interviewing": return "bg-amber-50 text-amber-600 border-amber-100";
      case "hired": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      default: return "bg-slate-50 text-slate-500 border-slate-100";
    }
  };

  if (!isLoaded || (loadingApplications && !applications)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] w-full">
        <BarLoader width={180} color="#4f46e5" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-6">
      {/* --- Heading Section --- */}
      <div className="flex flex-col items-center mb-10 text-center">
        <div className="flex items-center justify-center w-14 h-14 bg-indigo-50 rounded-2xl text-indigo-600 mb-3 border border-indigo-100">
          <LayoutDashboard size={28} />
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          My Applications
        </h1>
        <p className="text-slate-500 mt-1 text-sm font-medium">
          Manage your recent job submissions.
        </p>
      </div>

      {/* --- Shorter Grid Layout --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {currentApplications.map((application) => (
          <div
            key={application.id}
            className="w-full max-w-[380px] bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden"
          >
            {/* Top Header Section: Reduced Padding */}
            <div className="p-5 pb-3 flex items-start justify-between">
              <div className="flex gap-3 min-w-0">
                <div className="h-10 w-10 rounded-xl border border-slate-100 bg-white p-1.5 flex items-center justify-center shrink-0 shadow-sm">
                  <img
                    src={application.job?.company?.logo || "/placeholder.png"}
                    alt="logo"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-slate-900 truncate leading-none mb-1">
                    {application.job?.title}
                  </h3>
                  <p className="text-[11px] text-indigo-600 font-bold truncate">
                    {application.job?.company?.name}
                  </p>
                  <div className="flex items-center gap-1 text-[9px] text-slate-400 mt-0.5 uppercase font-bold tracking-wider">
                    <MapPin size={9} /> {application.job?.location || "Remote"}
                  </div>
                </div>
              </div>
              <span className={`px-2 py-0.5 text-[8px] font-black uppercase tracking-widest rounded-full border ${getStatusColor(application.status)}`}>
                {application.status}
              </span>
            </div>

            {/* Application Details Area: Tightened vertical space */}
            <div className="px-4 pb-4 flex-grow">
              <div className="h-full p-1.5 bg-slate-50/40 rounded-[1.5rem] border border-slate-50">
                <div className="scale-[0.98] origin-top">
                  <ApplicationCard application={application} isCandidate />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- Pagination --- */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10">
          <div className="flex items-center bg-white p-1.5 rounded-xl border border-slate-100 shadow-sm gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              <ChevronLeft size={16} />
            </Button>
            <span className="px-3 text-xs font-bold text-slate-600">
              {page} / {totalPages}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatedApplications;