import { combineReducers, createStore} from 'redux';
import globalData from './reducer';
// import 

const rootReducer = combineReducers({
    globalData,
    // currentUser
  });
  const store = createStore(
    rootReducer,
    // compose(
    //   applyMiddleware(thunk),
    //   window.devToolsExtension ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    // )
  );


  export default store;