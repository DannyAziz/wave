import React from 'react';

import {View, Text} from 'react-native';

import * as Styled from './styled';

import Web3 from 'web3';

const AssetCard = ({node}) => {
  return (
    <Styled.AssetCard>
      <Styled.AssetImage
        source={{uri: node.asset.displayImageUrl}}
        resizeMode={'center'}
      />
      <Styled.AssetInfo>
        <View>
          <Styled.MainText>{node.asset.name}</Styled.MainText>
          <Styled.SubText>{node.asset.collection.name}</Styled.SubText>
        </View>
        <Styled.MainText>
          {node.asset.orderData.bestAsk &&
            Web3.utils.fromWei(
              node.asset.orderData.bestAsk.paymentAssetQuantity.quantity,
              'ether',
            )}
        </Styled.MainText>
      </Styled.AssetInfo>
    </Styled.AssetCard>
  );
};

export default AssetCard;
