export default function AppLoading() {
  return (
    <div className="space-y-6">
      <div className="glass rounded-3xl p-6">
        <div className="skeleton h-4 w-32 rounded-full" />
        <div className="mt-4 space-y-3">
          <div className="skeleton h-10 w-3/5 rounded-2xl" />
          <div className="skeleton h-4 w-2/5 rounded-full" />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="glass rounded-3xl p-5">
            <div className="skeleton h-3 w-24 rounded-full" />
            <div className="mt-4 skeleton h-8 w-2/3 rounded-2xl" />
            <div className="mt-3 skeleton h-3 w-1/2 rounded-full" />
          </div>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="glass rounded-3xl p-6">
            <div className="skeleton h-3 w-28 rounded-full" />
            <div className="mt-6 space-y-3">
              {Array.from({ length: 3 }).map((__, itemIndex) => (
                <div
                  key={itemIndex}
                  className="skeleton h-12 w-full rounded-2xl"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
