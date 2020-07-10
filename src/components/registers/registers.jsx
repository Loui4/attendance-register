import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import TableContainer from "@material-ui/core/TableContainer";
import { loadMembers } from "../../store/members";
import CheckIcon from "@material-ui/icons/Check";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";

import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import { loadServices } from "../../store/services";
import Paper from "@material-ui/core/Paper";
import {
  loadRegistrations,
  checkRegistration,
  addRegistration,
  deleteRegistration,
} from "../../store/registers";
import EventCreate from "./eventCreate";

const Registers = (props) => {
  const [changedCell, setChangedCell] = useState({});

  const {
    members,
    services,
    loadServices,
    loadMembers,
    loadRegistrations,
    checkRegistration,
    addRegistration,
    deleteRegistration,
    addingRegistration,
  } = props;

  useEffect(() => {
    loadServices();
    loadMembers();
    loadRegistrations();
  }, []);

  const registerIcon = (memberId, serviceId) => {
    return checkRegistration(memberId, serviceId) ? (
      <CheckIcon />
    ) : (
      <CheckBoxOutlineBlankIcon />
    );
  };

  const toggleAttendance = (service, member) => {
    const registration = checkRegistration(member, service);
    setChangedCell({ service, member });

    if (registration) {
      console.log(registration);
      deleteRegistration(registration.id);
      return;
    }
    addRegistration({ service, member });
  };

  const spinnerForChangedCell = (service, member) => {
    return (
      changedCell.service === service &&
      changedCell.member === member &&
      addingRegistration
    );
  };

  //

  const table = (
    <TableContainer component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Member</TableCell>
            {services.list.map((service) => (
              <TableCell key={service.id}>{service.name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {members.list.map((member) => (
            <TableRow key={member.id}>
              <TableCell>{`${member.firstname} ${member.surname}`}</TableCell>
              {services.list.map((service) => {
                return (
                  <TableCell
                    key={service.id}
                    size="small"
                    style={{ width: "10px", border: "1px solid" }}
                  >
                    {spinnerForChangedCell(service.id, member.id) ? (
                      <CircularProgress />
                    ) : (
                      <IconButton
                        onClick={() => {
                          toggleAttendance(service.id, member.id);
                        }}
                      >
                        {registerIcon(member.id, service.id)}
                      </IconButton>
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
  return (
    <>
      <EventCreate />
      {table}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    members: state.entities.members,
    addRequest: state.utils.addRequest,
    services: state.entities.services,
    addingRegistration: state.entities.registrations.addingRegistration,
    checkRegistration: (memberId, serviceId) =>
      checkRegistration(memberId, serviceId)(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadServices: () => dispatch(loadServices()),
    loadMembers: () => dispatch(loadMembers()),
    loadRegistrations: () => dispatch(loadRegistrations()),
    addRegistration: (registration) => dispatch(addRegistration(registration)),
    deleteRegistration: (registrationId) =>
      dispatch(deleteRegistration(registrationId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Registers);
