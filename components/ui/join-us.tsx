import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.number().min(10, "Phone number is required"),
  institution: z.string().optional(),
  portfolio: z.string().url("Invalid URL").optional(),
  about: z.string().optional(),
  role: z.string().min(1, "Role is required"),
  status: z.string().min(1, "Status is required"),
});

type FormData = z.infer<typeof formSchema>;

const JoinUs = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: 0,
      institution: "",
      portfolio: "",
      about: "",
      role: "",
      status: "",
    },
  });
  const router = useRouter();
  const role = watch("role");
  const status = watch("status");

  React.useEffect(() => {
    const savedData = sessionStorage.getItem("formData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      reset(parsedData);
    }
  }, [reset]);

  React.useEffect(() => {
    const subscription = watch((value) => {
      sessionStorage.setItem("formData", JSON.stringify(value));
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
    { id: 1, name: "Student" },
    { id: 2, name: "Working" },
    { id: 3, name: "Not working" },
  ];

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      // const response = await fetch("/api/submit", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(data),
      // });

      const result = { success: true }; // await response.json();
      if (result.success) {
        sessionStorage.removeItem("formData");
        reset();
        alert("Form submitted successfully!");
        router.refresh();
      } else {
        alert("Failed to submit form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting the form. " + error);
    }
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
        {errors.firstName && <span>{errors.firstName.message}</span>}
        <input
          type="text"
          className="mb-2 w-full rounded-full py-2 px-4 bg-slate-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Last Name"
          {...register("lastName")}
        />
        {errors.lastName && <span>{errors.lastName.message}</span>}
      </div>

      <div className="flex gap-1">
        <input
          type="email"
          className="mb-2 w-full rounded-full py-2 px-4 bg-slate-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="example@example.com"
          autoComplete="email"
          {...register("email")}
        />
        {errors.email && <span>{errors.email.message}</span>}
        <input
          type="number"
          className="mb-2 w-full rounded-full py-2 px-4 bg-slate-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Phone Number"
          {...register("phone", { valueAsNumber: true })}
        />
        {errors.phone && <span>{errors.phone.message}</span>}
      </div>

      <div className="flex gap-1">
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
                  onSelect={() => setValue("role", role.name)}
                >
                  {role.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {errors.role && <span>{errors.role.message}</span>}
        </div>

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
                  onSelect={() => setValue("status", status.name)}
                >
                  {status.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {errors.status && <span>{errors.status.message}</span>}
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
      {errors.portfolio && <span>{errors.portfolio.message}</span>}
      <textarea
        className="mb-2 w-full rounded-3xl py-2 px-4 bg-slate-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-y-scroll"
        placeholder="Write something about yourself"
        rows={4}
        {...register("about")}
      />
      <div className="flex justify-center">
        <button
          type="submit"
          className=" gap-40 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
        >
          Submit
        </button>
        <button
          type="button"
          className="mx-4 px-4 py-2 gap-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
          onClick={() => {
            sessionStorage.removeItem("formData");
            reset();
          }}
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default JoinUs;
