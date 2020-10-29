import React from 'react';

import { Container } from './styles';

const Loader: React.FC = () => {
  return (
    <Container>
      <div className="lds-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
    </Container>
  );
};

export default Loader;
