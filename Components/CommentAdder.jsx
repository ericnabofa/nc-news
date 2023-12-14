import React, { useState } from 'react';
import { postComment } from '../src/utils/api';

const CommentAdder = ({ articleId, setComments }) => {
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isCommentButtonDisabled, setIsCommentButtonDisabled] = useState(true);


  const handleCommentChange = (e) => {
    setComment(e.target.value);
    setError(null);
    setIsCommentButtonDisabled(e.target.value.trim() === "");
  };

  
  const validateForm = () => {
    setIsFormValid(comment.trim() !== '');
    setError(null);
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    validateForm();

    if (isFormValid && !isCommentButtonDisabled) {

        const currentDate = new Date().toISOString();

      // Optimistically update UI
      setComments((prevComments) => {
        return [{ body: comment, author: 'tickle122', created_at: currentDate}, ...prevComments]
    });

      // Make API call to save the comment
      postComment(articleId, { username: 'tickle122', body: comment })
        .then(() => {
          setComment('');
          setIsCommentButtonDisabled(true)
          setError(null)
        })
        .catch((error) => {
          setError('Failed to submit comment. Please try again.');
        })
    }
  };

  
  return (
    <div>
      <textarea
        value={comment}
        onChange={handleCommentChange}
        onBlur={validateForm}
        placeholder="Add a comment..."
      />
      {error && <p>{error}</p>} 
      <button onClick={handleSubmit}
          disabled={isCommentButtonDisabled}
        >
        Submit Comment
      </button>
    </div>
  );
};

export default CommentAdder;
