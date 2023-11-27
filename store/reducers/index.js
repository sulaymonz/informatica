import { combineReducers } from 'redux';
import exercise from './exerciseReducer';

const rootReducer = combineReducers({
  exercise,
});

export default rootReducer;
