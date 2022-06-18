import { createAction } from 'redux-actions';
import { UserModel } from 'app/models';
// import User from '../entities/User';

export namespace UserActions {
  export enum Type {
    SET_USER = 'SET_USER'
  }

  export const setUser = createAction<PartialPick<UserModel, any>>(Type.SET_USER);
}

export type UserActions = Omit<typeof UserActions, 'Type'>;
