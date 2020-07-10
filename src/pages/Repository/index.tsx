import React from 'react';
import { useRouteMatch } from 'react-router-dom';

interface RepositoryParams {
  repository: string;
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();

  let [authorName, repoName] = params.repository.split('/');

  return (
    <>
      <h1>{ repoName }</h1>
      <p> por {authorName}</p>
    </>
  )
}

export default Repository;
