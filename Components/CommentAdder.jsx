import React, { useState, useEffect } from 'react';
import { postComment } from '../src/utils/api';

const CommentAdder = ({ articleId, setComments, loggedInUser }) => {
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isCommentButtonDisabled, setIsCommentButtonDisabled] = useState(false); 
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [addSuccess, setAddSuccess] = useState(null);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
    setError(null);
    setIsCommentButtonDisabled(e.target.value.trim() === "" || isSubmitting); 
  };

  const validateForm = () => {
    setIsFormValid(comment.trim() !== '');
    setError(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validateForm();

    if (isFormValid && !isCommentButtonDisabled) {
      setIsSubmitting(true); 
      const currentDate = new Date().toISOString();

    
      const newComment = { body: comment, author: loggedInUser, created_at: currentDate };

      setComments((prevComments) => [newComment, ...prevComments]);

    
      postComment(articleId, { username: 'tickle122', body: comment })
        .then(() => {
          setComment('');
          setAddSuccess('Comment added successfully!');
          setError(null);
        })
        .catch((error) => {
          setError('Failed to submit comment. Please try again.');
          setComments((prevComments) => prevComments.filter((c) => c !== newComment)); 
        })
        .finally(() => {
          setIsSubmitting(false); 
        });
    }
  };

  useEffect(() => {
    if (addSuccess) {
      const timerId = setTimeout(() => {
        setAddSuccess(null);
      }, 3000); 

      return () => clearTimeout(timerId);
    }
  }, [addSuccess]);

  return (
    <div>
      <textarea
        value={comment}
        onChange={handleCommentChange}
        onBlur={validateForm}
        placeholder="Add a comment..."
      />
      {error && <p>{error}</p>}
      {addSuccess && <p className="success-message">{addSuccess}</p>}
      <button
        onClick={handleSubmit}
        disabled={isCommentButtonDisabled}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Comment'}
      </button>
    </div>
  );
};

export default CommentAdder;
