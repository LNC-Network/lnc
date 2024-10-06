import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
const JoinUs = () => {
  const inputField = () => {
    return "mb-4 w-full rounded-full py-2 px-4 bg-slate-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500";
  };

  const [selectedRole, setSelectedRole] = useState("Select Role");
  const [selectedStatus, setSelectedStatus] = useState("Select Status");

  const Role = [
    { id: 1, name: "Developer" },
    { id: 2, name: "Designer" },
    { id: 3, name: "Content writer" },
  ];
  const WorkingStatus = [
    { id: 1, name: "Working" },
    { id: 2, name: "Student" },
    { id: 3, name: "Not working" },
  ];

  return (
    <form className="flex flex-col gap-1">
      <div className="flex gap-1">
        <input
          type="text"
          className={`${inputField()}`}
          placeholder="First Name"
        />
        <input
          type="text"
          className={`${inputField()}`}
          placeholder="Last Name"
        />
      </div>

      <div className="flex gap-1">
        <input
          type="email"
          className={`${inputField()}`}
          placeholder="example@example.com"
          autoComplete="email"
        />
        <input
          type="tel"
          className={`${inputField()}`}
          placeholder="Phone Number"
        />
      </div>

      <div className="flex gap-1">
        {/* Dropdown for Role */}
        <div className="w-1/2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className={inputField()}>{selectedRole}</button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {Role.map((role) => (
                <DropdownMenuItem
                  key={role.id}
                  onSelect={() => setSelectedRole(role.name)} // Update selected role
                >
                  {role.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="w-1/2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className={inputField()}>{selectedStatus}</button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {WorkingStatus.map((status) => (
                <DropdownMenuItem
                  key={status.id}
                  onSelect={() => setSelectedStatus(status.name)} // Update selected status
                >
                  {status.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div>
        <input
          type="text"
          className={inputField()}
          placeholder="Name of institution (University/Company)"
        />
      </div>

      <input type="url" className={inputField()} placeholder="Portfolio link" />

      <div className="flex justify-center">
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default JoinUs;
