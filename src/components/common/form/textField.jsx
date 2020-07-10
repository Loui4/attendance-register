import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  textField: {
    marginBottom: theme.spacing(3),
    width: "25ch",
  },
}));

const TextInput = (props) => {
  const classes = useStyles();

  const { name, value, handleChange, label, dateProps } = props;
  return (
    <TextField
      variant="outlined"
      className={classes.textField}
      name={name}
      value={value}
      onChange={handleChange}
      label={label}
      {...dateProps}
    />
  );
};

export default TextInput;
