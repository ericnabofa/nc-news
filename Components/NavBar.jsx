import { Link } from "react-router-dom"

const NavBar = () => {
return (
    <nav id="nav">
        <Link to='/'>Home</Link>
        <Link to='/ArticlesList'>Articles</Link>
        <Link to='/TopicsList'>Topics</Link>
        <Link>UserProfile</Link>
    </nav>
)
}

export default NavBar