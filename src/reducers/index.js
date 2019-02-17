import { combineReducers } from 'redux'
import modals from "./modals";
import students from "./students";
import grades from "./grades";

export default combineReducers({
  modals,
  grades,
  students
});
