import {combineReducers} from 'redux';
import authReducer from './authReducer';
import shopIdReducer from './shopIdReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  // shopIdRoot: shopIdReducer,
});

export default rootReducer;
