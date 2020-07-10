import React from "react";
import FormControl from "@material-ui/core/FormControl";
import { InputLabel } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginBottom: theme.spacing(3),
    width: "25ch",
  },
}));

const SelectInput = (props) => {
  const {
    value,
    name,
    label,
    idAttr,
    valueAttr,
    items,
    id,
    handleChange,
    loading,
  } = props;

  const classes = useStyles();
  return (
    <FormControl className={classes.textField}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <InputLabel id={id}>{label}</InputLabel>
          <Select
            labelId={id}
            name={name}
            value={value}
            inputProps={{
              name: "residence",
            }}
            onChange={handleChange}
          >
            {items.map((item) => (
              <MenuItem key={item[idAttr]} value={item[idAttr]}>
                {item[valueAttr]}
              </MenuItem>
            ))}
          </Select>
        </>
      )}
    </FormControl>
  );
};

export default SelectInput;
