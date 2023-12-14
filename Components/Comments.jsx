import { useEffect, useState } from "react";
import { getArticleComments } from "../src/utils/api";
import CommentAdder from "./CommentAdder";

const Comments = ({ articleId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getArticleComments(articleId)
      .then((commentsFromApi) => {
        setComments(commentsFromApi);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [articleId]);

  return (
    <section className="comment-container">
      <h2>Comments</h2>
      <CommentAdder articleId={articleId} setComments={setComments}/>
      <ul>
        {comments.map((comment, index) => {
          return (
            <li key={comment.comment_id || index} className="comment">
              <div className="comment-info">
                <span>Author: {comment.author}</span>
                <span>Created at: {comment.created_at}</span>
              </div>

              <p>{comment.body}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Comments;
