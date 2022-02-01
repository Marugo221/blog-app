
const defaultState = {
  username: null,
  email: null,
  token: null,
  bio: null,
  image: null,
  isLogged: false,
};

export const userReduсer = (state = defaultState, action ) => {
    switch (action.type) {
      case 'SET_USER':
        return {
          ...state,
          ...action.payload,
          isLogged: true
        }
      case 'LOG_OUT':
        return {
          ...state,
          username: null,
          email: null,
          token: null,
          bio: null,
          image: null,
          isLogged: false
        }
      default:
        return state
    }
}
