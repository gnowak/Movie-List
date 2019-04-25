import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import _ from 'lodash';
import { composeWithDevTools } from 'redux-devtools-extension';
import { saveState, loadState } from './localstorage';


const initialState = {};
const persistedState = loadState();
const middleware = [thunk];

const store = createStore(rootReducer, persistedState, composeWithDevTools(applyMiddleware(...middleware)));
store.subscribe(_.throttle( () => (
    saveState({
      movies: store.getState().movies
    })
  ), 1000));

export default store;
