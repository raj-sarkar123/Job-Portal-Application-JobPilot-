import React, { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import useFetch from "@/hooks/use-fetch";
import { applyToJob } from "@/api/apiApplications";
import { Loader2, CheckCircle2, Upload, Briefcase, GraduationCap, Laptop } from "lucide-react";

/* ---------------- Schema ---------------- */
const schema = z.object({
  experience: z
    .number()
    .min(0, { message: "Experience must be at least 0" }),
  skills: z.string().min(1, { message: "Skills are required" }),
  education: z.enum(["Intermediate", "Graduate", "Post Graduate"]),
  resume: z
    .any()
    .refine(
      (file) =>
        file?.[0] &&
        ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file[0].type),
      "Only PDF or Word documents are allowed"
    ),
});

const ApplyJob = ({ user, job, applied = false, fetchJob }) => {
  const [open, setOpen] = useState(false);
  const [optimisticApplied, setOptimisticApplied] = useState(applied);
  const [fileName, setFileName] = useState(""); // ✅ Fixed: properly initialized

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      education: "Graduate",
    },
  });

  const { loading, error, fn: fnApply } = useFetch(applyToJob);

  /* ---------------- Submit ---------------- */
  const onSubmit = async (data) => {
    try {
      await fnApply({
        job_id: job.id,
        candidate_id: user.id,
        status: "Applied", 
        name: user.fullName,
        experience: data.experience,
        skills: data.skills,
        education: data.education,
        resume: data.resume[0],
       
      });

      setOptimisticApplied(true);
      setOpen(false);
      fetchJob(); 
      reset();
      setFileName(""); 
    } catch (err) {
      setOptimisticApplied(false);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          disabled={!job.isOpen || optimisticApplied}
          className={`group relative overflow-hidden w-full py-7 rounded-2xl font-bold text-xl transition-all duration-300 active:scale-95 shadow-lg ${
            job.isOpen
              ? optimisticApplied
                ? "bg-emerald-500 text-white cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-slate-100 text-slate-400 cursor-not-allowed border-2 border-slate-200"
          }`}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {job.isOpen ? (
              optimisticApplied ? (
                <><CheckCircle2 className="w-6 h-6 animate-in zoom-in" /> Applied Successfully</>
              ) : (
                "Apply for this position"
              )
            ) : (
              "Applications Closed"
            )}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="bg-white/95 backdrop-blur-xl border-t border-white/20">
        <div className="mx-auto w-full max-w-xl pb-10">
          <DrawerHeader className="px-6 pt-10 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-inner">
              <Briefcase className="h-8 w-8" />
            </div>
            <DrawerTitle className="text-3xl font-black tracking-tight text-slate-900">
              Submit Application
            </DrawerTitle>
            <DrawerDescription className="text-base text-slate-500 max-w-xs mx-auto">
              Applying for <span className="font-bold text-blue-600">{job.title}</span>
            </DrawerDescription>
          </DrawerHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-8 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-slate-700 font-bold ml-1">
                  <Laptop className="w-4 h-4 text-blue-500" /> Experience
                </Label>
                <Input
                  type="number"
                  placeholder="Years"
                  className="h-12 border-slate-200 focus:ring-blue-500 rounded-xl bg-white/50"
                  {...register("experience", { valueAsNumber: true })}
                />
                {errors.experience && <p className="text-xs text-red-500">{errors.experience.message}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-slate-700 font-bold ml-1">Skills</Label>
                <Input
                  type="text"
                  placeholder="React, AWS..."
                  className="h-12 border-slate-200 focus:ring-blue-500 rounded-xl bg-white/50"
                  {...register("skills")}
                />
                {errors.skills && <p className="text-xs text-red-500">{errors.skills.message}</p>}
              </div>
            </div>

            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-slate-700 font-bold ml-1">
                <GraduationCap className="w-4 h-4 text-blue-500" /> Education Level
              </Label>
              <Controller
                name="education"
                control={control}
                render={({ field }) => (
                  <RadioGroup onValueChange={field.onChange} value={field.value} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {["Intermediate", "Graduate", "Post Graduate"].map((lvl) => (
                      <Label
                        key={lvl}
                        htmlFor={lvl}
                        className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                          field.value === lvl 
                            ? "border-blue-600 bg-blue-50 shadow-sm" 
                            : "border-slate-100 bg-white/50 hover:bg-white"
                        }`}
                      >
                        <RadioGroupItem value={lvl} id={lvl} className="sr-only" />
                        <span className={`text-sm font-bold ${field.value === lvl ? "text-blue-700" : "text-slate-500"}`}>{lvl}</span>
                      </Label>
                    ))}
                  </RadioGroup>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-700 font-bold ml-1">Resume / CV</Label>
              <div className="relative group">
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="h-28 opacity-0 absolute inset-0 z-20 cursor-pointer"
                  {...register("resume", {
                    onChange: (e) => setFileName(e.target.files[0]?.name || "")
                  })}
                />
                <div className={`h-28 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all ${
                  fileName ? "border-emerald-400 bg-emerald-50/30" : "border-slate-200 bg-slate-50/50 group-hover:border-blue-400 group-hover:bg-blue-50/30"
                }`}>
                  {fileName ? (
                    <>
                      <CheckCircle2 className="w-8 h-8 text-emerald-500 mb-2 animate-in zoom-in" />
                      <span className="text-sm font-bold text-emerald-700 px-4 text-center line-clamp-1">{fileName}</span>
                      <span className="text-xs text-emerald-600 mt-1 uppercase font-black">Click to change</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-slate-400 group-hover:text-blue-500 mb-2 transition-transform group-hover:-translate-y-1" />
                      <span className="text-sm font-bold text-slate-500 group-hover:text-blue-600">Drop your CV here or click</span>
                    </>
                  )}
                </div>
              </div>
              {errors.resume && <p className="text-xs font-bold text-red-500 ml-1">{errors.resume.message}</p>}
            </div>

            {error?.message && <p className="text-red-500 text-sm font-bold">{error.message}</p>}

            <Button 
              type="submit" 
              disabled={loading} 
              className="w-full py-8 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xl shadow-xl transition-all"
            >
              {loading ? <><Loader2 className="mr-2 h-6 w-6 animate-spin" /> Submitting...</> : "Send Application"}
            </Button>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ApplyJob;