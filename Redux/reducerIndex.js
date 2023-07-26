import {combineReducers} from 'redux';
import userProfileReducer from './Reducers/userProfile/userProfileReducer';
import menuOpenStatus from './Reducers/userProfile/menuOpenReducer';
import apiRespReducer from './Reducers/userProfile/apiRespReducer';
import qrScanRespReducer from './Reducers/userProfile/QrScanResultReducer';

const rootReducer = combineReducers({
  userProfile: userProfileReducer,
  menu: menuOpenStatus,
  apiRes: apiRespReducer,
  qrScan: qrScanRespReducer,
});

export default rootReducer;
