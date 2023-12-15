import React, { useEffect, useState } from "react";
import { deleteComment, getArticleComments } from "../src/utils/api";
import CommentAdder from "./CommentAdder";

const Comments = ({ articleId, loggedInUser }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [comments, setComments] = useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState(null);

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

  const handleDeleteComment = (commentId) => {
    setIsLoading(true);
  
    deleteComment(commentId)
      .then(() => {
        setDeleteSuccess('Comment deleted successfully!');
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.comment_id !== commentId)
        );
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Failed to delete comment:', error);
        setIsError(true);
        setIsLoading(false);
      });
  };
  

  useEffect(() => {
    if (deleteSuccess) {
      const timerId = setTimeout(() => {
        setDeleteSuccess(null);
      }, 3000); 

      return () => clearTimeout(timerId); 
    }
  }, [deleteSuccess]);

  if (isLoading) return <p>It's Loading!!!</p>;

  if (isError) return <p>Error encountered</p>;

  return (
    <section className="comment-container">
      <h2>Comments</h2>
      {deleteSuccess && (
        <p className="success-message">{deleteSuccess}</p>
      )}
      <CommentAdder articleId={articleId} setComments={setComments} loggedInUser={loggedInUser}/>
      <ul>
        {comments.map((comment, index) => (
          <li key={comment.comment_id || index} className="comment">
            <div className="comment-info">
              <span>Author: {comment.author}</span>
              <span>Created at: {comment.created_at}</span>
            </div>

            <p>{comment.body}</p>
            {loggedInUser === comment.author && (
              <button onClick={() => handleDeleteComment(comment.comment_id)}>
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Comments;
