import Incidents from "./components/app/app/incidents";
import Kpis from "./components/app/app/kpis";
import Navbar from "./components/app/app/navbar";

const App = () => {
  return (
    <div className="main-page">
      <Navbar />
      <Kpis />
      <Incidents />
    </div>
  );
};

export default App;
