import {createStore} from 'redux';

import rootReducer from './reducerIndex';

const store = createStore(rootReducer);

export {store};
