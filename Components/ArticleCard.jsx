import React from 'react'
import { Link } from 'react-router-dom';

function ArticleCard(props) {
    const article = props.article;
    return (
        <section className='article-card'>
            <Link to={`/ArticlesList/${article.article_id}`}><h3 className='article-card-title'>{article.title}</h3></Link>
            <div id='article-info'>
                <ul>
                    <li>{article.topic}</li>
                    <li>{article.author}</li>
                    <li>{article.created_at}</li>
                </ul>
            </div>
        </section>
    )
}

export default ArticleCard