import React from "react";
import { Route } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { Redirect, Switch } from "react-router";
import StudentsPage from "./StudentsPage";
import GradesPage from "./GradesPage";
import Header from "./Header";
import Footer from "./Footer";
import { MODAL_PORTAL_ID } from "../constants";
import PropTypes from "prop-types";

const styles = theme => ({
  app: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    minWidth: '320px',
    backgroundColor: theme.palette.background.paper,
  },
  pageContainer: {
    flex: 1
  },
});

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

function App(props) {
  const { classes } = props;

  return (
    <div className={classes.app}>
      <Header />
      <main className={classes.pageContainer}>
        <Switch>
          <Route path="/grades" component={GradesPage}/>
          <Route path="/students" component={StudentsPage}/>
          <Redirect to="/students"/>
        </Switch>
      </main>
      <div id={MODAL_PORTAL_ID} />
      <Footer />
    </div>
  );
}

export default withStyles(styles)(App);
