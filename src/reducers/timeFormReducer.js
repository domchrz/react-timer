const timeFormReducer = (state, action) => {
  switch (action.type) {
    case 'SET_HOURS':
      return { ...state, hours: action.payload };
    case 'SET_MINUTES':
      return { ...state, minutes: action.payload };
    case 'SET_SECONDS':
      return { ...state, seconds: action.payload };
    case 'RESET_VALUES': {
      return { hours: 0, minutes: 0, seconds: 0 };
    }
    default:
      return state;
  }
};

export default timeFormReducer;
