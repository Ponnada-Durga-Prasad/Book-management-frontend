const initialState = {
  isAuth: false,
  user: null,
  loading: true,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return { ...state, loading: true, error: null };
    case "LOGIN_SUCCESS":
      return { ...state, loading: false, user: action.payload, isAuth: true };
    case "LOGIN_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "LOGOUT":
      return {
        ...state,
        isAuth: false,
        user: null,
        loading: false,
        error: null,
      };
    case "NO_AUTH":
      return { ...state, loading: false, error: null, isAuth: false };
    default:
      return state;
  }
};

export default authReducer;
