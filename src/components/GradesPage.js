import _ from 'lodash';
import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";
import Portal from "@material-ui/core/Portal";
import Typography from "@material-ui/core/Typography";
import { MODAL_PORTAL_ID, modalIds } from "../constants";
import GradesDataForm from "./GradesDataForm";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { hideModal, showModal } from "../actions/modals";
import {
  deleteGradeRecords,
  fetchGradesRecords,
  submitGradesDataForm
} from "../actions/grades";
import { fetchStudentsRecords } from "../actions/students";

const styles = theme => ({
  errorMessage: {
    margin: `${theme.spacing.unit * 3}px 0`
  },
  loadingMessage: {
    margin: `${theme.spacing.unit * 3}px 0`
  },
  actionButtonsContainer: {
    whiteSpace: 'nowrap',
  },
  actionButton: {
    [theme.breakpoints.down('sm')]: {
      padding: '5px'
    },
  }
});

class GradesPage extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    closeGradesDataForm: PropTypes.func.isRequired,
    openGradesDataForm: PropTypes.func.isRequired,
    submitGradesDataForm: PropTypes.func.isRequired,
    fetchGradesRecords: PropTypes.func.isRequired,
    fetchStudentsRecords: PropTypes.func.isRequired,
    deleteGradeRecords: PropTypes.func.isRequired,
    tableData: PropTypes.array.isRequired,
    gradesDataFormProps: PropTypes.object.isRequired,
    gradesById: PropTypes.object,
    studentNamesById: PropTypes.object,
    isOpenGradesDataForm: PropTypes.bool,
    isFetchingData: PropTypes.bool,
    fetchDataError: PropTypes.string
  };

  componentDidMount() {
    this.portalContainer = document.getElementById(MODAL_PORTAL_ID);
    this.props.fetchStudentsRecords();
    this.props.fetchGradesRecords();
  }

  getTableOptions = () => {
    return {
      filterType: 'checkbox',
      print: false,
      download: false,
      filter: false,
      selectableRows: false,
      elevation: 0,
      pagination: false,
      responsive: 'scroll',
      customToolbar: () => (
        <Tooltip title="Add a new record">
          <IconButton
            onClick={() => this.props.openGradesDataForm({ isEditMode: false })}
            data-test="btn-add-grade-record"
          >
            <Icon> add </Icon>
          </IconButton>
        </Tooltip>
      )
    };
  };
  getTableColumns = () => {
    return [
      {
        name: "Actions",
        options: {
          customBodyRender: (recordId) => {
            const gradesDataFormProps = {
              isEditMode: true,
              initialData: this.props.gradesById[recordId]
            };
            return (
              <div className={this.props.classes.actionButtonsContainer}>
                <Tooltip title="Edit the record">
                  <IconButton
                    className={this.props.classes.actionButton}
                    onClick={() => this.props.openGradesDataForm(gradesDataFormProps)}
                    data-test="btn-edit-grade-record"
                  >
                    <Icon> edit </Icon>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete the record">
                  <IconButton
                    className={this.props.classes.actionButton}
                    onClick={() => this.props.deleteGradeRecords(recordId)}
                    data-test="btn-delete-grade-record"
                  >
                    <Icon> delete </Icon>
                  </IconButton>
                </Tooltip>
              </div>
            );
          },
          filter: false,
          sort: false,
          download: false,
        }
      },
      { name: "Student" },
      { name: "Profession" },
      {
        name: "Test Date",
        options: {
          customBodyRender: (value) => new Date(value).toLocaleDateString()
        }
      },
      { name: "Grade" },
    ];
  };

  render() {
    const {
      tableData,
      gradesDataFormProps,
      studentNamesById,
      closeGradesDataForm,
      submitGradesDataForm,
      isOpenGradesDataForm,
      classes,
      fetchDataError,
      isFetchingData
    } = this.props;

    if (fetchDataError) {
      return (
        <Typography align="center" variant="h5" className={classes.errorMessage}>
          {fetchDataError}
          <br/>
          Try refreshing the page.
        </Typography>
      );
    } else if (isFetchingData) {
      return (
        <Typography align="center" variant="h5" className={classes.loadingMessage}>
          Loading data...
        </Typography>
      );
    }

    return (
      <section data-test="grades-page">
        <MUIDataTable
          data={tableData}
          columns={this.getTableColumns()}
          options={this.getTableOptions()}
        />
        {isOpenGradesDataForm && (
          <Portal container={this.portalContainer}>
            <GradesDataForm
              {...gradesDataFormProps}
              studentNamesById={studentNamesById}
              onClose={closeGradesDataForm}
              onSubmit={submitGradesDataForm}
            />
          </Portal>
        )}
      </section>
    );
  }
}

function getStudentName(studentsById, studentId) {
  if (!studentsById) {
    return 'Loading...';
  }
  if (studentsById[studentId]) {
    return studentsById[studentId].firstName + ' ' + studentsById[studentId].lastName;
  }
  return 'DELETED';
}

const mapStateToProps = ({ modals, grades, students }) => {
  const {studentsById} = students;
  return {
    isOpenGradesDataForm: modals.activeModal === modalIds.GRADES_DATA_FORM,
    gradesDataFormProps: modals.modalProps || {},
    isFetchingData: students.isFetchingData || grades.isFetchingData || !studentsById || !grades.gradesById,
    studentNamesById : studentsById ? _.mapValues(studentsById, rec => rec.firstName + ' ' + rec.lastName) : null,
    gradesById: grades.gradesById,
    fetchDataError: grades.fetchDataError || students.fetchDataError,
    tableData: Object.values(grades.gradesById || {}).map(({id, studentId, profession, testDate, grade}) => [
      id, getStudentName(studentsById, studentId), profession, testDate, grade
    ])
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    openGradesDataForm: (formProps) => showModal(modalIds.GRADES_DATA_FORM, formProps),
    closeGradesDataForm: () => hideModal(modalIds.GRADES_DATA_FORM),
    submitGradesDataForm,
    fetchGradesRecords,
    fetchStudentsRecords,
    deleteGradeRecords
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GradesPage));
