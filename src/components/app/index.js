import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({

});

function App(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      Hello world
    </div>
  );
}

export default withStyles(styles)(App);
