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