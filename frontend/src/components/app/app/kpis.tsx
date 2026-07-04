import KPIcard from "./kpiCard";

const Kpis = () => {
  const stats = [
    {
      title: "TOTAL INCIDENTS",
      value: 120,
      subtitle: "Currently tracked",
    },
    {
      title: "OPEN INCIDENTS",
      value: 120,
      subtitle: "Needs attention",
    },
    {
      title: "CRITICAL INCIDENTS",
      value: 120,
      subtitle: "Immediate action required",
    },
    {
      title: "RESOLVED INCIDENTS",
      value: 120,
      subtitle: "Resolved in last 24 hours",
    },
  ];
  return (
    <section className="p-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((stat) => (
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
