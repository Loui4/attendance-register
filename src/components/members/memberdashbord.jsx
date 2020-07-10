import React from "react";
import { Route, Switch } from "react-router-dom";
import Members from "./members";
import MemberCreate from "./memberCreate";

const MembersDashboard = () => {
  return (
    <>
      <Switch>
        <Route path="/members/create" render={() => <MemberCreate />} />
        <Route path="/members" render={() => <Members />} />
      </Switch>
    </>
  );
};

export default MembersDashboard;
