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
  return (
    <Card className="p-4">
      <span className="font-semibold text-lg">{title}</span>
      <div className="flex justify-between items-end">
        <h2 className="text-4xl font-bold">{value}</h2>
        <h1 className="text-[14px] font-medium">{subtitle}</h1>
      </div>
    </Card>
  );
};

export default KPIcard;
