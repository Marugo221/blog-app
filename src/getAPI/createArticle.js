import { store } from "../reducer/store";

const myHeaders = new Headers();
const state = store.getState();
const token = state.user.token;

myHeaders.append("Authorization", `Token ${token}`);
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Access-Control-Allow-Origin", "*");

export const createArticle = async (article) => {
  const { title, description, body, tagList } = article;

  const raw = JSON.stringify({
    article: {
      title: title,
      description: description,
      body: body,
      tagList: tagList,
    },
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    let response = await fetch(
      "https://api.realworld.io/api/articles",
      requestOptions
    );
    console.log(1, response);
    if (response.status !== 200) {
      return response.status;
    }
    response = response.json();
    console.log(2, response);
    return response;
  } catch (err) {
    console.log("error", err);
    return err;
  }
};
