import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

const JoinUs = () => {
  const inputField = () =>
    "mb-2 w-full rounded-full py-2 px-4 bg-slate-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "Select Role",
    status: "Select Status",
    institution: "",
    portfolio: "",
    about: "",
  });

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Network Problem!");
      const result = await response.json();
      console.log("Data saved:", result);
      closeModal();
    } catch (error) {
      console.error("Failed to save data:", error);
      alert("Failed to save data. Please try again.");
    }
  };

  return (
    <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
      <div className="flex gap-1">
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className={inputField()}
          placeholder="First Name"
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className={inputField()}
          placeholder="Last Name"
        />
      </div>

      <div className="flex gap-1">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={inputField()}
          placeholder="example@example.com"
          autoComplete="email"
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={inputField()}
          placeholder="Phone Number"
        />
      </div>

      <div className="flex gap-1">
        <div className="w-1/2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button type="button" className={inputField()}>
                {formData.role}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {Role.map((role) => (
                <DropdownMenuItem
                  key={role.id}
                  onClick={() => setFormData({ ...formData, role: role.name })}
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
              <button type="button" className={inputField()}>
                {formData.status}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {WorkingStatus.map((status) => (
                <DropdownMenuItem
                  key={status.id}
                  onClick={() =>
                    setFormData({ ...formData, status: status.name })
                  }
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
          name="institution"
          value={formData.institution}
          onChange={handleChange}
          className={inputField()}
          placeholder="Name of institution (University/Company)"
        />
      </div>

      <input
        type="url"
        name="portfolio"
        value={formData.portfolio}
        onChange={handleChange}
        className={inputField()}
        placeholder="Portfolio link"
      />
      <textarea
        name="about"
        value={formData.about}
        onChange={handleChange}
        className="resize-none overflow-y-scroll mb-2 w-full rounded-lg py-2 px-4 bg-slate-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Write something about yourself"
        rows={4}
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
