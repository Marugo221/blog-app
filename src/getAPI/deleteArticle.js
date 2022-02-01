import { store } from "../reducer/store";

const myHeaders = new Headers();
const state = store.getState();
const token = state.user.token;

myHeaders.append("Authorization", `Token ${token}`);
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Access-Control-Allow-Origin", "*");

export const deleteArticle = async (slug) => {
  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    console.log("delete!");
    let response = await fetch(
      `https://api.realworld.io/api/articles/${slug}`,
      requestOptions
    );
    if (response.status !== 204) {
      return response;
    }
    console.log(1, response);
    return response.status;
  } catch (err) {
    console.log("error", err);
    return err;
  }
};
