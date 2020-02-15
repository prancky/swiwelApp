// Initial State
const initialState = {
  loggedIn: false,
  email: null,
  firstName: null,
  password: null,
};

// Reducers (Modifies The State And Returns A New State)
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGN_UP_USER': {
      return {
        ...state,
        signedUpUser: action.payload,
      };
    }
    case 'AUTHENTICATED_USER': {
      return {
        ...state,
        signedUpUser: {...state.signedUpUser, loggedIn: action.payload},
      };
    }

    default: {
      return state;
    }
  }
};

export default authReducer;
