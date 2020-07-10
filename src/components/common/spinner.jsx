import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  main: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "200px",
  },
});

const Spinner = () => {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <CircularProgress thickness={2} size={50} />
    </div>
  );
};

export default Spinner;
