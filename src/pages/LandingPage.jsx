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
import { Briefcase, UserPlus, Search, TrendingUp, Globe, Play } from "lucide-react";
import AutoPlay from "embla-carousel-autoplay";

import companies from "../data/companies.json";
import faqs from "../data/faq.json";
import { useUser } from "@clerk/clerk-react";


const LandingPage = () => {
 const { user, isLoaded } = useUser();

  if (!isLoaded) return null;

  const userRole = user?.publicMetadata?.role; // "recruiter" | "candidate"
  const isRecruiter = userRole === "recruiter";
  return (
    <main className="w-full flex flex-col gap-20">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center px-8 sm:px-16 min-h-[85vh] gap-12">
          
          {/* LEFT CONTENT */}
          <div className="flex flex-col justify-center z-10 py-12 lg:py-0">
            <div className="flex items-center gap-2 mb-6">
             
             
            </div>

            <h1 className="font-extrabold tracking-tight text-5xl sm:text-7xl lg:text-7xl leading-[1.1] text-gray-900">
              Build your <span className="text-[#14a7b8]">dream career</span>
             
             
            </h1>

            <p className="mt-8 text-gray-500 text-lg sm:text-xl max-w-lg leading-relaxed">
              Discover opportunities from world-class companies. 
              Smart hiring meets modern talent in a workspace where diversity thrives.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <Link to="/jobs">
                <Button
                  size="xl"
                  className="bg-[#14a7b8] hover:bg-[#118a99] px-7 py-5 text-xl rounded-2xl shadow-2xl shadow-teal-100 cursor-pointer transition-transform hover:scale-105"
                >
                  Explore Jobs
                </Button>
              </Link>

             <Link to={userRole === "recruiter" ? "/post-job" : "/applications"}>
  <Button
    size="xl"
    variant="outline"
    className="px-7 py-5 text-xl rounded-2xl border-2 border-[#14a7b8] text-[#14a7b8] hover:bg-teal-50 cursor-pointer transition-all"
  >
    {userRole === "recruiter" ? "Post a Job" : "Track Applications"}
  </Button>
</Link>

            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div 
            className="relative h-[500px] lg:h-full w-full bg-no-repeat bg-contain transition-all duration-700"
            style={{ 
              backgroundImage: "url('/background.png')",
              backgroundPosition: "center right",
            }}
          >
            {/* Subtle glow behind the image subject */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-100/50 blur-[120px] -z-10" />
          </div>
        </div>
      </section>

      {/* ================= COMPANY CAROUSEL ================= */}
      <section className="w-full max-w-7xl mx-auto px-4">
        <Carousel plugins={[AutoPlay({ delay: 2200 })]}>
          <CarouselContent className="flex items-center gap-12">
            {companies.map(({ id, name, path }) => (
              <CarouselItem key={id} className="basis-1/3 sm:basis-1/6 flex justify-center">
                <img
                  src={path}
                  alt={name}
                  className="h-10 sm:h-12  transition-opacity "
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
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
              <p className="text-white/80 text-lg sm:text-xl font-light">
                Trusted by Fortune 500 companies hiring top-tier talent worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ROLE CARDS ================= */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
        <Card className="rounded-[32px] bg-gradient-to-br from-[#e8fbfd] to-white shadow-xl hover:-translate-y-2 transition-all duration-300 border-none p-4">
          <CardHeader className="flex flex-row gap-5 items-center">
            <div className="p-5 bg-[#14a7b8] text-white rounded-2xl shadow-lg shadow-teal-100">
              <Briefcase size={32} />
            </div>
            <CardTitle className="text-3xl font-bold">For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-500 text-lg leading-relaxed">
            Apply smarter, track applications in real-time, and get discovered by world-class recruiters.
          </CardContent>
        </Card>

        <Card className="rounded-[32px] bg-gradient-to-br from-[#eef2ff] to-white shadow-xl hover:-translate-y-2 transition-all duration-300 border-none p-4">
          <CardHeader className="flex flex-row gap-5 items-center">
            <div className="p-5 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-100">
              <UserPlus size={32} />
            </div>
            <CardTitle className="text-3xl font-bold">For Employers</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-500 text-lg leading-relaxed">
            Hire faster with curated candidates and a streamlined, automated recruitment flow.
          </CardContent>
        </Card>
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