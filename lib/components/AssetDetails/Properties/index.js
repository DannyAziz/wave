import React from 'react';

import * as Styled from './styled';

import Property from '@lib/components/Property';

const Properties = ({traits, totalSupply}) => {
  return (
    <Styled.PropertiesContainer>
      {traits.map(({node: trait}, index) => (
        <Property
          key={index}
          name={trait.traitType}
          value={trait.value}
          rarity={
            trait.displayType === 'BOOST_PERCENTAGE'
              ? trait.floatValue
              : (totalSupply / trait.traitCount).toFixed(2)
          }
          traitType={trait.displayType}
        />
      ))}
    </Styled.PropertiesContainer>
  );
};

export default Properties;
