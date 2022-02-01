/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";

import { format } from "date-fns";
import cn from "classnames";
import avatar from "../../assets/user-avatar.png";

import { getArticle } from "../../getAPI/getArticle";
import { likeArticle } from "../../getAPI/likeArticle";
import { deleteArticle } from "../../getAPI/deleteArticle";
import { updateArticleAction } from "../../actionAPI/articleAction";
import { setArticlesAsync, setArticlesTotalAsync } from "../../action/action";

import { Button, Result } from "antd";
import TagList from "../TagList";
import Like from "../Like";
import Loader from "../Loader";

const ArticleView = () => {
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteArt, setDeleteArt] = useState(false);
  const [statusCode, setStatusCode] = useState(1);
  const [editAccess, setEditAccess] = useState(false);
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(false);

  const navigate = useNavigate();
  const goHome = () => navigate("/");

  const isLogged = useSelector((state) => state.user.isLogged);
  const loggedUsername = useSelector((state) => state.user.username);
  const { slug } = useParams();
  const dispatch = useDispatch();

  // загружаем полную статью с сервера
  useEffect(() => {
    getArticle(slug).then((body) => {
      setArticle(body.article);
      setLoading(false);
      if (body.article.author.username === loggedUsername) {
        setEditAccess(true);
      }
    });
  }, [slug]);

  // проверяем зарегестрирован ли пользователь для доступа к лайкам
  useEffect(() => {
    if (isLogged) {
      setLike(article.favorited);
    }
    setLikeCount(article.favoritesCount);
  }, [article, isLogged]);

  //удаление статьи
  // при удачном удалении, синхронизируем статьи из сервера и стора
  const formDeleteArticle = (slug) => {
    deleteArticle(slug).then((res) => {
      console.log(res);
      setStatusCode(res);
      dispatch(setArticlesTotalAsync());
      dispatch(setArticlesAsync());
    });
  };

  // функция обновления лайков
  // обновляет статусКоды и отправляет обновленную статью в стор
  const updateLike = () => {
    if (isLogged) {
      setStatusCode(50);
      likeArticle(slug, !like).then((res) => {
        if (res.hasOwnProperty("article")) {
          setLike(!like);
          dispatch(updateArticleAction(res.article));
          setLike(res.article.favorited);
          setLikeCount(res.article.favoritesCount);
          setStatusCode(1);
        } else {
          setStatusCode(res.status);
        }
      });
    }
  };

  // Кнопки подтверждения статью, при удалении
  // показваем их, если пользователь авторизован
  const elemControls = isLogged ? (
    <div className={cn("edit-links")}>
      <button
        onClick={() => setDeleteArt(true)}
        className={cn(
          "link",
          "link_delete-article",
          !editAccess && "disabled-link"
        )}
        disabled={!editAccess}
      >
        Delete
      </button>
      <Link
        to={`/article/${slug}/edit`}
        className={cn(
          "link",
          "link_edit-article",
          !editAccess && "disabled-link"
        )}
      >
        Edit
      </Link>
      {deleteArt && (
        <div className={cn("delete-confirm")}>
          <span>Are you sure to delete this article?</span>
          <button
            type="button"
            onClick={() => setDeleteArt(false)}
            className={cn("btn")}
          >
            No
          </button>
          <button
            type="button"
            onClick={() => formDeleteArticle(slug)}
            className={cn("btn", "btn_primary")}
          >
            Yes
          </button>
        </div>
      )}
    </div>
  ) : null;

  // сообщения о статусе серверных операций
  const result204 = (
    <Result
      status="Success"
      title=""
      extra={[
        <Button type="primary" key="console" onClick={goHome}>
          Go Articles
        </Button>,
      ]}
    />
  );

  const result500 = (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={
        <Button type="primary" onClick={goHome}>
          Back Home
        </Button>
      }
    />
  );

  const result403 = (
    <Result
      status="403"
      title="Access closed"
      subTitle="Sorry, you are not authorized to perform this operation.."
      extra={
        <Button type="primary" onClick={goHome}>
          Back Home
        </Button>
      }
    />
  );

  // главное тело статьи
  const elemArticle = !loading ? (
    <>
      <header className={cn("article__head")}>
        <div className={cn("article__info")}>
          <h2>
            <a className={cn("article__title")}>{article.title}</a>
            <div className={cn("like")}>
              <Like
                checked={like}
                callback={updateLike}
                likes={likeCount}
                status={statusCode}
              />
            </div>
          </h2>
          <TagList tags={article.tagList} />
          <p className={cn("article__excerpt")}>{article.description}</p>
        </div>
        <aside className={cn("pub-info")}>
          <a className={cn("author")} title="Author">
            <span>
              {article.author.username}
              <span className={cn("pub-date")}>
                {format(new Date(article.createdAt), "MMMM d, yyyy")}
              </span>
            </span>
            <img src={avatar} alt="Avatar" className={cn("avatar")} />
          </a>
          {elemControls}
        </aside>
      </header>

      <main className={cn("article__markdown")}>
        <ReactMarkdown>{article.body}</ReactMarkdown>
      </main>
    </>
  ) : null;

  return (
    <section className={cn("page")}>
      {!loading ? (
        <article className={cn("article_full")}>
          {statusCode >= 500 && result500}
          {statusCode === 403 && result403}
          {statusCode >= 200 && statusCode <= 300 && result204}
          {statusCode < 100 && elemArticle}
        </article>
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default ArticleView;
