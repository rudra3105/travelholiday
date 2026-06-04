export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero skeleton */}
      <div className="h-[60vh] bg-gray-200 animate-pulse" />

      {/* Content skeleton */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="h-4 bg-gray-200 rounded-full w-24 animate-pulse" />
          <div className="h-8 bg-gray-200 rounded-full w-3/4 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-4 bg-gray-200 rounded-full w-5/6 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded-full w-4/6 animate-pulse" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden border border-gray-100">
              <div className="aspect-[16/10] bg-gray-200 animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-gray-200 rounded-full w-3/4 animate-pulse" />
                <div className="h-3 bg-gray-200 rounded-full animate-pulse" />
                <div className="h-3 bg-gray-200 rounded-full w-5/6 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
