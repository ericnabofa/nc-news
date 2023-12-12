import axios from 'axios';

//const api = axios.create({baseURL: 'https://nc-news-be-l4gr.onrender.com'})

function getAllArticles () {
    return axios
    .get(`https://nc-news-be-l4gr.onrender.com/api/articles`)
    .then((response) => {
        console.log(response)
        return response.data.articles
    })
}

export default getAllArticles;