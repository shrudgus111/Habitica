// reducers/user.js
const initialState = {
    isAuthenticated: false,
    // 다른 초기 상태들
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          isAuthenticated: true,
        };
      case 'LOGOUT_SUCCESS':
        return {
          ...state,
          isAuthenticated: false,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;