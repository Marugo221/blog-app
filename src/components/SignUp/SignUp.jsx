/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import cn from "classnames";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as tools from "../../tools/tools";
import { useDispatch } from "react-redux";
import { FormInput } from "../Forms/FormInput";
import { registerUser } from "../../getAPI/registerUser";
import {
  setArticlesAsync,
  setArticlesTotalAsync,
  setUser,
} from "../../action/action";
import { Alert } from "antd";
import Loader from "../Loader";

const schema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Max 20 characters long for Username")
    .required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).max(40).required(),
  repeatPassword: yup.string().oneOf([yup.ref("password"), null], "Must match"),
  agreement: yup.boolean().oneOf([true], "Must check"),
});

const SignUp = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [agreement, setAgreement] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const goHome = () => navigate("/");

  const onSubmit = (data) => {
    const { username, email, password } = data;
    setLoader(true);
    registerUser(username, email, password).then((res) => {
      console.log(res);
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
  };

  const toggleAgreement = () => {
    setAgreement(!agreement);
  };

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  tools.setPageTitle(`Sign-Up`);

  return (
    <section className={cn("form")}>
      {
        <>
          <h2 className={cn("form__title")}>Create new account</h2>
          {errorList}
          <form className={cn("form__body")} onSubmit={handleSubmit(onSubmit)}>
            <ul className={cn("form__field-list", "nolist")}>
              <FormInput
                id={"username"}
                title={"Username"}
                error={errors.username}
                reg={register("username")}
              />
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
              <FormInput
                id={"repeatPassword"}
                title={"Repeat Password"}
                error={errors.repeatPassword}
                reg={register("repeatPassword")}
              />
              <li className={cn("form__field", "h-rule")}>
                <label
                  className={cn("label", "with-check")}
                  htmlFor="agreement"
                >
                  <input
                    type="checkbox"
                    id="agreement"
                    {...register("agreement", { required: true })}
                    onClick={toggleAgreement}
                    className={cn("control_checkbox")}
                  />
                  I agree to the processing of my personal information
                </label>
              </li>
              <li className={cn("form__field")}>
                {loader && <Loader />}

                <button
                  type="submit"
                  className={cn("btn_submit")}
                  disabled={!agreement}
                >
                  Create
                </button>
                <span className={cn("note_foot")}>
                  Already have an account? <Link to="/signin">Sign In</Link>.
                </span>
              </li>
            </ul>
          </form>
        </>
      }
    </section>
  );
};

export default SignUp;
