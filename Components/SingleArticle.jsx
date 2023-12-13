
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleArticle } from "../src/utils/api";

const SingleArticle = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getSingleArticle(articleId)
      .then((articleData) => {
        setArticle(articleData);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>It's Loading!!!</p>;

  if (isError) return <p>Error encountered</p>;

  return (
    <div className="single-article-container">
      <h2> Title: {article.title}</h2>
      <div className="article-info">
        <span>Topic: {article.topic}</span>
        <span>Author: {article.author}</span>
        <span>Created at: {article.created_at}</span>
      </div>
      <p>{article.body}</p>
      <img src={article.article_img_url} alt="Article Image" />
    </div>
  );
};

export default SingleArticle;
