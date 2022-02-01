import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Pagination } from "antd";
import cn from "classnames";
import ArticlePrev from "../ArticlePrev";

import { setArticlesAsync, setPageNum } from "../../action/action";

const ArticleList = () => {
  const pageNum = useSelector((state) => state.articles.pageNum);
  let articles = useSelector((state) => state.articles.articles);
  const articlesTotal = useSelector((state) => state.articles.articlesTotal);
  const dispatch = useDispatch();
  let articlesList = null;

  // пагинация статей
  const elemPager = (
    <Pagination
      onChange={(num) => {
        dispatch(setArticlesAsync(num));
        dispatch(setPageNum(num));
      }}
      defaultCurrent={pageNum}
      defaultPageSize={2}
      showTitle={false}
      showSizeChanger={false}
      total={articlesTotal}
    />
  );

  // рендерим статьи из массива
  if (articles) {
    articlesList = articles.map((article) => {
      return (
        <li key={article.slug} className={cn("article", "article_short")}>
          <ArticlePrev article={article} />
        </li>
      );
    });
  }

  return (
    <section className={cn("page")}>
      <ul className={cn("article-list", "nolist")}>{articlesList}</ul>
      {elemPager}
    </section>
  );
};

export default ArticleList;
