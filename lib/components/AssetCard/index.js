import React from 'react';

import {View, Text} from 'react-native';
import moment from 'moment';

import {useNavigation} from '@react-navigation/native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import {Helpers} from '@lib/components/AssetDetails';

import Eth from '@lib/components/Eth';

import * as Styled from './styled';

import Web3 from 'web3';

const AssetCard = ({node}) => {
  const navigation = useNavigation();

  let assetBundle = node.assetBundle;

  let image = assetBundle
    ? node.assetBundle.assetQuantities.edges[0].node.asset.displayImageUrl
    : node.asset.displayImageUrl;

  let name = assetBundle ? node.assetBundle.name : node.asset.name;

  let {
    onSale,
    price,
    priceUSD,
    saleType,
    lastSale,
    bestBid,
    lastSalePrice,
    lastSalePriceUSD,
    bestBidPrice,
    bestBidPriceUSD,
  } = Helpers.getPriceInfo(node, assetBundle);

  const navigate = () => {
    ReactNativeHapticFeedback.trigger('impactHeavy');
    navigation.navigate('Asset', {data: node});
  };

  return (
    <Styled.AssetCard onPress={navigate}>
      <Styled.AssetImage
        source={{
          uri: image,
        }}
        resizeMode={'cover'}
      />
      <Styled.AssetInfo>
        <Styled.AssetNameContainer>
          <Styled.AssetName>{name}</Styled.AssetName>
          {!assetBundle && (
            <Styled.SubText>{node.asset.collection.name}</Styled.SubText>
          )}
        </Styled.AssetNameContainer>
        <Styled.AssetPriceContainer>
          {saleType === 'BASIC' && (
            <View>
              <Styled.PriceLabel>Price</Styled.PriceLabel>
              <Styled.PriceContainer>
                <Eth />
                <Styled.Price>{price.toFixed(2)}</Styled.Price>
              </Styled.PriceContainer>
            </View>
          )}

          {lastSale && !bestBid && (
            <View>
              <Styled.PriceLabel>Last</Styled.PriceLabel>
              <Styled.PriceContainer>
                <Eth />
                <Styled.Price>{lastSalePrice.toFixed(2)}</Styled.Price>
              </Styled.PriceContainer>
            </View>
          )}
          {bestBid && !lastSale && (
            <View>
              <Styled.PriceLabel>Best Bid</Styled.PriceLabel>
              <Styled.PriceContainer>
                <Eth />
                <Styled.Price>{bestBidPrice.toFixed(2)}</Styled.Price>
              </Styled.PriceContainer>
            </View>
          )}

          {onSale && saleType !== 'BASIC' && (
            <View>
              <Styled.SubText>Time Left</Styled.SubText>
              <Styled.Price>
                {moment().to(
                  node[assetBundle ? 'assetBundle' : 'asset'].orderData.bestAsk
                    .closedAt,
                )}
              </Styled.Price>
            </View>
          )}
        </Styled.AssetPriceContainer>
      </Styled.AssetInfo>
    </Styled.AssetCard>
  );
};

export default AssetCard;
