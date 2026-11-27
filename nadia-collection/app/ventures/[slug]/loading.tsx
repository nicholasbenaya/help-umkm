export default function VentureDetailLoading() {
  return (
    <main role="status" aria-live="polite" className="bg-bg-canvas">
      <span className="sr-only">Memuat showcase...</span>

      {/* Top Trail 2-Column Hero Skeleton */}
      <section aria-hidden="true" className="py-6 sm:py-10 lg:py-12">
        <div className="editorial-container">
          <div className="h-5 w-48 bg-bg-surface motion-safe:animate-pulse" />

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,560px)_1fr] lg:items-start lg:gap-16">
            <div className="order-2 flex flex-col gap-5 lg:order-1">
              <div className="hidden h-8 w-44 bg-bg-surface motion-safe:animate-pulse lg:block" />
              <div className="h-4 w-56 bg-bg-surface-strong motion-safe:animate-pulse" />
              <div className="h-12 w-3/4 bg-bg-surface motion-safe:animate-pulse" />
              <div className="space-y-2.5">
                <div className="h-4 w-full bg-bg-surface motion-safe:animate-pulse" />
                <div className="h-4 w-5/6 bg-bg-surface motion-safe:animate-pulse" />
              </div>
              <div className="h-[44px] w-full bg-bg-surface-strong motion-safe:animate-pulse sm:w-56" />
              <div className="mt-2 space-y-3 border-t border-border-hairline pt-4">
                <div className="h-10 w-full bg-bg-surface motion-safe:animate-pulse" />
                <div className="h-10 w-full bg-bg-surface motion-safe:animate-pulse" />
                <div className="h-10 w-full bg-bg-surface motion-safe:animate-pulse" />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="aspect-[4/4.5] w-full bg-bg-surface-strong motion-safe:animate-pulse lg:aspect-[4/4.45]" />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid Skeleton */}
      <section aria-hidden="true" className="bg-bg-surface py-12 sm:py-16 lg:py-20">
        <div className="editorial-container">
          <div className="mb-6 h-9 w-44 bg-bg-surface-strong motion-safe:animate-pulse" />
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-2.5">
                <div className="aspect-[4/4.65] w-full bg-bg-surface-strong motion-safe:animate-pulse" />
                <div className="h-4 w-3/4 bg-bg-surface-strong motion-safe:animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
