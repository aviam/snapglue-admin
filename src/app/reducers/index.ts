import { combineReducers } from 'redux';
import { RootState } from './state';
import { todoReducer } from './todos';
import { userReducer } from './user';
// import User from '../entities/User';
import { routerReducer, RouterState } from 'react-router-redux';

export { RootState, RouterState };

// NOTE: current type definition of Reducer in 'react-router-redux' and 'redux-actions' module
// doesn't go well with redux@4
export const rootReducer = combineReducers<RootState>({
  user: userReducer as any,
  todos: todoReducer as any,
  router: routerReducer as any
});
