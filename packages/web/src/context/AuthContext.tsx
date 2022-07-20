import createDataContext from './createDataContext';

const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'signout':
      return { token: null, role: null };
    case 'signin':
      return {
        token: action.payload.token,
        role: action.payload.role,
      };
    default:
      return state;
  }
};

const signin = (dispatch: any) => {
  return ({ token, role }: { token: string; role: string }) => {
    localStorage.setItem('token', token);
    dispatch({
      type: 'signin',
      payload: {
        token,
        role,
      },
    });
  };
};

const signout = (dispatch: any) => {
  return () => {
    localStorage.removeItem('token');
    dispatch({ type: 'signout' });
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout },
  { token: null, role: null }
);
