import { store } from "../reducer/store";

const myHeaders = new Headers();
const state = store.getState();
const token = state.user.token;

myHeaders.append("Authorization", `Token ${token}`);
myHeaders.append("Access-Control-Allow-Origin", "*");

export const likeArticle = async (slug, like) => {
  const method = like ? "POST" : "DELETE";

  const requestOptions = {
    method: method,
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    let response = await fetch(
      `https://api.realworld.io/api/articles/${slug}/favorite`,
      requestOptions
    );
    if (response.status !== 200) {
      return response;
    }
    response = response.json();
    return response;
  } catch (err) {
    console.log("error", err);
    return err;
  }
};
