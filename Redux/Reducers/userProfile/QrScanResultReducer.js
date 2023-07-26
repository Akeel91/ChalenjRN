const initialState = {
  qrScanResponse: '',
};

const qrScanRespReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'qrScanResponse':
      return {
        ...state,
        qrScanResponse: action.payload,
      };
    default:
      return {
        state,
      };
  }
};

export default qrScanRespReducer;
