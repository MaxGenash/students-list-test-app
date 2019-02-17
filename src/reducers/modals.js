import { HIDE_MODAL, SHOW_MODAL } from "../constants/actionTypes";

const initialState = {
  activeModal: null,
  modalProps: {}
};

export default (state = initialState, action) => {
  if (action.type === SHOW_MODAL) {
    return {
      ...state,
      activeModal: action.id,
      modalProps: action.modalProps
    };
  }
  if (action.type === HIDE_MODAL && state.activeModal === action.id) {
    return {
      ...state,
      activeModal: null,
      modalProps: {}
    };
  }
  return state;
}
