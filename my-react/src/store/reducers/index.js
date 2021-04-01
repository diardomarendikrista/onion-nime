import { combineReducers } from 'redux';
import animeReducer from './animeReducer';
import favouriteReducer from './favouriteReducer';
import pageReducer from './pageReducer';

const reducer = combineReducers({
  anime: animeReducer,
  favourite: favouriteReducer,
  page: pageReducer
})

export default reducer;