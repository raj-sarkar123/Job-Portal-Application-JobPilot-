import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../components/ui/carousel";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../components/ui/accordion";
import { Briefcase, UserPlus, Search, TrendingUp, Globe, Play, Sparkles, Zap, ShieldCheck } from "lucide-react";
import AutoPlay from "embla-carousel-autoplay";

import companies from "../data/companies.json";
import faqs from "../data/faq.json";
import { useUser } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { ArrowRight} from "lucide-react";


const LandingPage = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null;

  const userRole = user?.unsafeMetadata?.role;
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};
  return (
    <main className="w-full flex flex-col gap-20 overflow-x-hidden">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden bg-[url('/grid.svg')] bg-center">
        {/* Background Blobs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center px-8 sm:px-16 min-h-[90vh] gap-12 relative">
          
          {/* LEFT CONTENT */}
          <div className="flex flex-col justify-center z-10 py-12 lg:py-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 mb-6 w-fit">
              <Sparkles size={14} className="text-[#14a7b8]" />
              <span className="text-xs font-bold text-[#14a7b8] uppercase tracking-wider">The Future of Hiring is here</span>
            </div>

            <h1 className="font-extrabold tracking-tight text-5xl sm:text-7xl lg:text-7xl leading-[1.1] text-gray-900">
              Build your <span className="relative inline-block">
                dream career
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 358 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 5.26C72.3333 2.26 215 -1.24 357 6.76" stroke="#14a7b8" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            <p className="mt-8 text-gray-500 text-lg sm:text-xl max-w-lg leading-relaxed">
              Discover opportunities from world-class companies. 
              Smart hiring meets modern talent in a workspace where diversity thrives.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
              <Link to="/jobs">
                <Button
                  size="xl"
                  className="bg-[#14a7b8] hover:bg-[#118a99] px-7 py-5 text-xl rounded-2xl shadow-2xl shadow-teal-200 cursor-pointer transition-transform hover:scale-105"
                >
                  Explore Jobs
                </Button>
              </Link>

              <Link to={userRole === "recruiter" ? "/post-job" : "/my-jobs"}>
                <Button
                  size="xl"
                  variant="outline"
                  className="px-7 py-5 text-xl rounded-2xl border-2 border-[#14a7b8] text-[#14a7b8] hover:bg-teal-50 cursor-pointer transition-all"
                >
                  {userRole === "recruiter" ? "Post a Job" : "Track Applications"}
                </Button>
              </Link>
            </div>
            
            {/* Quick Stats */}
            <div className="mt-12 flex items-center gap-8 border-t border-slate-100 pt-8">
               <div>
                  <p className="text-2xl font-bold text-slate-900">12k+</p>
                  <p className="text-sm text-slate-500">Active Jobs</p>
               </div>
               <div className="h-8 w-[1px] bg-slate-200" />
               <div>
                  <p className="text-2xl font-bold text-slate-900">500+</p>
                  <p className="text-sm text-slate-500">Companies</p>
               </div>
            </div>
          </div>

          {/* RIGHT IMAGE AREA */}
          <div className="relative group">
            <div className="relative z-10 w-full h-[500px] lg:h-[600px] bg-no-repeat bg-contain bg-right"
                 style={{ backgroundImage: "url('/background.png')" }}>
            </div>
            
            {/* Floating UI Elements (Unique Additions) */}
            <div className="absolute top-20 left-0 bg-white p-4 rounded-2xl shadow-2xl animate-bounce-slow z-20 hidden sm:flex items-center gap-3">
               <div className="bg-green-100 p-2 rounded-lg text-green-600"><ShieldCheck size={20}/></div>
               <div>
                  <p className="text-xs font-bold">Verified Employer</p>
                  <p className="text-[10px] text-slate-400">Google Inc.</p>
               </div>
            </div>

            <div className="absolute bottom-40 right-10 bg-white p-4 rounded-2xl shadow-2xl animate-pulse z-20 hidden sm:flex items-center gap-3">
               <div className="bg-orange-100 p-2 rounded-lg text-orange-600"><Zap size={20}/></div>
               <p className="text-xs font-bold">Fast Response Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= COMPANY CAROUSEL ================= */}
     <section className="w-full max-w-7xl mx-auto px-4 py-10">
  {/* Added a subtle label to give the section context */}
  <p className="text-center text-slate-400 text-sm font-semibold uppercase tracking-[0.2em] mb-10">
    Trusted by Industry Leaders
  </p>

  {/* Added a mask-image container to create a smooth fade effect on the sides */}
  <div className="relative w-full [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
    <Carousel
      plugins={[
        AutoPlay({
          delay: 2200,
        }),
      ]}
      className="w-full"
    >
      <CarouselContent className="flex items-center">
        {companies.map(({ id, name, path }) => (
          <CarouselItem
            key={id}
            className="basis-1/3 md:basis-1/4 lg:basis-1/6 flex justify-center px-4"
          >
            <div className="group relative flex items-center justify-center w-full h-16">
              <img
                src={path}
                alt={name}
                className="h-8 sm:h-10 w-auto object-contain transition-all duration-500 
                           "
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  </div>
</section>

      {/* ================= BANNER ================= */}
      <section className="w-full max-w-7xl mx-auto px-4">
        <div className="relative h-96 sm:h-[450px] rounded-[40px] overflow-hidden shadow-2xl group">
          <img
            src="/banner.png"
            alt="Career Banner"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute " />
          <div className="relative h-full flex items-end px-10 sm:px-20 pb-12 sm:pb-20">
            <div className="max-w-2xl text-white">
              {/* <h2 className="text-4xl sm:text-6xl font-bold mb-6 leading-tight">
                Connect with <br /> Global Leaders
              </h2> */}
              {/* <p className="text-white/80 text-lg sm:text-xl font-light">
                Trusted by Fortune 500 companies hiring top-tier talent worldwide.
              </p> */}
            </div>
          </div>
        </div>
      </section>

      {/* ================= ROLE CARDS ================= */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 w-full relative">
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial from-[#14a7b8]/5 to-transparent -z-10 blur-3xl" />

      {/* Card 1: Job Seekers */}
      <motion.div
        custom={0}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={cardVariants}
        className="group"
      >
        <Card className="relative overflow-hidden rounded-[32px] bg-white border border-slate-100 shadow-2xl shadow-slate-200/50 hover:shadow-[#14a7b8]/20 transition-all duration-500 p-6 h-full">
          {/* Subtle gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#14a7b8]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <CardHeader className="flex flex-row gap-6 items-center relative z-10">
            <div className="p-5 bg-[#14a7b8] text-white rounded-[24px] shadow-xl shadow-teal-200 group-hover:rotate-6 transition-transform duration-300">
              <Briefcase size={32} />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold text-slate-900">For Job Seekers</CardTitle>
              <div className="h-1 w-12 bg-[#14a7b8] mt-2 rounded-full transform origin-left group-hover:scale-x-150 transition-transform duration-500" />
            </div>
          </CardHeader>

          <CardContent className="mt-4 relative z-10">
            <p className="text-slate-500 text-lg leading-relaxed">
              Apply smarter, track applications in real-time, and get discovered by world-class recruiters.
            </p>
            <div className="mt-8 flex items-center gap-2 text-[#14a7b8] font-bold group-hover:gap-4 transition-all duration-300">
              <span>Find your next role</span>
              <ArrowRight size={20} />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Card 2: Employers */}
      <motion.div
        custom={1}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={cardVariants}
        className="group"
      >
        <Card className="relative overflow-hidden rounded-[32px] bg-white border border-slate-100 shadow-2xl shadow-slate-200/50 hover:shadow-indigo-200/50 transition-all duration-500 p-6 h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <CardHeader className="flex flex-row gap-6 items-center relative z-10">
            <div className="p-5 bg-indigo-600 text-white rounded-[24px] shadow-xl shadow-indigo-100 group-hover:-rotate-6 transition-transform duration-300">
              <UserPlus size={32} />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold text-slate-900">For Employers</CardTitle>
              <div className="h-1 w-12 bg-indigo-600 mt-2 rounded-full transform origin-left group-hover:scale-x-150 transition-transform duration-500" />
            </div>
          </CardHeader>

          <CardContent className="mt-4 relative z-10">
            <p className="text-slate-500 text-lg leading-relaxed">
              Hire faster with curated candidates and a streamlined, automated recruitment flow.
            </p>
            <div className="mt-8 flex items-center gap-2 text-indigo-600 font-bold group-hover:gap-4 transition-all duration-300">
              <span>Post a position</span>
              <ArrowRight size={20} />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>


      {/* ================= HOW IT WORKS ================= */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="bg-slate-50 rounded-[50px] py-24 px-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">How It Works</h2>
            <p className="text-gray-400 text-lg">Your journey to a new career in three simple steps.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-16 text-center">
            {[Search, TrendingUp, Globe].map((Icon, i) => (
              <div key={i} className="flex flex-col items-center gap-6 group">
                <div className="p-8 bg-white rounded-3xl shadow-sm transition-all group-hover:shadow-xl group-hover:-translate-y-1">
                  <Icon className="size-12 text-[#14a7b8]" />
                </div>
                <h3 className="text-2xl font-bold">
                  {i === 0 ? "Search Jobs" : i === 1 ? "Apply & Track" : "Get Hired"}
                </h3>
                <p className="text-gray-500 text-lg max-w-xs leading-relaxed">
                  {i === 0
                    ? "Find roles matching your specific skills and values."
                    : i === 1
                    ? "Manage all your applications from a single dashboard."
                    : "Finalize your offer and start your next big chapter."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="max-w-4xl mx-auto px-4 py-20 w-full relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-teal-50/50 to-transparent -z-10 rounded-[60px]" />
        
        <div className="text-center mb-16">
          <p className="text-sm font-bold text-[#14a7b8] uppercase tracking-[0.2em] mb-4">
            Assistance
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-lg">
            Everything you need to know about navigating your HireNest journey.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-slate-100 rounded-[24px] px-8 bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <AccordionTrigger className="text-left text-lg sm:text-xl font-semibold py-6 hover:no-underline hover:text-[#14a7b8]">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-500 text-lg leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

    </main>
  );
};

export default LandingPage;
