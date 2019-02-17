import { HIDE_MODAL, SHOW_MODAL } from "../constants/actionTypes";

export const showModal = (id, modalProps) => {
  return dispatch => {
    dispatch({
      type: SHOW_MODAL,
      id,
      modalProps
    });
  };
};

export const hideModal = (id) => {
  return dispatch => {
    dispatch({
      type: HIDE_MODAL,
      id
    });
  };
};
