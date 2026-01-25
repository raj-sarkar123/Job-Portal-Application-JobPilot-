import { getMyJobs, deleteJob } from "@/api/apiJobs";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import JobCard from "./JobCard";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Trash2,
  Briefcase,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ITEMS_PER_PAGE = 3;

const CreatedJobs = () => {
  const { user, isLoaded } = useUser();
  const [page, setPage] = useState(1);

  const { fn: fnDeleteJob } = useFetch(deleteJob);

  const {
    loading: loadingCreatedJobs,
    data: createdJobs,
    fn: fnCreatedJobs,
  } = useFetch(getMyJobs);

const handleDeleteJob = async (jobId) => {
  if (!jobId) return;
  console.log("Deleting:", jobId);
  await fnDeleteJob({ job_id: jobId }); // ✅ MUST be an object
  fnCreatedJobs({ recruiter_id: user.id });
};


  const jobsList = createdJobs ?? [];

  useEffect(() => {
    if (isLoaded && user?.id) {
      fnCreatedJobs({ recruiter_id: user.id });
    }
  }, [isLoaded, user?.id]);

  if (!isLoaded || loadingCreatedJobs) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] w-full">
        <BarLoader width={180} color="#4f46e5" />
      </div>
    );
  }

  const totalPages = Math.ceil(jobsList.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const currentJobs = jobsList.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-6">
      {/* Heading */}
      <div className="flex flex-col items-center mb-10 text-center">
        <div className="flex items-center justify-center w-14 h-14 bg-indigo-50 rounded-2xl text-indigo-600 mb-3 border border-indigo-100">
          <LayoutDashboard size={28} />
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Posted Jobs
        </h1>
        <p className="text-slate-500 mt-1 text-sm font-medium">
          Manage jobs you’ve posted.
        </p>
      </div>

      {jobsList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <Briefcase className="w-10 h-10 text-slate-300 mb-3" />
          <p className="text-slate-500 font-medium">No jobs found.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {currentJobs.map((job) => (
              <div
                key={job.id} // ✅ FIXED
                className="w-full max-w-[380px] bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Delete */}
                <div className="flex justify-end p-4 pb-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-lg cursor-pointer text-red-600 hover:text-red-600 hover:bg-red-50"
                    onClick={() => handleDeleteJob(job.id)} // ✅ FIXED
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>

                {/* Job Card */}
                <div className="px-4 pb-5 pt-1 flex-grow">
                  <div className="h-full p-2 bg-slate-50/40 rounded-[1.5rem] border border-slate-50">
                    <div className="scale-[0.98] origin-top">
                      <JobCard
                        job={job}
                        isMyJob
                        onJobAction={() =>
                          fnCreatedJobs({ recruiter_id: user.id })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-10">
              <Button
                variant="outline"
                size="icon"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                <ChevronLeft size={16} />
              </Button>

              <span className="text-sm font-medium text-slate-600">
                Page {page} of {totalPages}
              </span>

              <Button
                variant="outline"
                size="icon"
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CreatedJobs;
