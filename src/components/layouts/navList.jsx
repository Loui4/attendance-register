import React from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import HomeIcon from "@material-ui/icons/Home";
import GroupTwoToneIcon from "@material-ui/icons/GroupTwoTone";
import PlaceTwoToneIcon from "@material-ui/icons/PlaceTwoTone";
import ListAltTwoToneIcon from "@material-ui/icons/ListAltTwoTone";
import SettingsTwoToneIcon from "@material-ui/icons/SettingsTwoTone";

const useStyles = makeStyles((theme) => ({
  main: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const NavList = () => {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <List component="nav">
        <ListItem component={Link} to="/places">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem component={Link} to="/registers">
          <ListItemIcon>
            <ListAltTwoToneIcon />
          </ListItemIcon>
          <ListItemText primary="Registers" />
        </ListItem>

        <ListItem component={Link} to="/members">
          <ListItemIcon>
            <GroupTwoToneIcon />
          </ListItemIcon>
          <ListItemText primary="Members" />
        </ListItem>

        <ListItem component={Link} to="/places">
          <ListItemIcon>
            <PlaceTwoToneIcon />
          </ListItemIcon>
          <ListItemText primary="Places" />
        </ListItem>

        <ListItem component={Link} to="/settings">
          <ListItemIcon>
            <SettingsTwoToneIcon />
          </ListItemIcon>
          <ListItemText primary="settings" />
        </ListItem>
      </List>
    </div>
  );
};

export default NavList;
