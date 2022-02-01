import { store } from "../reducer/store";

const myHeaders = new Headers();
const state = store.getState();
const token = state.user.token;

myHeaders.append("Authorization", `Token ${token}`);
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Access-Control-Allow-Origin", "*");

export const updateArticle = async (slug, article) => {
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
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    let response = await fetch(
      `https://api.realworld.io/api/articles/${slug}`,
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
