import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
const persistConfig = {
  key: 'root',
  storage,
};

//
// Initial State...
//

const initialState = {
  languages: '1',
  next_languages: '1',
};

//
// Reducer...
//

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'setLanguage':
      return {...state, languages: action.value};
    case 'setNextLanguage':
      return {...state, next_languages: action.value};

    default:
      return state;
  }
};

//
// Store...
//

// const store = createStore(reducer, applyMiddleware(thunkMiddleware));
// export { store };

const persistedReducer = persistReducer(persistConfig, reducer);

let store = createStore(persistedReducer, applyMiddleware(thunk));
let persistor = persistStore(store);

export {store, persistor};

/*
const setLanguage = (languages) => {
  return {
    type: "setLanguage",
    value: languages
  };
};
*/
const setLanguage = languages => {
  return dispatch => {
    // for apply style quiqly
    dispatch({
      type: 'setNextLanguage',
      value: languages,
    });

    setTimeout(() => {
      dispatch({
        type: 'setLanguage',
        value: languages,
      });
    }, 1000);
  };
};

export {setLanguage};
