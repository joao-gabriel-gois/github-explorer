import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight as RightArrowIcon } from 'react-icons/fi';
import api from '../../services/api';

import logoIcon from '../../assets/logo.svg';

import { Title, Form, Repositories, Error } from './styles';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  }
}

const Dashboard: React.FC = () => {
  const [newRepository, setNewRepository] = useState('');
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem('@GithubExplorer:repositories');

    if (storagedRepositories) {
      return JSON.parse(storagedRepositories);
    } else {
      return [];
    }
  });

  useEffect(() => {
    // bellow we are setting the key with the app name
    // cause localstorage is shared among aplications in
    // the same domain. As we use localhost multiple times
    // this is the better way to not make a mess in localStorage
    localStorage.setItem('@GithubExplorer:repositories', JSON.stringify(repositories))
  }, [repositories])

  async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    if (!newRepository) {
      setInputError('Digite o repositório no formato autor/nome-do-repositório');
      return;
    }

    try {
      // requesting github api info
      const response = await api.get<Repository>(`repos/${newRepository}`);
      const repository = response.data;

      // updating UI with this info
      setRepositories([...repositories, repository]);

      // cleaning input and input error
      setNewRepository('');
      setInputError('');
    } catch (error) {
      setInputError('Não foi possível encontrar essa combinação autor/repositório');
    }
  }

  return (
    <>
      <img src={logoIcon} alt="GitHub Explorer Logo" />
      <Title>
        Explore repositórios no
        <span> Github</span>
      </Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          placeholder="Digite o nome do repositório (usuário/repositório)"
          value={newRepository}
          onChange={e => setNewRepository(e.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </Form>

      { inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map((repository: Repository) => (
          <a key={repository.full_name} href={`https://github.com/${repository.full_name}`}>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
            <strong>{repository.full_name}</strong>
              <p>
                {repository.description}
              </p>
            </div>
            <RightArrowIcon size={20} />
          </a>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
