/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Building2,
  UploadCloud,
  Loader2,
  Plus,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useFetch from "@/hooks/use-fetch";
import { addNewCompany } from "@/api/apiCompanies";

/* ---------------- Schema ---------------- */
const schema = z.object({
  name: z.string().min(1, "Company name is required"),
  logo: z.any(),
});

const AddCompanyDrawer = ({ fetchCompanies }) => {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(null);

  const {
    register,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const { fn, data, loading, error } = useFetch(addNewCompany);
  const logo = watch("logo");

  /* ---------- Logo Preview ---------- */
  useEffect(() => {
    if (!logo?.length) {
      setPreview(null);
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(logo[0]);
    return () => reader.abort();
  }, [logo]);

  /* ---------- Submit ---------- */
  const handleCreate = () => {
    const values = getValues();
    if (!values.name || !values.logo?.length) return;

    fn({
      name: values.name,
      logo: values.logo[0],
    });
  };

  /* ---------- Success ---------- */
  useEffect(() => {
    if (data) {
      fetchCompanies();
      reset();
      setPreview(null);
      setOpen(false);
    }
  }, [data]);

  return (
    <>
      {/* Trigger Button (UNCHANGED UI) */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative flex h-14 min-w-[160px] items-center gap-3 rounded-2xl px-4
                   bg-gradient-to-r from-indigo-50/80 to-blue-50/80
                   border border-indigo-100/50 text-indigo-600 font-bold
                   hover:from-indigo-100 hover:to-blue-100"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm
                        group-hover:bg-indigo-600 group-hover:text-white transition">
          <Plus className="w-5 h-5" />
        </div>
        Add Company
      </button>

      {/* FULL PAGE MODAL */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Dark overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-br
                         from-slate-900/80 via-slate-900/70 to-black/80"
              onClick={() => setOpen(false)}
            />

            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative z-10 w-full max-w-xl mx-4
                         rounded-[2.5rem] bg-white p-8 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.5)]"
            >
              {/* Close */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-5 right-5 rounded-xl p-2
                           text-slate-400 hover:text-slate-900 hover:bg-slate-100"
              >
                <X />
              </button>

              {/* Header */}
              <div className="text-center mb-8">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center
                                rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600
                                text-white shadow-lg">
                  <Building2 className="w-7 h-7" />
                </div>

                <h2 className="text-4xl font-black text-slate-900">
                  Register{" "}
                  <span className="text-indigo-600">Company</span>
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Create a profile for the hiring organization
                </p>
              </div>

              {/* Content (NO FORM) */}
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <input
                    {...register("name")}
                    placeholder="Company name"
                    className="w-full h-14 rounded-2xl bg-slate-50 px-5
                               outline-none focus:bg-white
                               focus:ring-4 focus:ring-indigo-500/10"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs font-semibold text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Logo */}
                <label
                  className={`flex cursor-pointer flex-col items-center justify-center gap-3
                              rounded-2xl border-2 border-dashed min-h-[160px]
                              transition ${
                                preview
                                  ? "border-indigo-500 bg-indigo-50/30"
                                  : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                              }`}
                >
                  {preview ? (
                    <img
                      src={preview}
                      className="w-20 h-20 rounded-xl object-contain bg-white p-2"
                    />
                  ) : (
                    <>
                      <UploadCloud className="w-7 h-7 text-indigo-500" />
                      <p className="text-sm font-bold text-slate-700">
                        Upload Logo
                      </p>
                      <p className="text-xs text-slate-400">
                        PNG or JPG
                      </p>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    {...register("logo")}
                    hidden
                  />
                </label>

                {error && (
                  <p className="text-sm text-red-500">{error.message}</p>
                )}

                {/* CTA */}
                <button
                  type="button"
                  disabled={loading}
                  onClick={handleCreate}
                  className="w-full h-16 rounded-2xl bg-slate-900
                             text-white font-bold text-lg
                             hover:bg-indigo-600 transition
                             shadow-[0_20px_40px_-12px_rgba(15,23,42,0.4)]"
                >
                  {loading ? (
                    <Loader2 className="mx-auto animate-spin" />
                  ) : (
                    "Create Company"
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AddCompanyDrawer;
