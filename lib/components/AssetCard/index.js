import React from 'react';

import {View, Text} from 'react-native';
import moment from 'moment';

import {useNavigation} from '@react-navigation/native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import {Helpers} from '@lib/components/AssetDetails';

import Eth from '@lib/components/Eth';

import * as Styled from './styled';

const AssetCard = ({node, simple = false}) => {
  const navigation = useNavigation();

  let assetBundle = node.assetBundle;

  let image = assetBundle
    ? node.assetBundle.assetQuantities.edges[0].node.asset.displayImageUrl
    : node.asset.displayImageUrl;

  let name = assetBundle
    ? node.assetBundle.name
    : node.asset.name
    ? node.asset.name
    : node.asset.tokenId;

  if (!simple) {
  }

  const navigate = () => {
    ReactNativeHapticFeedback.trigger('impactHeavy');
    navigation.navigate('Asset', {data: node});
  };

  const RenderPrice = () => {
    if (simple) {
      return null;
    }
    let {
      onSale,
      price,
      saleType,
      lastSale,
      bestBid,
      lastSalePrice,
      bestBidPrice,
    } = Helpers.getPriceInfo(node, assetBundle);
    return (
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
    );
  };

  return (
    <Styled.AssetCard onPress={navigate}>
      <Styled.AssetImage
        simple={simple}
        source={{
          uri: image,
        }}
        resizeMode={'cover'}
      />
      <Styled.AssetInfo>
        <Styled.AssetNameContainer>
          <Styled.AssetName>{name}</Styled.AssetName>
          {!assetBundle && (
            <Styled.SubText simple={simple}>
              {node.asset.collection.name}
            </Styled.SubText>
          )}
        </Styled.AssetNameContainer>
        <RenderPrice />
      </Styled.AssetInfo>
    </Styled.AssetCard>
  );
};

export default AssetCard;
