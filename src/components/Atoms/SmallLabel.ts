import styled from 'styled-components';
import device from '../../util/responsive';

type SmallLabel = {
  color?: string;
  weight?: string;
  fontSize?: string;
  align?: string;
  firstToUpperCase?: boolean;
};

const SmallLabel = styled.h4<SmallLabel>`
  color: ${({ color }) => color || '#FFFFFF'};
  display: block;
  font-weight: ${({ weight }) => weight || '600'};
  font-size: ${({ fontSize }) => fontSize || '15px'};
  text-align: ${({ align }) => align || 'left'};
  padding: 5px 0;
  ${({ firstToUpperCase }) =>
    firstToUpperCase &&
    `
  &:first-letter {
    text-transform: uppercase;
  }
  `}
  @media ${device.tablet} {
    font-size: ${({ fontSize }) => fontSize || '20px'};
  }
  @media ${device.laptop} {
    font-size: ${({ fontSize }) => fontSize || '23px'};
  }
  @media ${device.laptopL} {
    font-size: ${({ fontSize }) => fontSize || '26px'};
  }
`;

export default SmallLabel;
