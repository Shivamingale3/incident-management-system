import { CreateNewIncident } from "./create-new-incident";

const Navbar = () => {
  return (
    <header className="flex justify-between border-b rounded-none px-3 py-3 sm:p-5 items-center gap-3 sm:gap-5 shrink-0">
      <p className="text-xl sm:text-2xl md:text-3xl font-bold">IncidentHub</p>
      <CreateNewIncident />
    </header>
  );
};

export default Navbar;
