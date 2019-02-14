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
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";

class GradesDataForm extends React.Component {
  static defaultProps = {
    isOpen: false,
    isEditMode: false,
    initialData: {
      studentId: "1",
      profession: "Hip-hop music",
      testDate: "2000-11-02T00:00:00.000Z",
      grade: "A",
    },
    studentNamesById: {
      1: "Marshall Bruce Mathers",
      2: "Sonny John Moore",
      5: "Thomas Wesley Pentz"
    }
  };

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
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
        studentId: null,
        profession: "",
        testDate: null,
        grade: null,
        ...props.initialData
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
    this.props.onSubmit(this.state.form);
  };

  render() {
    const {isOpen, isEditMode, onClose} = this.props;
    return (
      <Dialog
        open={isOpen}
        onClose={onClose}
      >
        <DialogTitle> {isEditMode ? 'Edit ' : 'Add a new '} grade </DialogTitle>
        <DialogContent>
          <form id="grades-data-form" onSubmit={this.onFormSubmit}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <FormControl required={true} fullWidth>
                  <InputLabel htmlFor="student-input"> Student </InputLabel>
                  <Select
                    value={this.state.form.studentId}
                    onChange={this.setFormData.bind(this, 'studentId')}
                    inputProps={{
                      id: 'student-input'
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {Object.entries(this.props.studentNamesById).map(([id, name]) => (
                      <MenuItem value={id} key={id}> {name} </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Profession"
                  value={this.state.form.profession}
                  onChange={this.setFormData.bind(this, 'profession')}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  type="date"
                  label="Test Date"
                  value={this.state.form.testDate}
                  onChange={this.setFormData.bind(this, 'testDate')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl required={true} fullWidth>
                  <InputLabel htmlFor="grade-input"> Grade </InputLabel>
                  <Select
                    required={true}
                    value={this.state.form.grade}
                    onChange={this.setFormData.bind(this, 'grade')}
                    inputProps={{
                      id: 'grade-input',
                      required: true
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="A"> A </MenuItem>
                    <MenuItem value="B"> B </MenuItem>
                    <MenuItem value="C"> C </MenuItem>
                    <MenuItem value="D"> D </MenuItem>
                    <MenuItem value="E"> E </MenuItem>
                    <MenuItem value="F"> F </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            {/*<TextField*/}
            {/*required*/}
            {/*name="firstName"*/}
            {/*label="First name"*/}
            {/*fullWidth*/}
            {/*/>*/}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
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

export default GradesDataForm;
