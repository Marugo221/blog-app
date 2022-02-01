import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import cn from "classnames";

import * as tools from "../../tools/tools";
import { FormInput } from "../Forms/FormInput";
import { FormTextArea } from "../Forms/FormTextArea";
import { Button, Result } from "antd";
import { updateUser } from "../../getAPI/updateUser";
import { setUser } from "../../action/action";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";

const schema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  bio: yup.string(),
  image: yup.string().url(),
});

const Profile = () => {
  const { username, email, bio, image, isLogged } = useSelector(
    (state) => state.user
  );
  const [statusCode, setStatusCode] = useState(1);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goHome = () => navigate("/");

  tools.setPageTitle(`Edit user profile Form`);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  function onSubmit(data) {
    const { username, email, bio, image } = data;
    setLoader(true);
    updateUser(username, email, bio, image).then((res) => {
      if (res.hasOwnProperty("user")) {
        const { username, email, token, bio, image } = res.user;
        dispatch(setUser({ username, email, token, bio, image }));
        setStatusCode(200);
      } else {
        setLoader(false);
        setStatusCode(res.status);
      }
    });
  }

  return (
    <section className={cn("form")}>
      {!isLogged && (
        <Result
          status="403"
          title="Not authorized"
          subTitle="Sorry, you are not authorized to access this page."
          extra={
            <Button type="primary" onClick={goHome}>
              Back Home
            </Button>
          }
        />
      )}

      {isLogged && statusCode >= 500 && (
        <Result
          status="500"
          title="Server is not available"
          subTitle="Sorry, try to do the operation a little later."
          extra={
            <Button type="primary" onClick={goHome}>
              Back Home
            </Button>
          }
        />
      )}

      {isLogged && statusCode === 200 && (
        <Result
          status="success"
          title="Profile updated successfully!"
          subTitle=""
          extra={[
            <Button type="primary" key="console" onClick={goHome}>
              Go Page Articles
            </Button>,
            <Button key="buy" onClick={() => setStatusCode(1)}>
              Refresh
            </Button>,
          ]}
        />
      )}
      {isLogged && statusCode < 100 && (
        <>
          <h2 className={cn("form__title")}>Edit Profile</h2>
          <form className={cn("form__body")} onSubmit={handleSubmit(onSubmit)}>
            <ul className={cn("form__field-list", "nolist")}>
              <FormInput
                id={"username"}
                title={"Username"}
                error={errors.username}
                value={username}
                reg={register("username")}
              />
              <FormInput
                id={"email"}
                title={"Email"}
                error={errors.email}
                value={email}
                reg={register("email")}
              />
              <FormTextArea
                id={"bio"}
                title={"Bio"}
                error={errors.bio}
                value={bio}
                reg={register("bio")}
              />
              <FormInput
                id={"image"}
                title={"Avatar (url)"}
                error={errors.image}
                value={image}
                reg={register("image")}
              />
              <li className={cn("form__field")}>
                {loader && <Loader />}
                <button type="submit" className={cn("btn_submit")}>
                  Save
                </button>
              </li>
            </ul>
          </form>
        </>
      )}
    </section>
  );
};

export default Profile;
