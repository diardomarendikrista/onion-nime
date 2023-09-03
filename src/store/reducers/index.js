import { combineReducers } from 'redux';
import animeReducer from './animeReducer';
import favouriteReducer from './favouriteReducer';

const reducer = combineReducers({
  anime: animeReducer,
  favourite: favouriteReducer
})

export default reducer;