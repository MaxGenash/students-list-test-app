import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";

function Header (props) {
  return (
    <AppBar position="static">
      <Tabs variant="fullWidth" value={props.location.pathname}>
        <Tab label="Students list" value="/students" component={NavLink} to="/students" />
        <Tab label="Grades list" value="/grades" component={NavLink} to="/grades" />
      </Tabs>
    </AppBar>
  );
}

Header.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withRouter(Header);
