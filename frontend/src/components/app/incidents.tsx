import Toolbar from "./toolbar";
import IncidentsTable from "./incidents-table";

const Incidents = () => {
  return (
    <main className="px-5 pb-5 flex flex-col items-center gap-5 w-full flex-1 min-h-0">
      <Toolbar />
      <IncidentsTable />
    </main>
  );
};

export default Incidents;
