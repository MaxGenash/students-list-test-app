import React from "react";
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from "@material-ui/core/Grid";

class StudentsDataForm extends React.Component {
  static defaultProps = {
    isEditMode: false,
    initialData: {}
  };

  static propTypes = {
    isEditMode: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    initialData: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      form: {
        // Note that we don't use spread operator here because initialData may contain redundant stuff
        firstName: props.initialData.firstName || '',
        lastName: props.initialData.lastName || '',
        birthdayDate: props.initialData.birthdayDate || '',
      }
    };
  }

  setFormData = (field, e) => {
    this.setState({
      form: {
        ...this.state.form,
        [field]: e.target.value
      }
    });
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(
      {
        ...this.props.initialData,  // pass the data (like recordId) that we didn't keep in the state
        ...this.state.form
      }
    );
  };

  render() {
    return (
      <Dialog open={true} onClose={this.props.onClose}>
        <DialogTitle> {this.props.isEditMode ? 'Edit ' : 'Add a new '} student </DialogTitle>
        <DialogContent>
          <form id="grades-data-form" onSubmit={this.onFormSubmit}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <TextField
                  required
                  label="First Name"
                  value={this.state.form.firstName}
                  onChange={this.setFormData.bind(this, 'firstName')}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Last Name"
                  value={this.state.form.lastName}
                  onChange={this.setFormData.bind(this, 'lastName')}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  type="date"
                  label="Birthday Date"
                  value={this.state.form.birthdayDate.split('T')[0]}
                  onChange={this.setFormData.bind(this, 'birthdayDate')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" type="submit" form="grades-data-form">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default StudentsDataForm;
