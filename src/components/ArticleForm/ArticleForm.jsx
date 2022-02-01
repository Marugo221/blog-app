import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TagsList from "./TagsList/TagsList";
import { FormTextArea } from "../Forms/FormTextArea";
import { FormInput } from "../Forms/FormInput";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

import cn from "classnames";
import * as kit from "../../tools/tools";
import {
  setArticlesAsync,
  setArticlesTotalAsync,
  setEditArticleBody,
} from "../../action/action";
import { createArticle } from "../../getAPI/createArticle";
import { updateArticleAction } from "../../actionAPI/articleAction";
import { updateArticle } from "../../getAPI/updateArticle";
import { Button, Result } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Loader";

const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  body: yup.string().required(),
});

const ArticleForm = ({ slug = "", article = "" }) => {
  const [statusCode, setStatusCode] = useState(1);
  const [urlSlug, setUrlSlug] = useState(slug);
  const [loader, setLoader] = useState(false);
  const tagsList = useSelector((state) => state.editArticle.tagList);
  const isLogged = useSelector((state) => state.user.isLogged);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const goHome = () => navigate("/");
  const goArticles = () => navigate(`/article/${urlSlug}`);

  const titleDef = article.title || "";
  const descriptionDef = article.description || "";
  const textDef = article.body || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  function onSubmit(data) {
    setLoader(true);
    dispatch(setEditArticleBody(data));

    // чистим и фильтруем лист тегов перед отправкой
    data.tagList = tagsList.reduce((acc, elem) => {
      if (elem.tag !== "") acc.push(elem.tag);
      return acc;
    }, []);

    //Отправляем данные
    if (slug) {
      const newArticle = {
        ...article,
        ...data,
      };
      updateArticle(slug, data).then((res) => {
        if (res.hasOwnProperty("article")) {
          dispatch(updateArticleAction(slug, newArticle));
          setStatusCode(200);
          setUrlSlug(slug);
          setLoader(false);
        }
      });
    }
    if (!slug) {
      createArticle(data).then((res) => {
        console.log(res);
        if (res.hasOwnProperty("article")) {
          dispatch(setArticlesTotalAsync());
          dispatch(setArticlesAsync());
          setStatusCode(200);
          setUrlSlug(res.article.slug);
          setLoader(false);
        } else {
          setLoader(false);
          setStatusCode(res);
        }
      });
    }
  }

  kit.setPageTitle(`Title`);

  return (
    <section className={cn("form", "form_article")}>
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
          title="Server is temporarily unavailable"
          subTitle="Sorry, please try again later."
          extra={
            <Button type="primary" onClick={goHome}>
              Back Home
            </Button>
          }
        />
      )}

      {isLogged && statusCode >= 200 && statusCode <= 300 && (
        <Result
          status="success"
          title="Article successfully created!"
          subTitle=""
          extra={[
            <Button type="primary" key="console" onClick={goArticles}>
              Go to created article
            </Button>,
            <Link to="/">Go Articles</Link>,
          ]}
        />
      )}

      {isLogged && statusCode < 100 && (
        <>
          <h2 className={cn("form__title")}>
            {slug ? "Edit Article" : "Create Article"}
          </h2>
          <form className={cn("form__body")} onSubmit={handleSubmit(onSubmit)}>
            <ul className={cn("form__field-list", "nolist")}>
              <FormInput
                id={"title"}
                value={titleDef}
                title={"Title"}
                error={errors.title}
                reg={register("title", { required: "Value required" })}
              />
              <FormInput
                id={"description"}
                value={descriptionDef}
                title={"Description"}
                error={errors.description}
                reg={register("description", { required: "Value required" })}
              />
              <FormTextArea
                id={"body"}
                value={textDef}
                title={"Text"}
                error={errors.body}
                reg={register("body", { required: "Value required" })}
              />
              <li className={cn("form__field")}>
                <label className={cn("label")} htmlFor="tag-index_0">
                  Tags
                </label>
                <ul className={cn("tags-list", "nolist")}>
                  <TagsList tags={tagsList} />
                </ul>
              </li>

              <li className={cn("form__field")}>
                {loader && <Loader />}
                <button type="submit" className={cn("btn_submit")}>
                  {slug ? "Edit" : "Create"}
                </button>
              </li>
            </ul>
          </form>
        </>
      )}
    </section>
  );
};

export default ArticleForm;
