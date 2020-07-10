import React from "react";
import { Provider } from "react-redux";
import store from "./store/configureStore";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Grid } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import Card from "@material-ui/core/Card";

import Header from "./components/layouts/header";
import NavList from "./components/layouts/navList";
import MembersDashboard from "./components/members/memberdashbord";
import Places from "./components/places/places";
import Toastify from "./components/common/toast";
import Registers from "./components/registers/registers";

const useStyles = makeStyles({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 0,
    backgroundColor: "#eeeeee",
    height: "1000px",
    width: "100%",
  },

  contentArea: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "20px",
    padding: "0px",
  },
  contentDisplay: {
    padding: "10px",
  },
});

function App(props) {
  const classes = useStyles();

  return (
    <Provider store={store()}>
      <Container className={classes.mainContainer} maxWidth="xl">
        <Header />
        <Grid container className={classes.contentArea} spacing={1}>
          <Grid item xs={12} md={2}>
            <NavList />
          </Grid>
          <Grid item xs={12} md={6} className={classes.contentDisplay}>
            <Card square={true} style={{ padding: "15px" }}>
              <Switch>
                <Route path="/members" component={MembersDashboard} />
                <Route path="/registers" render={() => <Registers />} />

                <Route path="/places" component={Places} />
              </Switch>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Toastify />
    </Provider>
  );
}

export default App;
