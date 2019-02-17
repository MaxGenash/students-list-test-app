import {
  CREATE_NEW_STUDENT_RECORD,
  EDIT_STUDENT_RECORD,
  DELETE_STUDENT_RECORD,
  FETCH_STUDENTS_RECORDS_REQUEST,
  FETCH_STUDENTS_RECORDS_SUCCESS,
  FETCH_STUDENTS_RECORDS_FAIL
} from "../constants/actionTypes";
import { modalIds } from "../constants";
import { hideModal } from "./modals";
import { getNextRecordId } from "../utils";

export const fetchStudentsRecords = () => {
  return (dispatch, getState) => {
    if (getState().students.studentsById) {
      // Don't fetch new data to prevent overwriting of local changes
      // (just a feature of this implementation since we can't synchronize the apps's data with the server)
      return;
    }

    dispatch({
      type: FETCH_STUDENTS_RECORDS_REQUEST,
    });

    fetch('https://api.jsonbin.io/b/5c6335bba83a293177310e03/1', {
      mode: 'cors',
      method: 'get',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      }
    })
      .then( response => {
        const contentType = response.headers.get("content-type");
        if (response.status !== 200 || !contentType || !contentType.includes("application/json"))
          throw new Error('Failed to fetch data');
        else
          return response.json();
      })
      .then( data => {
        if (!data.success || !data.entities || !data.entities.studentsById)
          throw new Error('Failed to fetch data');

        dispatch({
          type: FETCH_STUDENTS_RECORDS_SUCCESS,
          studentsById: data.entities.studentsById
        });
      })
      .catch( error =>  {
        dispatch({
          type: FETCH_STUDENTS_RECORDS_FAIL,
          error: error.message
        });
      });
  };
};

export const createNewStudentRecord = (record) => {
  return (dispatch, getState) => {
    dispatch({
      type: CREATE_NEW_STUDENT_RECORD,
      record: {
        ...record,
        id: getNextRecordId(getState().students.studentsById)
      }
    });
  };
};

export const editStudentRecord = (record) => {
  return dispatch => {
    dispatch({
      type: EDIT_STUDENT_RECORD,
      record
    });
  };
};

export const submitStudentsDataForm = (record) => {
  return dispatch => {
    if (record.id)  // if the record has an id - it means we were editing it, else a new record wouldn't have the id yet
      dispatch(editStudentRecord(record));
    else
      dispatch(createNewStudentRecord(record));
    dispatch(hideModal(modalIds.STUDENTS_DATA_FORM));
  };
};

export const deleteStudentRecord = (recordId) => {
  return dispatch => {
    dispatch({
      type: DELETE_STUDENT_RECORD,
      recordId
    });
  };
};
