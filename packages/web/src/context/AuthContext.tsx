import createDataContext from './createDataContext';

interface IAction {
  type: string;
  payload: any;
}

const authReducer = (state: any, action: IAction) => {
  switch (action.type) {
    case 'signOut':
      return { token: null };
    case 'signIn':
      return {
        token: action.payload.token,
      };
    default:
      return state;
  }
};

const signin = (dispatch: Function) => {
  return ({ token }: { token: string }) => {
    localStorage.setItem('token', token);
    dispatch({
      type: 'signIn',
      payload: {
        token,
      },
    });
  };
};

const signout = (dispatch: Function) => {
  return () => {
    localStorage.removeItem('token');
    dispatch({ type: 'signOut' });
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout },
  { token: null, role: null }
);
