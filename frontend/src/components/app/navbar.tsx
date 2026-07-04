import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Navbar = () => {
  return (
    <header className="flex justify-between border-b rounded-none p-5 items-center gap-5 shrink-0">
      <p className="text-3xl font-bold">IncidentHub</p>
      <Button className="flex items-center py-5">
        <Plus />
        New Incident
      </Button>
    </header>
  );
};

export default Navbar;
