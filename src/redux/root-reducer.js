import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import ForumReducer from './forum/forum.reducer';
import UserReducer from './user/user.reducer';
import MessageReducer from './message/message.reducers';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['forum']
};

const rootReducer = combineReducers({
  forum: ForumReducer,
  user: UserReducer,
  message: MessageReducer
});

export default persistReducer(persistConfig, rootReducer);
