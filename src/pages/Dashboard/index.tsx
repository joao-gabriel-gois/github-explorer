import React from 'react';
import { FiChevronRight as RightArrowIcon } from 'react-icons/fi';

import logoIcon from '../../assets/logo.svg';

import { Title, Form, Repositories } from './styles';

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logoIcon} alt="GitHub Explorer Logo" />
      <Title>
        Explore repositórios no
        <span> Github</span>
      </Title>

      <Form>
        <input placeholder="Digite o nome do repositório" />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        <a href="any">
          <img
            src="https://avatars3.githubusercontent.com/u/53549655?s=460&u=ed74bf8cfd55909c6f4eda92ab972e7708ffd4f9&v=4"
            alt="João Gabriel"
          />
          <div>
            <strong>Slidejs</strong>
            <p>Reproducing Origamid's JS Slide while studying</p>
          </div>
          <RightArrowIcon size={20} />
        </a>
      </Repositories>
    </>
  );
};

export default Dashboard;
