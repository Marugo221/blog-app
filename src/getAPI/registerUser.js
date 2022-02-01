const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Access-Control-Allow-Origin", "*");

export const registerUser = async (username, email, password) => {
  const raw = JSON.stringify({
    user: {
      username: username,
      email: email,
      password: password,
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
      "https://api.realworld.io/api/users",
      requestOptions
    );
    response = response.json();
    return response;
  } catch (err) {
    console.log("error", err);
  }
};
