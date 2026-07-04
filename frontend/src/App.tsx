import { useState } from "react";
import Incidents from "./components/app/incidents";
import Kpis from "./components/app/kpis";
import Navbar from "./components/app/navbar";
import ViewIncident from "./components/app/view-incident";
import type { Incident } from "./types/incidents.types";

const App = () => {
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(
    null,
  );

  return (
    <>
      <div className="main-page flex flex-col h-screen overflow-hidden">
        <Navbar />
        <Kpis />
        <Incidents onSelectIncident={setSelectedIncident} />
      </div>
      {selectedIncident && (
        <ViewIncident
          incident={selectedIncident}
          open={!!selectedIncident}
          onClose={() => setSelectedIncident(null)}
        />
      )}
    </>
  );
};

export default App;
