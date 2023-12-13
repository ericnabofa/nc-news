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
        console.log(data)
        return data.article
    })
}
