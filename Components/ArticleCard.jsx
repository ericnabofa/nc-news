import React from 'react'

function ArticleCard(props) {
    const article = props.article;
    return (
        <section className='article-card'>
            <h3 className='article-card-title'>{article.title}</h3>
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