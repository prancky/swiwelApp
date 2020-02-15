import {combineReducers} from 'redux';
import news from './news';
import authReducer from './auth';
export default combineReducers({
  news: news,
  auth: authReducer,
});
