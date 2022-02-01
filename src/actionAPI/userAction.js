import {authUser} from "../postmanAPI/authUser"
import {setUser, } from "../action/action";
// import {updateUser} from "../postmanAPI/updateUser";

export const registerUserAsyncPostman = (username, email, password) => {
  return (dispatch) => {
    // registerUser(username, email, password).then((res)=>{
    //   console.log(res)
    //
    //   if (res.hasOwnProperty('user')) {
    //     const {username, email, token, bio, image} = res.user
    //     dispatch(setUser({username, email, token, bio, image}))
    //   }
    //   if (res.hasOwnProperty('error')) {
    //     console.log(res.error)
    //   }
    // })
  }
}

export const authUserAsyncPostman = (email, password) => {
  return (dispatch) => {
    // authUser(email, password).then((res)=>{
    //   if (res.hasOwnProperty('user')) {
    //     const {username, email, token, bio, image} = res.user
    //     dispatch(setUser({username, email, token, bio, image}))
    //   }
    //   if (res.hasOwnProperty('error')) {
    //     console.log(res.error)
    //   }
    // })
  }
}

export const updateUserAsyncPostman = (username, email, bio = '', image = '') => {
  return (dispatch) => {
    // updateUser(username, email, bio, image).then((res)=>{
    //   console.log(res)
    //   if (res.hasOwnProperty('user')) {
    //     const {username, email, token, bio, image} = res.user
    //     dispatch(setUser({username, email, token, bio, image}))
    //   }
    //   if (res.hasOwnProperty('error')) {
    //     console.log(res.error)
    //   }
    // })
  }
}
