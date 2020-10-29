import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import { NotFoundWrapper, NotfoundIcon, NotFoundText } from './styles';

const NotFound = () => {
  return (
    <NotFoundWrapper>
      <NotfoundIcon>
        <FontAwesomeIcon icon={faFrown} />
      </NotfoundIcon>
      <NotFoundText>Desculpe, cidade não encontrada...</NotFoundText>
    </NotFoundWrapper>
  );
};

export default NotFound;
