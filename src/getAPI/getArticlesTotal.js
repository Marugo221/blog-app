import {store} from "../reducer/store";

const myHeaders = new Headers();
const state = store.getState()
const token = state.user.token

if (token) {
  myHeaders.append("Authorization", `Token ${token}`)
}

export const getArticlesTotal = async () => {
  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  try {
    let response = await fetch(`https://api.realworld.io/api/articles`, requestOptions)
    response =  response.json()
    return response
  }catch (err) {
    console.log('error', err)
  }
}

