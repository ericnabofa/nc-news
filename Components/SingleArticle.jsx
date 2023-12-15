
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleArticle, voteOnArticle } from "../src/utils/api";
import Comments from "./Comments";
import { useUserContext } from "./UserContext";

const SingleArticle = () => {
    const [votes, setVotes] = useState(0);
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  
  const loggedInUser = useUserContext();
  
  useEffect(() => {
    getSingleArticle(articleId)
      .then((articleData) => {
        setArticle(articleData);
        setVotes(articleData.votes)
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [articleId]);

  const handleVote = (voteType) => {
    setVotes((prevVotes) => (voteType === 'up' ? prevVotes + 1 : prevVotes - 1));

    voteOnArticle(articleId, voteType)
    .then((response) => {
      console.log('Vote successful:', response);
    })
      .catch((error) => {
        setVotes((prevVotes) => (voteType === 'up' ? prevVotes - 1 : prevVotes + 1));
        console.error('Failed to vote:', error);
      });
  };

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
      <p>Votes: {votes}</p>
      <button onClick={() => handleVote('up')}>Upvote</button>
      <button onClick={() => handleVote('down')}>Downvote</button>

      <section>
        <Comments articleId={articleId} loggedInUser={loggedInUser}/>
      </section>
    </div>
  );
};

export default SingleArticle;
