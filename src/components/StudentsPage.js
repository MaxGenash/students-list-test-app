import React  from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";
import Portal from "@material-ui/core/Portal";
import Typography from "@material-ui/core/Typography";
import { MODAL_PORTAL_ID, modalIds } from "../constants";
import StudentsDataForm from "./StudentsDataForm";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { hideModal, showModal } from "../actions/modals";
import {
  deleteStudentRecord,
  fetchStudentsRecords,
  submitStudentsDataForm
} from "../actions/students";
import { getExpiredYears } from "../utils";

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

class StudentsPage extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    closeStudentsDataForm: PropTypes.func.isRequired,
    openStudentsDataForm: PropTypes.func.isRequired,
    submitStudentsDataForm: PropTypes.func.isRequired,
    fetchStudentsRecords: PropTypes.func.isRequired,
    deleteStudentRecord: PropTypes.func.isRequired,
    tableData: PropTypes.array.isRequired,
    studentsDataFormProps: PropTypes.object.isRequired,
    studentsById: PropTypes.object,
    isOpenStudentsDataForm: PropTypes.bool,
    isFetchingData: PropTypes.bool,
    fetchDataError: PropTypes.string,
  };

  componentDidMount() {
    this.portalContainer = document.getElementById(MODAL_PORTAL_ID);
    this.props.fetchStudentsRecords();
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
            onClick={() => this.props.openStudentsDataForm({ isEditMode: false })}
            data-test="btn-add-student-record"
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
            const studentsDataFormProps = {
              isEditMode: true,
              initialData: this.props.studentsById[recordId]
            };
            return (
              <div className={this.props.classes.actionButtonsContainer}>
                <Tooltip title="Edit the record">
                  <IconButton
                    className={this.props.classes.actionButton}
                    onClick={() => this.props.openStudentsDataForm(studentsDataFormProps)}
                    data-test="btn-edit-student-record"
                  >
                    <Icon> edit </Icon>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete the record">
                  <IconButton
                    className={this.props.classes.actionButton}
                    onClick={() => this.props.deleteStudentRecord(recordId)}
                    data-test="btn-delete-student-record"
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
      { name: "First Name" },
      { name: "Last Name" },
      { name: "Age" },
      {
        name: "Birthday Date",
        options: {
          customBodyRender(value) {
            return new Date(value).toLocaleDateString();
          }
        }
      },
    ];
  };

  render() {
    const {
      tableData,
      studentsDataFormProps,
      closeStudentsDataForm,
      submitStudentsDataForm,
      isOpenStudentsDataForm,
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
      <section data-test="students-page">
        <MUIDataTable
          data={tableData}
          columns={this.getTableColumns()}
          options={this.getTableOptions()}
        />
        {isOpenStudentsDataForm && (
          <Portal container={this.portalContainer}>
            <StudentsDataForm
              {...studentsDataFormProps}
              onClose={closeStudentsDataForm}
              onSubmit={submitStudentsDataForm}
            />
          </Portal>
        )}
      </section>
    );
  }
}

const mapStateToProps = ({ modals, students }) => ({
  isOpenStudentsDataForm: modals.activeModal === modalIds.STUDENTS_DATA_FORM,
  studentsDataFormProps: modals.modalProps || {},
  studentsById: students.studentsById,
  isFetchingData: students.isFetchingData || !students.studentsById,
  fetchDataError: students.fetchDataError,
  tableData: Object.values(students.studentsById || {}).map(({id, firstName, lastName, birthdayDate}) => [
    id, firstName, lastName, getExpiredYears(birthdayDate), birthdayDate
  ])
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    openStudentsDataForm: (formProps) => showModal(modalIds.STUDENTS_DATA_FORM, formProps),
    closeStudentsDataForm: () => hideModal(modalIds.STUDENTS_DATA_FORM),
    submitStudentsDataForm,
    fetchStudentsRecords,
    deleteStudentRecord
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StudentsPage));
