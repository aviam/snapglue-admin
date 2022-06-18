import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { UserActions } from 'app/actions/user';
import { UserModel } from 'app/models';

const initialState: RootState.UserState =
  {
    email: '',
    idToken: '',
    displayName: '',
  };

export const userReducer = handleActions<RootState.UserState, UserModel>(
  {
    [UserActions.Type.SET_USER]: (state, action) => {
      if (action.payload && action.payload.email) {
        return Object.assign({}, state, action.payload);
      } else {
        return state;
      }
    },
  },
  initialState
);
