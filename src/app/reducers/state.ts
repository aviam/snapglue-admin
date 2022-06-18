import { TodoModel } from 'app/models';
import { UserModel } from 'app/models';
import { RouterState } from 'react-router-redux';

export interface RootState {
  todos: RootState.TodoState;
  user: RootState.UserState;
  router: RouterState;
}

export namespace RootState {
  export type TodoState = TodoModel[];
  export type UserState = UserModel;
}
