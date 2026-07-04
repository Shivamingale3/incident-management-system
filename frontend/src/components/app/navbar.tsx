import CreateNewIncident from "./create-new-incident";

const Navbar = () => {
  return (
    <header className="flex justify-between border-b rounded-none p-5 items-center gap-5 shrink-0">
      <p className="text-3xl font-bold">IncidentHub</p>
      <CreateNewIncident />
    </header>
  );
};

export default Navbar;
