import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import { loadResidence } from "../../store/residences";
import { connect } from "react-redux";
import { addMember } from "../../store/members";

import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { Link } from "react-router-dom";
import {
  renderInput,
  renderRadioInput,
  renderSelect,
} from "../common/form/formBuilder";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    padding: "15px",
  },
}));

const MemberCreate = (props) => {
  const classes = useStyles();
  const { addMember, residences, loadResidence, addRequest } = props;
  const [member, setMember] = useState({
    firstname: "",
    surname: "",
    gender: "",
    dob: "",
    residence: "",
  });

  useEffect(() => {
    loadResidence();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    addMember(member);
  };

  const handleChange = (e) => {
    const updatedMember = { ...member };
    updatedMember[e.target.name] = e.target.value;
    setMember(updatedMember);
  };

  const form = (
    <form className={classes.form} onSubmit={handleSubmit}>
      {renderInput("firstname", "Firstname", member.firstname, handleChange)}

      {renderInput("surname", "Surname", member.surname, handleChange)}
      {renderInput("dob", "Date Of Birth", member.dob, handleChange, true)}
      {renderRadioInput("gender", "Gender", member.gender, handleChange, [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
      ])}
      {renderSelect(
        "residence",
        "Residence",
        member.residence,
        handleChange,
        residences.list,
        { loading: residences.loading, idAttr: "id", valueAttr: "area" }
      )}

      <Button
        variant="contained"
        color="primary"
        type="submit"
        style={{ width: "33ch" }}
      >
        {addRequest ? <CircularProgress color="inherit" /> : "submit"}
      </Button>
    </form>
  );

  return (
    <div>
      <IconButton component={Link} to="/members/">
        <KeyboardBackspaceIcon />
      </IconButton>
      {form}
    </div>
  );
};
const mapStateToProps = (state) => ({
  residences: state.entities.residences,
  addRequest: state.utils.addRequest,
});
const mapDispatchToProps = (dispatch) => {
  return {
    addMember: (member, toast) => dispatch(addMember(member, toast)),
    loadResidence: () => dispatch(loadResidence()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MemberCreate);
