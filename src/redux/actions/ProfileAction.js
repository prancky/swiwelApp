export const signUpUser = para => async dispatch => {
  dispatch({
    type: 'SIGN_UP_USER',
    payload: para,
  });
};

export const signInUser = para => async dispatch => {
  dispatch({
    type: 'AUTHENTICATED_USER',
    payload: para,
  });
};
