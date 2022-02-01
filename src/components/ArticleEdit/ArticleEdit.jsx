import ArticleForm from "../ArticleForm";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import blogApi from "../../services/blogApi";

const ArticleEdit = () => {
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    blogApi.getArticle(slug).then((body) => {
      setArticle(body);
      setLoading(false);
    });
  }, [slug]);

  const form = !loading ? (
    <ArticleForm slug={slug} article={article} />
  ) : (
    <h1>ЗАГРУЗКА...</h1>
  );
  return <>{form}</>;
};

export default ArticleEdit;
