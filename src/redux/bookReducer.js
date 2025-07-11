const initialState = {
  loading: true,
  error: null,
  data: null,
};

function bookReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCHING_BOOKS":
      return { ...state, loading: true, error: null };

    case "FETCHED_BOOKS":
      return { ...state, loading: false, data: action.payload, error: null };

    case "FETCHING_BOOKS_ERROR":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}

export default bookReducer;
