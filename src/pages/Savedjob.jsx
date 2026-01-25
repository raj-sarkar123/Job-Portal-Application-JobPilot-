import { getSavedJobs } from "@/api/apiJobs";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import JobCard from "@/components/JobCard";
import { Sparkles, Inbox, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

/* ---------- Pagination Config ---------- */
const ITEMS_PER_PAGE = 6;

const SavedJob = () => {
  const { isLoaded } = useUser();
  const navigate = useNavigate();

  const {
    loading: loadingSavedJobs,
    data: savedJobs,
    fn: fnSavedJobs,
  } = useFetch(getSavedJobs);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (isLoaded) fnSavedJobs();
  }, [isLoaded]);

  /* ---------- Derived Pagination Data ---------- */
  const totalJobs = savedJobs?.length || 0;
  const totalPages = Math.ceil(totalJobs / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const paginatedJobs = savedJobs?.slice(startIndex, endIndex);

  /* ---------- Loading ---------- */
  if (!isLoaded || (loadingSavedJobs && !savedJobs)) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-slate-400">
        Loading your saved jobs…
      </div>
    );
  }

  return (
    <section className="relative max-w-6xl mx-auto px-4 py-12 sm:py-20">
      {/* Background */}
      <div className="absolute top-0 right-0 -z-10 h-[400px] w-[400px] bg-indigo-100/30 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] bg-cyan-100/20 blur-[120px] rounded-full" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
      >
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-bold uppercase tracking-widest">
            <Sparkles className="w-3 h-3" />
            Personal Collection
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900">
            Saved <span className="text-indigo-600">Jobs</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-xl">
            Review, compare, and apply when you're ready.
          </p>
        </div>

        {totalJobs > 0 && (
          <div className="text-sm font-bold text-slate-400 bg-slate-50 px-4 py-2 rounded-xl border">
            {totalJobs} Opportunities
          </div>
        )}
      </motion.div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {paginatedJobs?.length > 0 ? (
          <>
            {/* Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 },
                },
              }}
            >
              {paginatedJobs.map((saved) => (
                <motion.div
                  key={saved.id}
                  variants={{
                    hidden: { opacity: 0, y: 20, scale: 0.95 },
                    show: { opacity: 1, y: 0, scale: 1 },
                  }}
                >
                  <JobCard
                    job={saved.job}
                    savedInit={true}
                    onJobSaved={fnSavedJobs}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-14 flex items-center justify-center gap-3">
                <Button
                  variant="ghost"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                >
                  <ChevronLeft size={18} />
                </Button>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <Button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`h-10 w-10 rounded-xl font-bold ${
                      currentPage === i + 1
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {i + 1}
                  </Button>
                ))}

                <Button
                  variant="ghost"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => p + 1)}
                >
                  <ChevronRight size={18} />
                </Button>
              </div>
            )}
          </>
        ) : (
          /* Empty State */
          <div className="py-24 text-center">
            <Inbox className="mx-auto mb-6 h-16 w-16 text-indigo-500" />
            <h3 className="text-2xl font-bold">No saved jobs</h3>
            <p className="mt-2 text-slate-500">
              Start exploring and bookmark jobs you like.
            </p>
            <Button
              onClick={() => navigate("/jobs")}
              className="mt-6 rounded-2xl px-8"
            >
              <Search className="mr-2 h-4 w-4" />
              Browse Jobs
            </Button>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SavedJob;
