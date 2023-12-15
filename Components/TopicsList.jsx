import { useEffect, useState } from "react";
import { getAllTopics, getArticlesByTopic } from "../src/utils/api";
import { Link } from "react-router-dom";

function TopicsList() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null); 
  const [relatedArticles, setRelatedArticles] = useState([]); 

  useEffect(() => {
    getAllTopics()
      .then((topics) => {
        setTopics(topics);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  const handleTopicClick = (topicSlug) => {
    setIsLoading(true);
    setIsError(false);

    getArticlesByTopic(topicSlug)
      .then((articles) => {
        setRelatedArticles(articles);
        setSelectedTopic(topicSlug);
      })
      .catch((err) => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isLoading) return <p id="status-msg">it's loading!!!</p>;

  if (isError) return <p id="status-msg">Error encountered</p>;


  if (selectedTopic) {
    return (
      <section className="topic-container">
      <div id="refresh-message">Please refresh page if you need to go back to the list of topics.</div>
        <h2>Articles related to {selectedTopic}</h2>
        <ul>
        {relatedArticles.map((article, index) => (
            <li key={`${article.id}_${index}`}>
                <Link to={`/articles/${article.article_id}`}>
              <h4>{article.title}</h4>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    );
  }


  return (
    <section className="article-container">
      <ul>
        {topics.map((topic) => (
          <li key={topic.slug}>
          <button onClick={() => handleTopicClick(topic.slug)}>
            <h3 className="article-card-title">{topic.slug}</h3>
          </button>
          {topic.description}
        </li>
        ))}
      </ul>
    </section>
  );
}

export default TopicsList;
