import { Card } from "@/components/ui/card";

const KPIcard = ({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: number;
  subtitle: string;
}) => {
  const getColour = () => {
    switch (title) {
      case "ACTIVE INCIDENTS":
        return "text-white";
      case "CRITICAL INCIDENTS":
        return "text-red-500";
      case "RESOLVED INCIDENTS":
        return "text-green-500";
      default:
        return "text-white";
    }
  };

  return (
    <Card className="p-3 sm:p-4">
      <span className="font-semibold text-sm sm:text-base lg:text-lg">
        {title}
      </span>
      <div className="flex justify-between items-end">
        <h2
          className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${getColour()} `}
        >
          {value}
        </h2>
        <h1 className="text-[11px] sm:text-xs lg:text-[14px] font-medium">
          {subtitle}
        </h1>
      </div>
    </Card>
  );
};

export default KPIcard;
