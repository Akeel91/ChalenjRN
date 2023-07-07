const initialState = {
  apiResponse: [],
};

const apiRespReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'apiResponse':
      return {
        ...state,
        apiResponse: action.payload,
      };
    default:
      return {
        state,
      };
  }
};

export default apiRespReducer;
