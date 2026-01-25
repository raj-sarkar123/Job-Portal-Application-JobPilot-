import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Heart,
  ExternalLink,
  Loader2,
  Clock,
  Users,
} from "lucide-react";
import { saveJob, unsaveJob } from "@/api/apiJobs";
import useFetch from "@/hooks/use-fetch";

const JobCard = ({
  job,
  isMyJob = false,
  savedInit = false,
  onJobSaved,
}) => {
  const navigate = useNavigate();

  /* ---------------- Saved State ---------------- */
  // const [saved, setSaved] = useState(savedInit);

  const [saved, setSaved] = useState(
  savedInit || job?.saved?.length > 0
);

  // 🔥 SYNC with parent updates (THIS WAS MISSING)
useEffect(() => {
  setSaved(savedInit || job?.saved?.length > 0);
}, [savedInit, job?.saved]);


  const { fn: save, loading: saving } = useFetch(saveJob);
  const { fn: unsave, loading: unsaving } = useFetch(unsaveJob);

  const isSavingOrUnsaving = saving || unsaving;

  const handleToggleSave = async () => {
    if (isSavingOrUnsaving) return;

    const prev = saved;
    setSaved(!prev);

    try {
      if (prev) {
        await unsave(job.id);
        onJobSaved?.(); // refresh saved list
      } else {
        await save(job.id);
      }
    } catch (err) {
      console.error("Save toggle failed:", err);
      setSaved(prev); // rollback
    }
  };
const applications = job?.applications || [];
  return (
    <Card className="group relative overflow-hidden rounded-3xl border border-slate-200/60 bg-white/70 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200/50">
      {/* Accent Line */}
      <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-cyan-400 to-[#14a7b8] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <CardContent className="p-6 space-y-5">
        {/* HEADER */}
        <div className="flex justify-between items-start">
          <div className="flex gap-4">
            {/* Logo */}
            <div className="h-14 w-14 shrink-0 rounded-2xl bg-white border border-slate-100 p-2 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              {job.company?.logo ? (
                <img
                  src={job.company.logo}
                  alt={job.company.name}
                  className="h-full w-full object-contain"
                />
              ) : (
                <span className="text-xl font-bold text-slate-300 uppercase">
                  {job.company?.name?.[0]}
                </span>
              )}
            </div>

            {/* Title */}
            <div>
              <h3 className="font-bold text-lg text-slate-900 group-hover:text-[#14a7b8] transition-colors">
                {job.title}
              </h3>
              <p className="text-sm font-medium text-slate-500">
                {job.company?.name}
              </p>

              {isMyJob && (
                <span className="absolute top-4 right-4 rounded-full bg-emerald-50 px-3 py-0.5 text-xs font-bold text-emerald-600 border border-emerald-100">
                  Your Job
                </span>
              )}
            </div>
          </div>

          {/* SAVE BUTTON */}
          {!isMyJob && (
            <Button
              size="icon"
              variant="ghost"
              disabled={isSavingOrUnsaving}
              onClick={handleToggleSave}
              className={`rounded-full transition-all cursor-pointer ${
                saved
                  ? "bg-red-50 text-red-500 hover:bg-red-100"
                  : "text-slate-400 hover:bg-slate-100 hover:text-red-500"
              }`}
            >
              {isSavingOrUnsaving ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <Heart
                  size={20}
                  fill={saved ? "currentColor" : "none"}
                  className={saved ? "scale-110" : ""}
                />
              )}
            </Button>
          )}
        </div>

        {/* META */}
        <div className="flex flex-wrap gap-2">
          {job.location && (
            <div className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              <MapPin size={12} className="text-[#14a7b8]" />
              {job.location}
            </div>
          )}

          <div className="flex items-center gap-1.5 rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-[#14a7b8]">
            Full-time
          </div>

          {/* {isMyJob && (
            <div className="flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
              <Users size={12} />
              {job.applications?.length ?? 0} Applicants
            </div>
          )} */}
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        {/* FOOTER */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1.5">
            <Clock size={12} className="text-slate-400" />
            <span className="text-xs font-medium text-slate-400">
              {isMyJob ? "Manage posting" : "Recently posted"}
            </span>
          </div>

          <Button
            onClick={() => navigate(`/job/${job.id}`)}
            className="group/btn h-10 rounded-xl bg-[#14a7b8] px-5 font-bold text-white shadow-lg shadow-cyan-200/50 transition-all hover:bg-[#118a99] active:scale-95 cursor-pointer"
          >
            Details
            <ExternalLink size={14} className="ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
