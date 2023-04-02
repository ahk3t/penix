import { Select } from "@chakra-ui/react";

const mockOpotions = [
  { value: "1", title: "1" },
  { value: "2", title: "2" },
  { value: "3", title: "3" },
];
const FormSelect = ({
  isDisabled,
  placeholder,
  options = mockOpotions,
  setValue,
  value,
}) => {
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const renderOptions = options.map(({ value, title }) => (
    <option key={value + title} value={value}>
      {title}
    </option>
  ));
  return (
    <Select
      minWidth="200px"
      maxWidth="400px"
      placeholder={placeholder}
      isDisabled={isDisabled}
      onChange={handleChange}
      value={value}
    >
      {renderOptions}
    </Select>
  );
};
export default FormSelect;
