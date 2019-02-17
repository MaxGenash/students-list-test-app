import _ from 'lodash';
import {
  CREATE_NEW_STUDENT_RECORD,
  EDIT_STUDENT_RECORD,
  DELETE_STUDENT_RECORD,
  FETCH_STUDENTS_RECORDS_REQUEST,
  FETCH_STUDENTS_RECORDS_SUCCESS,
  FETCH_STUDENTS_RECORDS_FAIL
} from "../constants/actionTypes";

const initialState = {
  studentsById: null,     // null = "not fetched yet"; {} = "fetched and there is an empty list"
  isFetchingData: false,  // the field is needed in case we want to fetch data again later (not only initial loading)
  fetchDataError: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NEW_STUDENT_RECORD:
    case EDIT_STUDENT_RECORD:
      return {
        ...state,
        studentsById: {
          ...state.studentsById,
          [action.record.id]: action.record
        },
      };
    case DELETE_STUDENT_RECORD:
      return {
        ...state,
        studentsById: _.omit(state.studentsById, action.recordId),
      };

    case FETCH_STUDENTS_RECORDS_REQUEST:
      return {
        ...state,
        fetchDataError: '',
        isFetchingData: true,
      };
    case FETCH_STUDENTS_RECORDS_SUCCESS:
      return {
        ...state,
        fetchDataError: '',
        isFetchingData: false,
        // Note that we add the fetched data to the existing data to prevent overwriting of the local changes
        studentsById: {...state.studentsById, ...action.studentsById},
      };
    case FETCH_STUDENTS_RECORDS_FAIL:
      return {
        ...state,
        isFetchingData: false,
        fetchDataError: action.error,
        studentsById: null
      };
      
    default:
      return state;
  }
}
