import useGetKpisForDashboard from "@/hooks/use-get-kpis-for-dashboard";
import KPIcard from "./kpi-card";
import KpiCardSkeleton from "./skeletons/kpi-card-skeleton";

const Kpis = () => {
  const { data: kpis, isLoading, error } = useGetKpisForDashboard();

  if (isLoading) {
    return (
      <section className="p-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 shrink-0">
        {Array.from({ length: 4 }).map((_, index) => (
          <KpiCardSkeleton key={index} />
        ))}
      </section>
    );
  }

  if (error) {
    return (
      <section className="p-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 shrink-0">
        {Array.from({ length: 4 }).map((_, index) => (
          <KpiCardSkeleton key={index} />
        ))}
      </section>
    );
  }

  return (
    <section className="p-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 shrink-0">
      {kpis?.map((stat) => (
        <KPIcard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          subtitle={stat.subtitle}
        />
      ))}
    </section>
  );
};

export default Kpis;
