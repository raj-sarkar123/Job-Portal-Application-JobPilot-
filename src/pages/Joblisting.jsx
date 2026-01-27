import React, { useEffect, useState, useRef } from "react";
import { getJobs } from "@/api/apiJobs";

import JobCard from "@/components/JobCard";
import { Input } from "@/components/ui/input";
import {
  Search,
  MapPin,
  Building2,
  Briefcase,
  ChevronDown,
  X,
} from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";

/* ---------- Cities ---------- */
const RAW_CITIES = [
  // Pan-India / Metro

  "Bengaluru",
  "Hyderabad",
  "Chennai",
  "Mumbai",
  "Pune",
  "Delhi",
  "Noida",
  "Gurugram",
  "Faridabad",
  "Ghaziabad",
  "Kolkata",
  "Ahmedabad",

  // NCR & North India
  "Chandigarh",
  "Mohali",
  "Jaipur",
  "Udaipur",
  "Jodhpur",
  "Dehradun",
  "Haridwar",
  "Lucknow",
  "Kanpur",
  "Agra",
  "Varanasi",
  "Prayagraj",

  // West India
  "Vadodara",
  "Surat",
  "Rajkot",
  "Gandhinagar",
  "Indore",
  "Bhopal",
  "Ujjain",
  "Nagpur",
  "Nashik",
  "Aurangabad",

  // South India
  "Coimbatore",
  "Madurai",
  "Trichy",
  "Salem",
  "Vellore",
  "Vijayawada",
  "Guntur",
  "Visakhapatnam",
  "Tirupati",
  "Warangal",
  "Karimnagar",
  "Kochi",
  "Trivandrum",
  "Thrissur",
  "Calicut",
  "Mangaluru",
  "Udupi",
  "Mysuru",
  "Hubballi",

  // East & North-East
  "Howrah",
  "Salt Lake",
  "New Town",
  "Durgapur",
  "Asansol",
  "Bhubaneswar",
  "Cuttack",
  "Rourkela",
  "Patna",
  "Gaya",
  "Ranchi",
  "Jamshedpur",
  "Guwahati",
  "Shillong",
  "Agartala",

  // Central & Others
  "Raipur",
  "Bilaspur",
  "Amritsar",
  "Ludhiana",
  "Jalandhar",
  "Bathinda",
  "Jammu",
  "Srinagar",
];

const INDIAN_CITIES = ["Remote", ...RAW_CITIES.sort()];
const ITEMS_PER_PAGE = 4;

/* ---------- Debounce ---------- */
const useDebounce = (value, delay = 300) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
};

const JobListing = () => {
  const { isLoaded, user } = useUser();
  const { getToken, isSignedIn } = useAuth();

  // ✅ CORRECT recruiter detection
  const role = user?.unsafeMetadata?.role || user?.publicMetadata?.role;

  const isRecruiter = role === "recruiter";

  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");

  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const dropdownRef = useRef(null);

  const debouncedSearch = useDebounce(searchQuery);
  useEffect(() => {
    setPage(1);
  }, [location, company_id, debouncedSearch]);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* 🔧 FIX: pass params ONLY when calling fnJobs */
  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) return;

    const loadJobs = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = await getToken({ template: "supabase" });

        if (!token) {
          console.warn("Supabase token not ready yet");
          return;
        }

        const data = await getJobs(token, {
          location: isRecruiter ? "" : location,
          company_id,
          searchQuery: isRecruiter ? "" : debouncedSearch,
        });

        setJobs(data);
      } catch (err) {
        console.error("Job fetch failed:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, [
    isLoaded,
    isSignedIn,
    isRecruiter,
    location,
    company_id,
    debouncedSearch,
  ]);

  const filteredCities = INDIAN_CITIES.filter((city) =>
    city.toLowerCase().includes(locationSearch.toLowerCase()),
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsLocationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [page, setPage] = useState(1);
  const totalPages = Math.ceil((jobs?.length || 0) / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const currentJobs = jobs?.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    if (error) {
      const t = setTimeout(() => {
        setError(null);
      }, 500);
      return () => clearTimeout(t);
    }
  }, [error]);

  return (
    <section className="min-h-screen w-full bg-[#f8fafc] py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* ---------- HEADER ---------- */}
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-cyan-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#14a7b8]">
            <Briefcase size={14} />
            {isRecruiter ? "Recruiter Panel" : "Career Portal"}
          </div>

          <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            {isRecruiter ? (
              <>
                Your <span className="text-[#14a7b8]">Job Listings</span>
              </>
            ) : (
              <>
                Find Your <span className="text-[#14a7b8]">Dream Role</span>
              </>
            )}
          </h1>

          <p className="mt-4 max-w-xl text-lg text-slate-500 font-medium">
            {isRecruiter
              ? "Manage and track the jobs you’ve posted."
              : "Browse verified job opportunities from top companies."}
          </p>
        </div>

        {/* ---------- SEARCH (Candidates only) ---------- */}
        {!isRecruiter && (
          <div className="relative z-50 mb-10 rounded-3xl border border-slate-200 bg-white/80 p-2 shadow-xl backdrop-blur-xl">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
              {/* Search */}
              <div className="relative flex items-center">
                <Search className="absolute left-4 text-slate-400" size={18} />
                <Input
                  placeholder="Search job title…"
                  className="h-14 border-none bg-transparent pl-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Location */}
              <div
                className="relative flex items-center md:border-l"
                ref={dropdownRef}
                style={{ overflow: "visible" }}
              >
                <MapPin className="absolute left-4 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Search city..."
                  className="h-14 w-full bg-transparent pl-12 pr-10 focus:outline-none"
                  value={
                    isLocationOpen ? locationSearch : location || "Anywhere"
                  }
                  onFocus={() => {
                    setIsLocationOpen(true);
                    setLocationSearch("");
                  }}
                  onChange={(e) => setLocationSearch(e.target.value)}
                />
                <div className="absolute right-4 flex items-center gap-2">
                  {location && (
                    <X
                      size={14}
                      className="cursor-pointer"
                      onClick={() => {
                        setLocation("");
                        setLocationSearch("");
                      }}
                    />
                  )}
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${isLocationOpen ? "rotate-180" : ""}`}
                  />
                </div>

                {isLocationOpen && (
                  <div className="absolute top-[110%] z-50 w-full max-h-64 overflow-y-auto rounded-2xl bg-white shadow-lg">
                    {filteredCities.map((city) => (
                      <div
                        key={city}
                        className="px-4 py-2 cursor-pointer hover:bg-cyan-50"
                        onClick={() => {
                          setLocation(city);
                          setIsLocationOpen(false);
                          setLocationSearch("");
                        }}
                      >
                        {city}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Company */}
              <div className="relative flex items-center md:border-l">
                <Building2
                  className="absolute left-4 text-slate-400"
                  size={18}
                />
                <Input
                  placeholder="Company filter"
                  className="h-14 border-none bg-transparent pl-12"
                  value={company_id}
                  onChange={(e) => setCompany_id(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* ---------- CONTENT ---------- */}
        {loading && (
          <div className="h-1 w-full rounded-full bg-[#14a7b8] animate-pulse mb-10" />
        )}

        {error && (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center text-red-600">
            Failed to load jobs. Retrying…
          </div>
        )}

        {!loading && !error && (
          <>
            {jobs?.length ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentJobs.map((job) => (
  <JobCard
    key={job.id}   // ✅ THIS LINE FIXES THE WARNING
    job={job}
    isOwner={
      isRecruiter &&
      String(job.recruiter_id) === String(user?.id)
    }
    isRecruiter={isRecruiter}
  />
))}

              </div>
            ) : (
              <div className="py-24 text-center">
                <h3 className="text-2xl font-bold text-slate-800">
                  {isRecruiter ? "No jobs posted yet" : "No jobs found"}
                </h3>
                <p className="text-slate-500 mt-2">
                  {isRecruiter
                    ? "Post your first job to start hiring."
                    : "Try adjusting your search filters."}
                </p>
              </div>
            )}
          </>
        )}
      </div>
      {totalPages > 1 && (
        <div className="mt-14 flex items-center justify-center gap-6">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← Prev
          </button>

          <div className="rounded-full bg-slate-100 px-5 py-2 text-sm font-bold text-slate-700">
            {page} / {totalPages}
          </div>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      )}
    </section>
  );
};

export default JobListing;
