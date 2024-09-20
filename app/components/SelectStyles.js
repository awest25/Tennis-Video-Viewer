// Component used to style searchbar
export const SelectStyles = {
  control: (provided) => ({
    ...provided,
    border: "1px solid #EDEDED",
    borderRadius: "16px",
    height: "30%",
    padding: "2% 4%",
    width: "25vw",
    boxShadow: "none",
    marginTop: "20%",
    fontFamily: "DM Sans, sans-serif",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "black", // Font color for the selected value
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "black", // Font color for the placeholder text
    fontSize: "16px",
    fontWeight: "700",
  }),
  option: (provided) => ({
    ...provided,
    color: "black", // Font color for each option in the dropdown
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "16px",
  }),
  input: (provided) => ({
    ...provided,
    color: "black",
    fontSize: "16px", // Adjust font size for typed text
    fontWeight: "700",
  }),
};
