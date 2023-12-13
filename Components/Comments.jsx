import { useEffect, useState } from "react"
import { getArticleComments } from "../src/utils/api"


const Comments = ({articleId}) => {

    const [comments, setComments] = useState([])

    useEffect(() => {
        getArticleComments(articleId).then((commentsFromApi) => {
            setComments(commentsFromApi)
        })
    }, [articleId])


return (
    <section>
        <h2>Comments</h2>
        <ol>
            {comments.map((comment) => {
                return (
                    <li key={comment.comment_id}>
                        <p>{comment.body}</p>
                    </li>
                )
            })}
        </ol>
    </section>
)
}

export default Comments