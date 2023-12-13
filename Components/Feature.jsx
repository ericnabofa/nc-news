import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ArticlesList from "./ArticlesList";
import SingleArticle from "./SingleArticle";


const Feature = () => {
  const { feature, article_id } = useParams();
  const [singleArticle, setSingleArticle] = useState(null);

  useEffect(() => {
    if (feature === "ArticlesList" && article_id) {
      getSingleArticle(article_id).then((article) => {
        setSingleArticle(article);
      });
    }
  }, [feature, article_id]);

  const featureComponents = {
    ArticlesList: <ArticlesList />,
  };
 
  const selectedFeature = featureComponents[feature];

  return (
    <div className={`${feature}Feature`}>
      {selectedFeature || feature} 
      {feature === 'ArticlesList' && singleArticle &&(
        <div>
        <SingleArticle article={singleArticle} />
      </div>
      )}
    </div>
  );
};

export default Feature;
