import React from 'react'
import { Link } from "react-router-dom";
const Home = () => {
  const features = [
    "ArticlesList",
    "TopicsList",
    "ExcitingContent1",
    "ExcitingContent2",
  ];
  return (
    <div>
      <ul className='FeaturesList'>
        {features.map((feature) => {
            return (
            <li key={feature}>
              <Link className="link" id={`${feature}Feature`} to={`/${feature}`}>
                <p>{feature}</p>
                </Link>
            </li>
            )
        })}
      </ul>
    </div>
  );
};

export default Home;
