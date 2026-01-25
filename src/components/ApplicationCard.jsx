import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Download,
  GraduationCap,
  Laptop,
  CalendarDays,
} from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { updateApplicationsStatus } from "@/api/apiApplications";
import { BarLoader } from "react-spinners";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STATUS_COLORS = {
  Applied:
    "bg-blue-50 text-blue-700 border-blue-200 ring-1 ring-blue-100",
  Interviewing:
    "bg-amber-50 text-amber-700 border-amber-200 ring-1 ring-amber-100",
  Hired:
    "bg-emerald-50 text-emerald-700 border-emerald-200 ring-1 ring-emerald-100",
  Rejected:
    "bg-rose-50 text-rose-700 border-rose-200 ring-1 ring-rose-100",
};

const ApplicationCard = ({ application, isCandidate = false }) => {
  // const handleDownload = () => {
  //   const link = document.createElement("a");
  //   link.href = application?.resume;
  //   link.target = "_blank";
  //   link.click();
  // };



  const handleDownload = async () => {
  if (!application?.resume) return;

  const res = await fetch(application.resume);
  const blob = await res.blob();

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "resume.pdf";
  a.click();

  window.URL.revokeObjectURL(url);
};


  const {
    loading: loadingHiringStatus,
    fn: fnHiringStatus,
  } = useFetch(updateApplicationsStatus, {
    job_id: application.job_id,
  });

  const handleStatusChange = (status) => {
    fnHiringStatus(status);
  };

 return (
 <Card className="group relative rounded-3xl border border-white/40 bg-white/70 backdrop-blur-xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_rgba(59,130,246,0.35)]">

    {/* Top loading bar */}
    {loadingHiringStatus && (
      <div className="absolute top-0 left-0 right-0 z-20">
        <BarLoader width="100%" height={2} color="#3b82f6" />
      </div>
    )}

    {/* Soft gradient glow */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-transparent to-indigo-50/40 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

    <CardHeader className="relative z-10 flex flex-row items-start justify-between gap-4 pb-4">
      <div className="space-y-1">
        <CardTitle className="text-xl font-black tracking-tight text-slate-900">
          {application?.name}
        </CardTitle>

        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${
            STATUS_COLORS[application?.status] ||
            "bg-slate-100 text-slate-600 border-slate-200"
          }`}
        >
          {application?.status}
        </span>
      </div>

      <button
        onClick={handleDownload}
        className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-600 shadow-sm transition-all hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:shadow-lg active:scale-95"
        title="Download Resume"
      >
        <Download size={18} />
      </button>
    </CardHeader>

    <CardContent className="relative z-10 grid gap-5 text-slate-600">
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-100">
          <Laptop size={16} className="text-blue-500" />
          <span className="text-sm font-semibold">
            {application?.experience} yrs experience
          </span>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-100">
          <GraduationCap size={16} className="text-indigo-500" />
          <span className="text-sm font-semibold">
            {application?.education}
          </span>
        </div>
      </div>

      <div className="rounded-2xl bg-slate-50/60 border border-slate-100 p-4">
        <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 block mb-1">
          Skills
        </span>
        <p className="text-sm leading-relaxed text-slate-700">
          {application?.skills}
        </p>
      </div>
    </CardContent>

    <CardFooter className="relative z-10 flex items-center justify-between border-t border-slate-100 bg-white/50 pt-4">
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
        <CalendarDays size={14} />
        {new Date(application?.created_at).toLocaleDateString()}
      </div>

      {!isCandidate && (
        <Select
          defaultValue={application.status}
          onValueChange={handleStatusChange}
        >
          <SelectTrigger className="w-[150px] h-10 rounded-xl bg-white border-slate-200 text-xs font-bold shadow-sm focus:ring-blue-500">
            <SelectValue placeholder="Update status" />
          </SelectTrigger>

          <SelectContent
  position="popper"
  side="top"
  align="end"
  sideOffset={10}
  className="z-[9999] rounded-2xl border border-slate-200 bg-white shadow-2xl"
>
  <SelectItem value="Applied">Applied</SelectItem>
  <SelectItem value="Interviewing">Interviewing</SelectItem>
  <SelectItem value="Hired">Hired</SelectItem>
  <SelectItem value="Rejected">Rejected</SelectItem>
</SelectContent>

        </Select>
      )}
    </CardFooter>
  </Card>
);

};

export default ApplicationCard;
