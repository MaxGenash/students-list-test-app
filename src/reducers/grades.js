import _ from 'lodash';
import {
  CREATE_NEW_GRADE_RECORD,
  EDIT_GRADE_RECORD,
  DELETE_GRADE_RECORDS,
  FETCH_GRADES_RECORDS_REQUEST,
  FETCH_GRADES_RECORDS_SUCCESS,
  FETCH_GRADES_RECORDS_FAIL
} from "../constants/actionTypes";

const initialState = {
  gradesById: null,       // null = "not fetched yet"; {} = "fetched and there is an empty list"
  isFetchingData: false,  // the field is needed in case we want to fetch data again later (not only initial loading)
  fetchDataError: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NEW_GRADE_RECORD:
    case EDIT_GRADE_RECORD:
      return {
        ...state,
        gradesById: {
          ...state.gradesById,
          [action.record.id]: action.record
        },
      };
    case DELETE_GRADE_RECORDS:
      return {
        ...state,
        gradesById: _.omit(state.gradesById, action.ids),
      };

    case FETCH_GRADES_RECORDS_REQUEST:
      return {
        ...state,
        fetchDataError: '',
        isFetchingData: true,
      };
    case FETCH_GRADES_RECORDS_SUCCESS:
      return {
        ...state,
        fetchDataError: '',
        isFetchingData: false,
        // Note that we add the fetched data to the existing data to prevent overwriting of the local changes
        gradesById: {...state.gradesById, ...action.gradesById},
      };
    case FETCH_GRADES_RECORDS_FAIL:
      return {
        ...state,
        isFetchingData: false,
        fetchDataError: action.error,
        gradesById: null
      };
      
    default:
      return state;
  }
}
