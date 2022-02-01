/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Like from "../Like";
import { Link } from "react-router-dom";
import TagList from "../TagList";

import { format } from "date-fns";
import cn from "classnames";
import avatar from "../../assets/user-avatar.png";

import { likeArticle } from "../../getAPI/likeArticle";
import { updateArticleAction } from "../../actionAPI/articleAction";
import { useDispatch, useSelector } from "react-redux";

const ArticlePrev = ({ article }) => {
  let {
    slug,
    body,
    title,
    tagList,
    author,
    createdAt,
    favorited,
    favoritesCount,
  } = article;
  const { username } = author;

  const [statusCode, setStatusCode] = useState(1);
  const [like, setLike] = useState(favorited);
  const [likeCount, setLikeCount] = useState(favoritesCount);

  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.user.isLogged);

  // обновляем лайки
  // в зависимости от ответа обновляем статью и лайки
  // либо статус код и сообщаем пользователю
  const updateLike = () => {
    if (isLogged) {
      setStatusCode(50);
      likeArticle(slug, !like).then((res) => {
        if (res.hasOwnProperty("article")) {
          setLike(!like);
          dispatch(updateArticleAction(slug, res.article));
          setLike(res.article.favorited);
          setLikeCount(res.article.favoritesCount);
          setStatusCode(1);
        } else {
          setStatusCode(res.status);
        }
      });
    }
  };

  return (
    <header className={cn("article__head")}>
      <div className={cn("article__info")}>
        <h2>
          <Link to={`article/${slug}`} className={cn("article__title")}>
            {title}{" "}
          </Link>
          <div className={cn("like")}>
            <Like
              checked={like}
              callback={updateLike}
              likes={likeCount}
              status={statusCode}
            />
          </div>
        </h2>
        <TagList tags={tagList} />
        <p className={cn("article__excerpt")}>{body}</p>
      </div>
      <aside className={cn("pub-info")}>
        <a className={cn("author")} title="Author">
          <span>
            {username}
            <time className={cn("pub-date")}>
              {format(new Date(createdAt), "MMMM d, yyyy")}
            </time>
          </span>
          <img src={avatar} alt="Avatar" className={cn("avatar")} />
        </a>
      </aside>
    </header>
  );
};

export default ArticlePrev;
