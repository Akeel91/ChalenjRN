const initialState = {
  callNext: false,
};

const callNextActionByPopUp = (state = initialState, action) => {
  console.log('Clicked menu ' + action.type + ' ' + action.payload);
  switch (action.type) {
    case 'clickedYes':
      return {
        ...state,
        callNext: action.payload,
      };
    default:
      return {
        state,
      };
  }
};

export default callNextActionByPopUp;
