import React, { useEffect } from "react";
import { loadMembers, addMember, deleteMember } from "../../store/members";
import { getResidence, loadResidence } from "../../store/residences";

import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";

import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";

import PersonAddIcon from "@material-ui/icons/PersonAdd";

import { makeStyles } from "@material-ui/core/styles";
import MenuDropDown from "../common/menuDropDown";
import Spinner from "../common/spinner";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles({
  btn: {
    borderRadius: "1px",
    marginBottom: "20px",
  },
});

const dropDownOptions = [
  { value: "view" },
  { value: "edit" },
  { value: "delete" },
];

const Members = (props) => {
  const {
    members,
    initMembers,
    findResidence,
    initResidences,
    loadingMembers,
  } = props;
  const classes = useStyles();

  useEffect(() => {
    initMembers();
    initResidences();
  }, []);

  const formatResidence = (residenceId) => {
    const residence = findResidence(residenceId);
    return residence ? residence.area : "not set";
  };
  const table = (
    <TableContainer component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>First name</TableCell>
            <TableCell>Last name</TableCell>
            <TableCell>Dob</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Residence</TableCell>
            <TableCell>Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {members.list.map((member) => (
            <TableRow key={member.id}>
              <TableCell component="th" scope="row">
                {member.firstname}
              </TableCell>
              <TableCell>{member.surname}</TableCell>
              <TableCell>{member.dob}</TableCell>
              <TableCell>{member.gender}</TableCell>
              <TableCell>{formatResidence(member.residence)}</TableCell>
              <TableCell>
                <MenuDropDown items={dropDownOptions} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <>
      <IconButton
        variant="contained"
        component={Link}
        to="/members/create"
        color="primary"
        className={classes.btn}
      >
        <PersonAddIcon />
      </IconButton>

      {loadingMembers ? <Spinner /> : table}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    members: state.entities.members,
    loadingMembers: state.entities.members.loading,
    findResidence: (residenceId) => getResidence(residenceId)(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initMembers: () => dispatch(loadMembers()),
    initResidences: () => dispatch(loadResidence()),
    addMember: (member) => dispatch(addMember(member)),
    deleteMember: (id) => dispatch(deleteMember(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Members);
