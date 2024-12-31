import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./dropdown-menu";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormData, formSchema } from "@/types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

function Form() {
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
      name: "",
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
  const role = watch("role");
  const status = watch("status");

  useEffect(() => {
    const savedData = sessionStorage.getItem("formData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      reset(parsedData);
    }
  }, [reset]);

  useEffect(() => {
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

  // submit handeller___________________________________
  const [submitStatus, setSubmitStatus] = useState<
    "default" | "clicked" | "done" | "failed"
  >("default");
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        sessionStorage.removeItem("formData");
        reset();
        setSubmitStatus("done");
        router.refresh();
      } else {
        console.error("Server faliure", response);
        setSubmitStatus("failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("failed");
    }
  };

  const buttonCSS = () => {
    return "mb-2 w-full rounded-full py-2 px-4 bg-slate-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500";
  };

  return (
    <form
      className="flex flex-col gap-1 font-sans"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col">
        <input
          type="text"
          className={buttonCSS()}
          placeholder="Your name"
          {...register("name")}
        />
        {errors.name && <span>{errors.name.message}</span>}
      </div>
      <div className="flex flex-col">
        <input
          type="email"
          className={buttonCSS()}
          placeholder="example@example.com"
          autoComplete="email"
          {...register("email")}
        />
        {errors.email && <span>{errors.email.message}</span>}
        <input
          type="tel"
          className={buttonCSS()}
          placeholder="Phone Number"
          {...register("phone")}
        />
        {errors.phone && <span>{errors.phone.message}</span>}
      </div>

      <div className="flex gap-1">
        <div className="w-1/2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className={buttonCSS()}>
                {role ? role : "Select Role"}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {Role.map((role) => (
                <DropdownMenuItem
                  key={role.id}
                  onSelect={() => setValue("role", role.name)}
                  className="font-sans"
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
              <button className={buttonCSS()}>
                {status ? status : "Select Status"}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {WorkingStatus.map((status) => (
                <DropdownMenuItem
                  key={status.id}
                  onSelect={() => setValue("status", status.name)}
                  className="font-sans"
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
          className={buttonCSS()}
          placeholder="name of institution (University/Company)"
          {...register("institution")}
        />
      </div>
      <div className="flex flex-col">
        <input
          type="url"
          className={buttonCSS()}
          placeholder="Portfolio link"
          {...register("portfolio")}
        />
        {errors.portfolio && <span>{errors.portfolio.message}</span>}
      </div>

      <textarea
        className="mb-2 w-full rounded-xl py-2 px-4 bg-slate-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        placeholder="Write something about yourself"
        rows={3}
        {...register("about")}
      />
      <div className="flex justify-center space-x-10">
        {submitStatus === "default" && (
          <button
            type="submit"
            className="py-2 bg-indigo-600 text-white rounded-sm hover:bg-indigo-500 w-20"
          >
            Submit
          </button>
        )}
        {submitStatus === "clicked" && (
          <button
            type="button"
            className="py-2 bg-gray-600 text-white rounded-sm w-20"
            disabled
          >
            Submitting
          </button>
        )}
        {submitStatus === "done" && (
          <button
            type="button"
            className="py-2 bg-green-600 text-white rounded-sm w-20"
            disabled
          >
            Done
          </button>
        )}
        {submitStatus === "failed" && <p>Failed to submit </p>}

        <button
          type="button"
          className="py-2 bg-slate-600 text-white rounded-sm hover:bg-slate-500 w-20"
          onClick={() => {
            sessionStorage.removeItem("formData");
            reset({
              name: "",
              email: "",
              phone: "",
              institution: "",
              portfolio: "",
              about: "",
              role: "",
              status: "",
            });
          }}
        >
          Clear
        </button>
      </div>
    </form>
  );
}

export default Form;
