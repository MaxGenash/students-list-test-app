import React from "react";
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";

class GradesDataForm extends React.Component {
  static defaultProps = {
    isOpen: false,
    isEditMode: false,
    initialData: {}
  };

  static propTypes = {
    isEditMode: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    initialData: PropTypes.object.isRequired,
    studentNamesById: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      form: {
        // Note that we don't use spread operator here because initialData may contain redundant stuff
        studentId: props.initialData.studentId || '',
        profession: props.initialData.profession || '',
        testDate: props.initialData.testDate || '',
        grade: props.initialData.grade || '',
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
        <DialogTitle> {this.props.isEditMode ? 'Edit ' : 'Add a new '} grade </DialogTitle>
        <DialogContent>
          <form id="grades-data-form" onSubmit={this.onFormSubmit} data-test="grades-data-form">
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="student-input"> Student </InputLabel>
                  <Select
                    native
                    required
                    value={this.state.form.studentId}
                    onChange={this.setFormData.bind(this, 'studentId')}
                    inputProps={{
                      'id': 'student-input',
                      'data-test': 'grades-data-form-studentId'
                    }}
                  >
                    <option key="none" value="" />
                    {Object.entries(this.props.studentNamesById).map(([id, name]) => (
                      <option value={id} key={id}> {name} </option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    required
                    label="Profession"
                    value={this.state.form.profession}
                    onChange={this.setFormData.bind(this, 'profession')}
                    fullWidth
                    inputProps={{'data-test': 'grades-data-form-profession'}}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    required
                    type="date"
                    label="Test Date"
                    value={this.state.form.testDate.split('T')[0]}
                    onChange={this.setFormData.bind(this, 'testDate')}
                    InputLabelProps={{shrink: true}}
                    inputProps={{'data-test': 'grades-data-form-testDate'}}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="grade-input"> Grade </InputLabel>
                  <Select
                    native
                    required
                    value={this.state.form.grade}
                    onChange={this.setFormData.bind(this, 'grade')}
                    inputProps={{
                      'id': 'grade-input',
                      'data-test': 'grades-data-form-grade'
                    }}
                  >
                    <option key="none" value="" />
                    <option key="A" value="A"> A </option>
                    <option key="B" value="B"> B </option>
                    <option key="C" value="C"> C </option>
                    <option key="D" value="D"> D </option>
                    <option key="E" value="E"> E </option>
                    <option key="F" value="F"> F </option>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose} color="primary" data-test="grades-data-btn-cancel">
            Cancel
          </Button>
          <Button color="primary" type="submit" form="grades-data-form" data-test="grades-data-btn-submit">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default GradesDataForm;
