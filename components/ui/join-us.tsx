"use client";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  institution: string;
  portfolio: string;
  about: string;
  role: string;
  status: string;
}

const JoinUs = () => {
  const { register, handleSubmit, setValue, reset, watch } = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      institution: "",
      portfolio: "",
      about: "",
      role: "",
      status: "",
    },
  });

  const router = useRouter();
  const [role, setRole] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  // Load saved form data on component mount
  useEffect(() => {
    const savedData = sessionStorage.getItem("formData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      reset(parsedData);
      setRole(parsedData.role);
      setStatus(parsedData.status);
    }
  }, [reset]);

  // Watch form values and save to localStorage on change
  useEffect(() => {
    const subscription = watch((value) => {
      setRole(value.role!);
      setStatus(value.status!);
      localStorage.setItem("formData", JSON.stringify(value));
      // console.log(localStorage.getItem("formData"));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

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
  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        reset();
        localStorage.removeItem("formData");
        alert("Form submitted successfully!");
      } else {
        alert("Failed to submit form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting the form.");
    }
    router.push("/");
  };

  return (
    <form className="flex flex-col gap-1" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-1">
        <input
          type="text"
          className="mb-2 w-full rounded-full py-2 px-4 bg-slate-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="First Name"
          {...register("firstName")}
        />
        <input
          type="text"
          className="mb-2 w-full rounded-full py-2 px-4 bg-slate-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Last Name"
          {...register("lastName")}
        />
      </div>

      <div className="flex gap-1">
        <input
          type="email"
          className="mb-2 w-full rounded-full py-2 px-4 bg-slate-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="example@example.com"
          autoComplete="email"
          {...register("email")}
        />
        <input
          type="tel"
          className="mb-2 w-full rounded-full py-2 px-4 bg-slate-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Phone Number"
          {...register("phone")}
        />
      </div>

      <div className="flex gap-1">
        {/* Dropdown for Role */}
        <div className="w-1/2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="mb-2 w-full rounded-full py-2 px-4 bg-slate-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
                {role ? role : "Select Role"}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {Role.map((role) => (
                <DropdownMenuItem
                  key={role.id}
                  onSelect={() => {
                    setValue("role", role.name);
                    setRole(role.name);
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
                {status ? status : "Select Status"}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {WorkingStatus.map((status) => (
                <DropdownMenuItem
                  key={status.id}
                  onSelect={() => {
                    setValue("status", status.name);
                    setStatus(status.name);
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
          {...register("institution")}
        />
      </div>

      <input
        type="url"
        className="mb-2 w-full rounded-full py-2 px-4 bg-slate-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Portfolio link"
        {...register("portfolio")}
      />
      <textarea
        className="mb-2 w-full rounded-full py-2 px-4 bg-slate-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-y-scroll"
        placeholder="Write something about yourself"
        rows={4}
        {...register("about")}
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
