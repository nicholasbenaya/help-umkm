export default function HomeLoading() {
  return (
    <main
      role="status"
      aria-live="polite"
      className="bg-bg-canvas"
    >
      <span className="sr-only">Memuat showcase...</span>

      {/* Hero Split Skeleton */}
      <section aria-hidden="true" className="grid grid-cols-1 lg:min-h-[620px] lg:grid-cols-2">
        <div className="flex flex-col justify-center gap-5 px-5 pt-10 pb-8 sm:px-8 sm:py-12 lg:py-16 lg:pr-12 lg:pl-[max(48px,calc((100vw-1320px)/2+48px))]">
          <div className="h-3.5 w-48 bg-bg-surface-strong motion-safe:animate-pulse" />
          <div className="space-y-3">
            <div className="h-12 w-full max-w-[460px] bg-bg-surface motion-safe:animate-pulse" />
            <div className="h-12 w-4/5 max-w-[380px] bg-bg-surface motion-safe:animate-pulse" />
          </div>
          <div className="h-5 w-full max-w-[440px] bg-bg-surface motion-safe:animate-pulse" />
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <div className="h-[44px] w-full bg-bg-surface-strong motion-safe:animate-pulse sm:w-52" />
            <div className="h-[44px] w-full bg-bg-surface motion-safe:animate-pulse sm:w-44" />
          </div>
        </div>

        <div className="px-5 pb-10 sm:px-8 sm:pb-14 lg:bg-bg-surface lg:p-12 xl:p-[60px]">
          <div className="mx-auto aspect-[4/4] w-full max-w-[540px] bg-bg-surface-strong motion-safe:animate-pulse lg:aspect-auto lg:h-full lg:min-h-[480px]" />
        </div>
      </section>

      {/* Ventures Directory Skeleton */}
      <section aria-hidden="true" className="py-12 sm:py-20">
        <div className="editorial-container mb-6">
          <div className="h-9 w-56 bg-bg-surface motion-safe:animate-pulse" />
        </div>
        <div className="grid grid-cols-1 gap-4 px-5 sm:grid-cols-2 sm:gap-[2px] sm:px-0">
          <div className="min-h-[390px] bg-bg-surface motion-safe:animate-pulse sm:min-h-[500px] lg:min-h-[600px]" />
          <div className="min-h-[390px] bg-bg-surface-strong motion-safe:animate-pulse sm:min-h-[500px] lg:min-h-[600px]" />
        </div>
      </section>
    </main>
  );
}
