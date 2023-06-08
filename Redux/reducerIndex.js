import {combineReducers} from 'redux';
import userProfileReducer from './Reducers/userProfile/userProfileReducer';
import menuOpenStatus from './Reducers/userProfile/menuOpenReducer';

const rootReducer = combineReducers({
  userProfile: userProfileReducer,
  menu: menuOpenStatus,
});

export default rootReducer;
