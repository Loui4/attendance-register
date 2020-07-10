import React from "react";
import TextInput from "./textField";
import RadioGroupInput from "./radioGroup";
import SelectInput from "./selectInput";

export const renderInput = (name, label, value, handleChange, date = false) => {
  const props = { name, label, value, handleChange };

  return (
    <TextInput
      {...props}
      dateProps={
        date
          ? {
              type: "datetime-local",
              InputLabelProps: { shrink: true },
            }
          : null
      }
    />
  );
};

export const renderRadioInput = (
  name,
  label,
  value,
  handleChange,
  radioInputs
) => {
  const props = { name, label, value, handleChange, radioInputs };
  return <RadioGroupInput {...props} />;
};

export const renderSelect = (
  name,
  label,
  value,
  handleChange,
  items,
  selectCustomProps
) => {
  const props = {
    name,
    label,
    id: name,
    value,
    handleChange,
    items,
    ...selectCustomProps,
  };
  return <SelectInput {...props} />;
};
