import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const ITEM_HEIGHT = 48;

const MenuDropDown = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { icon, items } = props;
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {icon ? icon : <MoreVertIcon />}
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        onClose={handleClose}
        open={open}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {items.map((option, index) => (
          <MenuItem key={index} onClick={handleClose}>
            {option.value}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default MenuDropDown;
