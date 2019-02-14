import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";

const styles = theme => ({
  footer: {
    backgroundColor: theme.palette.background.default,
    padding: `${theme.spacing.unit}px 0`,
  },
});

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

function Footer(props) {
  const { classes } = props;

  return (
    <footer className={classes.footer}>
      <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
        Max Henash (c) 2019
      </Typography>
    </footer>
  );
}


export default withStyles(styles)(Footer);
