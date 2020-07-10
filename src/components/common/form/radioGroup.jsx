import React from "react";
import FormControl from "@material-ui/core/FormControl";
import { RadioGroup, Radio } from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const RadioGroupInput = (props) => {
  const { label, handleChange, value, name, radioInputs } = props;
  return (
    <FormControl>
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup
        aria-label={label}
        name={name}
        value={value}
        onChange={handleChange}
      >
        {radioInputs.map((radioInput, key) => (
          <FormControlLabel
            key={key}
            value={radioInput.value}
            control={<Radio color="primary" />}
            label={radioInput.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioGroupInput;
