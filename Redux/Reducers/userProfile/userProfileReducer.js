const initialState = {
  profileImgPath: null,
};

const userProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'profilePicUpdate':
      return {
        ...state,
        profileImgPath: action.payload,
      };
    default:
      return {
        state,
      };
  }
};

export default userProfileReducer;
