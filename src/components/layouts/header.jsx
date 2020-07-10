import React from "react";
import AppBar from "@material-ui/core/AppBar";
import GroupIcon from "@material-ui/icons/Group";
import { Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  logoIcon: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  logoLabel: {
    fontWeight: "bold",
    fontSize: "20px",
  },
});

const Header = () => {
  const classes = useStyles();

  return (
    <div>
      <AppBar color="inherit" position="sticky">
        <Toolbar>
          <div className={classes.logoIcon}>
            <GroupIcon fontSize="large" />
            <Typography className={classes.logoLabel}>attendance</Typography>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
