import useGetKpisForDashboard from "@/hooks/use-get-kpis-for-dashboard";
import KPIcard from "./kpi-card";
import KpiCardSkeleton from "./skeletons/kpi-card-skeleton";

const SECTION_CLASS =
  "p-3 sm:p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 shrink-0";

const Kpis = () => {
  const { data: kpis, isLoading, error } = useGetKpisForDashboard();

  if (isLoading) {
    return (
      <section className={SECTION_CLASS}>
        {Array.from({ length: 4 }).map((_, index) => (
          <KpiCardSkeleton key={index} />
        ))}
      </section>
    );
  }

  if (error) {
    return (
      <section className={SECTION_CLASS}>
        {Array.from({ length: 4 }).map((_, index) => (
          <KpiCardSkeleton key={index} />
        ))}
      </section>
    );
  }

  return (
    <section className={SECTION_CLASS}>
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
