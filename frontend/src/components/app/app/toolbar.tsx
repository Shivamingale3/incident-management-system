import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Select, SelectTrigger } from "@/components/ui/select";
import { Filter, RefreshCcw, X } from "lucide-react";

const Toolbar = () => {
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex justify-center items-center flex-col lg:flex-row lg:gap-5">
        <InputGroup className="w-full lg:w-[300px]">
          <InputGroupInput placeholder="Search incidents by ID or title..." />
          <InputGroupAddon>
            <Filter />
          </InputGroupAddon>
        </InputGroup>
        <div className="flex justify-center items-center gap-2">
          <Select>
            <SelectTrigger className={"w-max"}>Severity: All</SelectTrigger>
          </Select>
          <Select>
            <SelectTrigger className={"w-max"}>Status: All</SelectTrigger>
          </Select>
        </div>
      </div>
      <div className="flex justify-center items-center gap-2">
        <Select>
          <SelectTrigger className={"w-max"}>Auto-Refresh: 15s</SelectTrigger>
        </Select>
        <Button variant="outline">
          <X />
          Clear Filters
        </Button>
        <Button>
          <RefreshCcw />
        </Button>
      </div>
    </div>
  );
};

export default Toolbar;
