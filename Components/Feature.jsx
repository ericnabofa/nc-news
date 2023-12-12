import React from "react";
import { useParams } from "react-router-dom";
import ArticlesList from "./ArticlesList";

const Feature = () => {
  const { feature } = useParams();
  
  const featureComponents = {
    ArticlesList: <ArticlesList />,
  };
 
  const selectedFeature = featureComponents[feature];

  return (
    <div className={`${feature}Feature`}>
      {selectedFeature || feature} 
    </div>
  );
};

export default Feature;
