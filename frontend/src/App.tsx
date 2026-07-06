import Incidents from "./components/app/incidents";
import Kpis from "./components/app/kpis";
import Navbar from "./components/app/navbar";

const App = () => {
  return (
    <div className="main-page flex flex-col min-h-screen lg:h-screen lg:overflow-hidden">
      <Navbar />
      <Kpis />
      <Incidents />
    </div>
  );
};

export default App;
