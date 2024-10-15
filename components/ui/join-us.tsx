import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

const JoinUs = () => {
  // Input state variables
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [institution, setInstitution] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [about, setAbout] = useState("");
  const [selectedRole, setSelectedRole] = useState("Select Role");
  const [selectedStatus, setSelectedStatus] = useState("Select Status");

  const Role = [
    { id: 1, name: "Developer" },
    { id: 2, name: "Designer" },
    { id: 3, name: "Content writer" },
    { id: 4, name: "Marketing" },
    { id: 5, name: "Researcher" },
  ];
  const WorkingStatus = [
    { id: 1, name: "Working" },
    { id: 2, name: "Student" },
    { id: 3, name: "Not working" },
  ];

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      firstName,
      lastName,
      email,
      phone,
      role: selectedRole,
      status: selectedStatus,
      institution,
      portfolio,
      about,
    };

    try {
      // Send form data to the backend API (assumed endpoint: /api/submit)
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        // Reset form fields if successful
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setInstitution("");
        setPortfolio("");
        setAbout("");
        setSelectedRole("Select Role");
        setSelectedStatus("Select Status");
        alert("Form submitted successfully!");
      } else {
        alert("Failed to submit form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting the form.");
    }
  };

  return (
    <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
      <div className="flex gap-1">
        <input
          type="text"
          className="mb-2 w-full rounded-full py-2 px-4 bg-slate-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          className="mb-2 w-full rounded-full py-2 px-4 bg-slate-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <div className="flex gap-1">
        <input
          type="email"
          className="mb-2 w-full rounded-full py-2 px-4 bg-slate-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="example@example.com"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          className="mb-2 w-full rounded-full py-2 px-4 bg-slate-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="flex gap-1">
        {/* Dropdown for Role */}
        <div className="w-1/2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="mb-2 w-full rounded-full py-2 px-4 bg-slate-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
                {selectedRole}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {Role.map((role) => (
                <DropdownMenuItem
                  key={role.id}
                  onSelect={() => setSelectedRole(role.name)}
                >
                  {role.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Dropdown for Status */}
        <div className="w-1/2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="mb-2 w-full rounded-full py-2 px-4 bg-slate-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
                {selectedStatus}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {WorkingStatus.map((status) => (
                <DropdownMenuItem
                  key={status.id}
                  onSelect={() => setSelectedStatus(status.name)}
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
          className="mb-2 w-full rounded-full py-2 px-4 bg-slate-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Name of institution (University/Company)"
          value={institution}
          onChange={(e) => setInstitution(e.target.value)}
        />
      </div>

      <input
        type="url"
        className="mb-2 w-full rounded-full py-2 px-4 bg-slate-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Portfolio link"
        value={portfolio}
        onChange={(e) => setPortfolio(e.target.value)}
      />
      <textarea
        className="mb-2 w-full rounded-full py-2 px-4 bg-slate-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-y-scroll"
        placeholder="Write something about yourself"
        rows={4}
        value={about}
        onChange={(e) => setAbout(e.target.value)}
      />
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
