import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import ForumReducer from './forum/forum.reducer';
import UserReducer from './user/user.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['forum']
};

const rootReducer = combineReducers({
  forum: ForumReducer,
  user: UserReducer
});

export default persistReducer(persistConfig, rootReducer);
