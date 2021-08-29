import React from 'react';

import * as Styled from './styled';

import AssetCard from '@lib/components/AssetCard';

const BundleList = ({bundle}) => {
  const renderItems = () => {
    return bundle.assetQuantities.edges.map((item, index) => {
      return <AssetCard node={item.node} key={index} simple />;
    });
  };

  return <Styled.Container>{renderItems()}</Styled.Container>;
};

export default BundleList;
