const initialState = {
  openStaus: false,
};

const menuOpenStatus = (state = initialState, action) => {
  console.log('Clicked menu ' + action.type + ' ' + action.payload);
  switch (action.type) {
    case 'clicked':
      return {
        state,
        openStaus: action.payload,
      };
    default:
      return {
        state,
      };
  }
};

export default menuOpenStatus;
