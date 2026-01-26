import React from "react";

const PageSkeleton = () => {
  return (
    <div className="min-h-[70vh] px-6 py-10">
      {/* Header skeleton */}
      <div className="mb-8">
        <div className="h-8 w-1/3 rounded-lg bg-slate-200 shimmer mb-3" />
        <div className="h-4 w-1/2 rounded bg-slate-200 shimmer" />
      </div>

      {/* Card skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-10 w-10 rounded-lg bg-slate-200 shimmer" />
              <div className="flex-1">
                <div className="h-4 w-3/4 rounded bg-slate-200 shimmer mb-2" />
                <div className="h-3 w-1/2 rounded bg-slate-200 shimmer" />
              </div>
            </div>

            <div className="space-y-3">
              <div className="h-3 w-full rounded bg-slate-200 shimmer" />
              <div className="h-3 w-5/6 rounded bg-slate-200 shimmer" />
              <div className="h-3 w-4/6 rounded bg-slate-200 shimmer" />
            </div>

            <div className="mt-5 flex justify-between">
              <div className="h-8 w-20 rounded-lg bg-slate-200 shimmer" />
              <div className="h-8 w-24 rounded-lg bg-slate-200 shimmer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageSkeleton;
