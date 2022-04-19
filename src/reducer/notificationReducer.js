export const actions = {
  ADD_NOTIFICATION: "ADD_NOTIFICATION",
  REMOVE_NOTIFICATION: "REMOVE_NOTIFICATION",
};

//Reducer to Handle Actions
const reducer = (state, action) => {
  switch (action.type) {
    case actions.ADD_NOTIFICATION:
      return [...state, { ...action.payload }];
    case actions.REMOVE_NOTIFICATION:
      return state.filter((el) => el.id !== action.id);
    default:
      return state;
  }
};

export default reducer;
