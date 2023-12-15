import axios from 'axios';

const api = axios.create({baseURL: 'https://nc-news-be-l4gr.onrender.com'})

export const getAllArticles =  () => {
    return api
    .get(`/api/articles`)
    .then(({data}) => {
        return data.articles
    })
}

export const getSingleArticle = (article_id) => {
    return api
    .get(`/api/articles/${article_id}`)
    .then(({data}) => {
        return data.article
    })
}

export const getArticleComments = (article_id) => {
    return api
    .get(`/api/articles/${article_id}/comments`)
    .then(({data}) => {
        return data.comments
    })
}

export const voteOnArticle = (articleId, voteType) => {
    const incVotes = voteType === 'up' ? 1 : voteType === 'down' ? -1 : 0;

    return api
      .patch(`/api/articles/${articleId}`, { inc_votes: incVotes })
      .then(({data}) => {
      const vote = data.updatedArticle.votes
        return vote;
    })
      .catch((error) => {
        throw error;
      });
  };

  export const postComment = (articleId, newComment) => {

    const comment = {
        username: "tickle122",
        body: newComment.body
      } 

        return api
    .post(`/api/articles/${articleId}/comments`, comment )
    .then((data) => {
        return data.comment
    })
  }

  export const getAllTopics =  () => {
    return api
    .get(`/api/topics`)
    .then(({data}) => {
        return data.topics
    })
}


export const getArticlesByTopic = (topic) => {
    return api
    .get(`/api/articles?topic=${topic}`)
    .then(({data}) => {
        return data.articles
})
}


export const deleteComment = (commentId) => {
    return api
      .delete(`/api/comments/${commentId}`)
      .then(() => {
        console.log('Comment deleted successfully');
      })
  };
  
