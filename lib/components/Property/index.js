import React from 'react';

import * as Styled from './styled';

const Property = ({name, value, rarity, traitType}) => {
  return (
    <Styled.BorderGradient
      colors={['#56CCF2', '#2F80ED']}
      start={{x: -14.5253, y: 2.02026}}
      end={{x: 76.659, y: 291.348}}
      useAngle
      angle={108.08}>
      <Styled.Property>
        <Styled.Name>{name}</Styled.Name>
        <Styled.Value>{value}</Styled.Value>
        <Styled.Rarity>
          {rarity}%{' '}
          {traitType === 'BOOST_PERCENTAGE' ? 'Boost' : 'Have this trait'}
        </Styled.Rarity>
      </Styled.Property>
    </Styled.BorderGradient>
  );
};

export default Property;
