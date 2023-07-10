import React, { useState } from "react";

export default function SelectComponent({
  valueFieldName,
  titleFieldName,
  options,
  placeholder,
  onValueChangeEvent,
}) {
  const [selectedOption, setSelectedOption] = useState("");
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    onValueChangeEvent(event.target.value);
  };
  return (
    <select
      className="header__location"
      value={selectedOption}
      onChange={handleSelectChange}
    >
      <option value="" className={selectedOption ? "option_disable" : ""}>
        {selectedOption ? "Disable" : placeholder}
      </option>
      {options.map((option, index) => (
        <option key={index} value={option[valueFieldName]}>
          {option[titleFieldName]}
        </option>
      ))}
    </select>
  );
}
