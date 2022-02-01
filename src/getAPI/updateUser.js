import { store } from "../reducer/store";

const myHeaders = new Headers();
const state = store.getState();
const token = state.user.token;

myHeaders.append("Authorization", `Token ${token}`);
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Access-Control-Allow-Origin", "*");

export const updateUser = async (username, email, bio, image) => {
  const raw = JSON.stringify({
    user: {
      username: username,
      email: email,
      bio: bio,
      image: image,
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
      "https://api.realworld.io/api/user",
      requestOptions
    );
    console.log(response);
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
