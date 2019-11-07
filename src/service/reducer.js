import actionType from "./actionType";

const initialState = {
  addUserSucc: false,
  addUserInfo: [],
  editUserSucc: false
};
const reducer = (state = initialState, action) => {
  console.log("action", action)
  switch (action.type) {
    case actionType.GETDATA_SUCCESS:
      return {
        ...state,
        addUserInfo: action.payLoad,
        addUserSucc: true
      };
      // case actionType.ADDUSER_SUCCESS:
      // return {
      //   ...state,
      //   addUserInfo: action.payLoad,
      //   addUserSucc: true
      // };
    case actionType.EDITUSER_SUCCESS:
      return {
        ...state,
        addUserInfo: action.payLoad,
        editUserSucc: true
      };
    default:
      return state;
  }
};

export default reducer;
