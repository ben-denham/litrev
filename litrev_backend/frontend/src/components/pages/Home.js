import React from 'react';
import {Link} from 'react-router-dom';

function Home() {
  const examples = [
    'arxiv:1801.00631',
    '10.1016/j.eswa.2020.113380',
  ];

  return (
    <ul>
      {examples.map((paperId, index) => {
        return <li key={index}><Link to={'/paper/' + paperId}>{paperId}</Link></li>
      })}
    </ul>
  );
}

export default Home;
