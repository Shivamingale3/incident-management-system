import { Plus, Search } from "lucide-react";
import { Card } from "../ui/card";
import { Typography } from "../ui/typography";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <Card className="flex flex-row justify-between border-b rounded-none px-5 items-center">
      <Typography variant="heading">IncidentHub</Typography>
      <InputGroup className="w-full py-5">
        <InputGroupInput placeholder="Search incidents by ID or title..." />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>
      <Button className="flex items-center py-5">
        <Plus />
        New Incident
      </Button>
    </Card>
  );
};

export default Navbar;
