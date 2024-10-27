"use client";
import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "../ui/dropdown-menu";

const JoinUs = () => {
  // Input state variables
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    institution: "",
    portfolio: "",
    about: "",
    role: "",
    status: "",
  });

  // Load saved form data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Handle input change and save to localStorage
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    localStorage.setItem("formData", JSON.stringify(updatedData));
  };

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
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          institution: "",
          portfolio: "",
          about: "",
          role: "",
          status: "",
        });
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
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          className="mb-2 w-full rounded-full py-2 px-4 bg-slate-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>

      <div className="flex gap-1">
        <input
          type="email"
          className="mb-2 w-full rounded-full py-2 px-4 bg-slate-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="example@example.com"
          autoComplete="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="tel"
          className="mb-2 w-full rounded-full py-2 px-4 bg-slate-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div className="flex gap-1">
        {/* Dropdown for Role */}
        <div className="w-1/2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="mb-2 w-full rounded-full py-2 px-4 bg-slate-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
                {formData.role ? formData.role : "Select Role"}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {Role.map((role) => (
                <DropdownMenuItem
                  key={role.id}
                  onSelect={() => {
                    const updatedData = { ...formData, role: role.name };
                    setFormData(updatedData);
                    localStorage.setItem(
                      "formData",
                      JSON.stringify(updatedData)
                    );
                  }}
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
                {formData.status ? formData.status : "Select Status"}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {WorkingStatus.map((status) => (
                <DropdownMenuItem
                  key={status.id}
                  onSelect={() => {
                    const updatedData = { ...formData, status: status.name };
                    setFormData(updatedData);
                    localStorage.setItem(
                      "formData",
                      JSON.stringify(updatedData)
                    );
                  }}
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
          name="institution"
          value={formData.institution}
          onChange={handleChange}
        />
      </div>

      <input
        type="url"
        className="mb-2 w-full rounded-full py-2 px-4 bg-slate-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Portfolio link"
        name="portfolio"
        value={formData.portfolio}
        onChange={handleChange}
      />
      <textarea
        className="mb-2 w-full rounded-full py-2 px-4 bg-slate-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-y-scroll"
        placeholder="Write something about yourself"
        rows={4}
        name="about"
        value={formData.about}
        onChange={handleChange}
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
