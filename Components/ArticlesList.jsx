import { useEffect, useState } from "react"
import getAllArticles from "../src/utils/api"
import ArticleCard from "./ArticleCard"



function ArticlesList  ()  {

    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [articles, setArticles] = useState([])

    useEffect(() => {
        getAllArticles()
        .then((articles) => {
            setArticles(articles);
            setIsLoading(false);
        })
        .catch((err) => {
            setIsError(true)
            setIsLoading(false)
        })
    }, [])

    if(isLoading) return <p id='status-msg'>it's loading!!!</p>

    if(isError) return <p id='status-msg'>Error encountered</p>


return (
    <section className="article-container">
        {articles.map((article) => {
            return <ArticleCard key={article.article_id} article={article} />
        })}
        
        </section>
)
}

export default ArticlesList