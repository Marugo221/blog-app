/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from "react";

import cn from "classnames";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as kit from "../../tools/tools";
import { Link, useNavigate } from "react-router-dom";

import { FormInput } from "../Forms/FormInput";
import { authUser } from "../../getAPI/authUser";
import {
  setArticlesAsync,
  setArticlesTotalAsync,
  setUser,
} from "../../action/action";
import { Alert } from "antd";
import Loader from "../Loader";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const SignIn = () => {
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goHome = () => navigate("/");

  kit.setPageTitle(`Sign-Up Form`);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  function onSubmit(data) {
    const { email, password } = data;
    setLoader(true);
    authUser(email, password).then((res) => {
      if (res.hasOwnProperty("user")) {
        const { username, email, token, bio, image } = res.user;
        dispatch(setUser({ username, email, token, bio, image }));
        dispatch(setArticlesTotalAsync());
        dispatch(setArticlesAsync());
        goHome();
      }
      if (res.hasOwnProperty("errors")) {
        setLoader(false);
        setError(res.errors);
      }
    });
  }

  const errorList = [];
  if (error) {
    for (const elem in error) {
      console.log(elem);
      errorList.push(
        <Alert
          key={elem}
          style={{ marginTop: 20 }}
          message={elem}
          description={error[elem]}
          type="error"
          showIcon
          closable
        />
      );
    }
  }

  return (
    <section className={cn("form")}>
      {
        <>
          <h2 className={cn("form__title")}>Sign In</h2>
          {errorList}
          <form className={cn("form__body")} onSubmit={handleSubmit(onSubmit)}>
            <ul className={cn("form__field-list", "nolist")}>
              <FormInput
                id={"email"}
                title={"Email"}
                error={errors.email}
                reg={register("email")}
              />
              <FormInput
                id={"password"}
                title={"Password"}
                error={errors.password}
                reg={register("password")}
              />
              <li className={cn("form__field")}>
                {loader && <Loader />}
                <button type="submit" className={cn("btn_submit")}>
                  Create
                </button>
                <span className={cn("note_foot")}>
                  Already have an account? <Link to="/signup">Sign Up</Link>.
                </span>
              </li>
            </ul>
          </form>
        </>
      }
    </section>
  );
};

export default SignIn;
