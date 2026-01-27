import { getCompanies } from "@/api/apiCompanies";
import { addNewJob } from "@/api/apiJobs";
import AddCompanyDrawer from "@/components/ui/add_compnyDrawer";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { z } from "zod";
import {
  Briefcase,
  MapPin,
  Building2,
  FileText,
  Plus,
  Sparkles,
  Wand2,
  ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";

/* ---------------- Validation ---------------- */
const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  company_id: z.string().min(1, "Company is required"),
  recuirements: z.string().min(1, "Requirements are required"),
});

/* ---------------- Cities ---------------- */
const RAW_CITIES = [
  "Remote","Bengaluru","Hyderabad","Chennai","Mumbai","Pune","Delhi","Noida",
  "Gurugram","Faridabad","Ghaziabad","Kolkata","Ahmedabad","Chandigarh","Mohali",
  "Jaipur","Udaipur","Jodhpur","Dehradun","Haridwar","Lucknow","Kanpur","Agra",
  "Varanasi","Prayagraj","Vadodara","Surat","Rajkot","Gandhinagar","Indore",
  "Bhopal","Ujjain","Nagpur","Nashik","Aurangabad","Coimbatore","Madurai",
  "Trichy","Salem","Vellore","Vijayawada","Guntur","Visakhapatnam","Tirupati",
  "Warangal","Karimnagar","Kochi","Trivandrum","Thrissur","Calicut","Mangaluru",
  "Udupi","Mysuru","Hubballi","Howrah","Salt Lake","New Town","Durgapur",
  "Asansol","Bhubaneswar","Cuttack","Rourkela","Patna","Gaya","Ranchi",
  "Jamshedpur","Guwahati","Shillong","Agartala","Raipur","Bilaspur",
  "Amritsar","Ludhiana","Jalandhar","Bathinda","Jammu","Srinagar",
];

const INDIAN_CITIES = [...new Set(RAW_CITIES)].sort();

/* ---------------- Component ---------------- */
const PostJob = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      company_id: "",
      recuirements: "",
    },
  });

  const {
    loading: loadingCreateJob,
    error: errorCreateJob,
    data: dataCreateJob,
    fn: fnCreateJob,
  } = useFetch(addNewJob);

  const {
    data: companies,
    fn: fnCompanies,
  } = useFetch(getCompanies);

  const onSubmit = (formData) => {
    fnCreateJob({
      ...formData,
      recruiter_id: user.id,
      isOpen: true,
    });
  };

  useEffect(() => {
    if (dataCreateJob) navigate("/jobs");
  }, [dataCreateJob, navigate]);

  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded, fnCompanies]);

  if (!isLoaded) return null;

  if (user?.unsafeMetadata?.role !== "recruiter") {
    return <Navigate to="/jobs" />;
  }
  const ErrorText = ({ message }) =>
  message ? (
    <p className="ml-2 text-xs font-medium text-red-500">{message}</p>
  ) : null;


  return (
    <section className="relative max-w-4xl mx-auto px-4 py-12 sm:py-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-50 via-white to-cyan-50 rounded-[3rem]" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative rounded-[2.5rem] bg-white/80 backdrop-blur-2xl border border-slate-200 shadow-[0_32px_64px_-20px_rgba(0,0,0,0.1)] p-6 sm:p-12"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3 h-3" />
            Recruiter Console
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Post a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
              Job
            </span>
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* Role Essentials */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-800 font-bold ml-1">
              <Briefcase className="w-5 h-5 text-indigo-500" />
              <h2>Role Essentials</h2>
            </div>

            <input
              {...register("title")}
              placeholder="Job Title (e.g. Senior Frontend Engineer)"
              className="w-full h-14 px-6 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-indigo-500/30 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-slate-900 placeholder:text-slate-400"
              
            />
            <ErrorText message={errors.title?.message} />

            <textarea
              {...register("description")}
              rows={4}
              placeholder="Describe the mission and the day-to-day..."
              className="w-full p-6 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-indigo-500/30 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none resize-none text-slate-900 placeholder:text-slate-400"
            />
            <ErrorText message={errors.description?.message} />
          </div>

          {/* Location & Company */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Location */}
            <div className="space-y-2">
              <label className="ml-1 text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-500" />
                Location
              </label>

              <div className="relative group w-full">
                <select
                  {...register("location")}
                  defaultValue=""
                  className="peer h-14 w-full appearance-none rounded-2xl bg-slate-50 border border-transparent px-5 pr-12 text-slate-900 hover:bg-slate-100 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all outline-none"
                >
                  <option value="" disabled>Where is this based?</option>
                  {INDIAN_CITIES.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <ErrorText message={errors.location?.message} />

                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-all" />
              </div>
            </div>

            {/* Company */}
            <div className="space-y-2">
              <label className="ml-1 text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-indigo-500" />
                Company
              </label>

              <div className="flex gap-3">
                <div className="relative group flex-[1.5]">
                  <select
                    {...register("company_id")}
                    defaultValue=""
                    className="peer h-14 w-full appearance-none rounded-2xl bg-slate-50 border border-transparent px-5 pr-12 text-slate-900 hover:bg-slate-100 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all outline-none"
                  >
                    <option value="" disabled>Hiring Company</option>
                    {companies?.map(({ id, name }) => (
                      <option key={id} value={id}>{name}</option>
                    ))}
                  </select>
                  <ErrorText message={errors.company_id?.message} />
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-all" />
                </div>

                {/* <AddCompanyDrawer fetchCompanies={fnCompanies}>
                  <button
                    type="button"
                    className="group relative flex h-14 flex-1 items-center gap-3 rounded-2xl px-4 min-w-[160px] bg-gradient-to-r from-indigo-50/80 to-blue-50/80 border border-indigo-100/50 backdrop-blur-sm text-indigo-600 transition-all duration-300 hover:from-indigo-100 hover:to-blue-100 hover:border-indigo-300 active:scale-[0.97]"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                      <Plus className="w-5 h-5 transition-transform duration-500 group-hover:rotate-90" />
                    </div>
                    <p className="text-sm font-bold text-slate-700 whitespace-nowrap">
                      Add New
                    </p>
                  </button>
                </AddCompanyDrawer> */}
                <AddCompanyDrawer fetchCompanies={fnCompanies}/>
                  
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="space-y-4">
            <div className="flex items-center justify-between ml-1">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <FileText className="w-5 h-5 text-indigo-500" />
                <h2>Requirements</h2>
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Required
              </span>
            </div>

            <textarea
              {...register("recuirements")}
              rows={4}
              placeholder="Experience, tech stack, or soft skills..."
              className="w-full p-6 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-indigo-500/30 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-slate-900 placeholder:text-slate-400"
            />
            <ErrorText message={errors.recuirements?.message} />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loadingCreateJob}
            className="w-full h-16 rounded-2xl bg-slate-900 text-white font-bold text-lg hover:bg-black transition-all flex items-center justify-center gap-3 shadow-[0_20px_40px_-12px_rgba(15,23,42,0.3)] active:scale-[0.99] disabled:opacity-70"
          >
            {loadingCreateJob ? "Posting…" : (
              <>
                Post Job Opening
                <Wand2 className="w-5 h-5 text-indigo-400" />
              </>
            )}
          </button>

          {errorCreateJob && (
            <p className="text-sm text-red-500">{errorCreateJob.message}</p>
          )}
        </form>
      </motion.div>
    </section>
  );
};

export default PostJob;