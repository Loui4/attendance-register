import React from "react";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextInput from "../common/form/textField";
import CircularProgress from "@material-ui/core/CircularProgress";

import { connect } from "react-redux";
import { addService } from "../../store/services";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    padding: "15px",
  },
}));

const EventCreate = (props) => {
  const { addRequest, addService } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [service, setService] = React.useState({ name: "", date: "" });
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleChange = (e) => {
    const updatedService = { ...service };
    updatedService[e.target.name] = e.target.value;
    setService(updatedService);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addService(service);
  };

  return (
    <>
      <IconButton
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        <AddIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextInput
            name="name"
            value={service.name}
            handleChange={handleChange}
            label="Name"
          />

          <TextInput
            name="date"
            value={service.dob}
            handleChange={handleChange}
            label="Event Date"
            dateProps={{
              type: "datetime-local",
              InputLabelProps: { shrink: true },
            }}
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ width: "33ch" }}
          >
            {addRequest ? <CircularProgress color="inherit" /> : "submit"}
          </Button>
        </form>
      </Popover>
    </>
  );
};

const matchStateToProps = (state) => {
  return {
    addRequest: state.utils.addRequest,
  };
};

const matchDispatchToProps = (dispatch) => {
  return {
    addService: (service) => dispatch(addService(service)),
  };
};

export default connect(matchStateToProps, matchDispatchToProps)(EventCreate);
