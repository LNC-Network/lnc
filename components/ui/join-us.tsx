import React from "react";
import Select, {
  StylesConfig,
  OptionProps,
  CSSObjectWithLabel,
} from "react-select";
const JoinUs = () => {
  const inputField = () => {
    return "mb-1 w-full rounded-full py-2 px-3 bg-grey-900 text-white focus:bg-slate-700 focus:outline-none";
  };

  const customStyles: StylesConfig = {
    control: (provided: CSSObjectWithLabel): CSSObjectWithLabel => ({
      ...provided,
      marginBottom: "0.25rem", // mb-1
      width: "100%", // w-full
      borderRadius: "9999px", // rounded-full
      padding: "0.5rem 0.75rem", // py-2 px-3
      backgroundColor: "#1e1e2f", // bg-grey-900
      color: "white",
      "&:focus": {
        backgroundColor: "#374151", // focus:bg-slate-700
        outline: "none",
      },
    }),
    option: (
      provided: CSSObjectWithLabel,
      state: OptionProps
    ): CSSObjectWithLabel => ({
      ...provided,
      backgroundColor: state.isFocused ? "#bde4ff" : "transparent",
      color: "black",
      padding: "10px", // Optional padding
    }),
  };
  const Role = [
    { value: "developer", label: "Developer" },
    { value: "designer", label: "Designer" },
    { value: "researcher", label: "Researcher" },
  ];
  const WorkingStatus = [
    { value: "school", label: "School" },
    { value: "college", label: "College" },
    { value: "working", label: "Working" },
    { value: "none", label: "None" },
  ];

  return (
    <form className="flex flex-col gap-1">
      <input type="text" className={inputField()} placeholder="First Name" />
      <input type="text" className={inputField()} placeholder="Last Name" />
      <input
        type="email"
        className={inputField()}
        placeholder="example@example.com"
      />
      <input type="tel" className={inputField()} placeholder="Phone Number" />

      <div>
        <Select styles={customStyles} options={Role} placeholder="Role" />
      </div>

      <div>
        <Select
          styles={customStyles}
          options={WorkingStatus}
          placeholder="Working Status"
        />
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
