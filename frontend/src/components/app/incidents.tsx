import Toolbar from "./toolbar";
import IncidentsTable from "./incidents-table";
import type { Incident } from "@/types/incidents.types";

const Incidents = ({
  onSelectIncident,
}: {
  onSelectIncident: (incident: Incident) => void;
}) => {
  return (
    <main className="px-5 pb-5 flex flex-col items-center gap-5 w-full flex-1 min-h-0">
      <Toolbar />
      <IncidentsTable onSelectIncident={onSelectIncident} />
    </main>
  );
};

export default Incidents;
