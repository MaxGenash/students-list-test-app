import {
  CREATE_NEW_GRADE_RECORD,
  EDIT_GRADE_RECORD,
  DELETE_GRADE_RECORDS,
  FETCH_GRADES_RECORDS_REQUEST,
  FETCH_GRADES_RECORDS_SUCCESS,
  FETCH_GRADES_RECORDS_FAIL
} from "../constants/actionTypes";
import { modalIds } from "../constants";
import { hideModal } from "./modals";
import { getNextRecordId } from "../utils";

export const fetchGradesRecords = () => {
  return (dispatch, getState) => {
    if (getState().grades.gradesById) {
      // Don't fetch new data to prevent overwriting of local changes
      // (just a feature of this implementation since we can't synchronize the apps's data with the server)
      return;
    }

    dispatch({
      type: FETCH_GRADES_RECORDS_REQUEST,
    });

    fetch('https://api.jsonbin.io/b/5c633a2c6874aa33ba0de476', {
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
        if (!data.success || !data.entities || !data.entities.gradesById)
          throw new Error('Failed to fetch data');

        dispatch({
          type: FETCH_GRADES_RECORDS_SUCCESS,
          gradesById: data.entities.gradesById
        });
      })
      .catch( error =>  {
        dispatch({
          type: FETCH_GRADES_RECORDS_FAIL,
          error: error.message
        });
      });
  };
};

export const createNewGradeRecord = (record) => {
  return (dispatch, getState) => {
    dispatch({
      type: CREATE_NEW_GRADE_RECORD,
      record: {
        ...record,
        id: getNextRecordId(getState().grades.gradesById)
      }
    });
  };
};

export const editGradeRecord = (record) => {
  return dispatch => {
    dispatch({
      type: EDIT_GRADE_RECORD,
      record
    });
  };
};

export const submitGradesDataForm = (record) => {
  return dispatch => {
    if (record.id)  // if the record has an id - it means we were editing it, else a new record wouldn't have the id yet
      dispatch(editGradeRecord(record));
    else
      dispatch(createNewGradeRecord(record));
    dispatch(hideModal(modalIds.GRADES_DATA_FORM));
  };
};

export const deleteGradeRecords = (ids) => {
  return dispatch => {
    dispatch({
      type: DELETE_GRADE_RECORDS,
      ids
    });
  };
};
