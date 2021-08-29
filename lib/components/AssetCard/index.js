import React from 'react';

import {View, Text} from 'react-native';
import moment from 'moment';

import {useNavigation} from '@react-navigation/native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import * as Styled from './styled';

import Web3 from 'web3';

const AssetCard = ({node}) => {
  const navigation = useNavigation();
  let saleType;
  let lastSalePrice;
  let bestBidPrice;

  let assetBundle = node.assetBundle;

  let image = assetBundle
    ? node.assetBundle.assetQuantities.edges[0].node.asset.displayImageUrl
    : node.asset.displayImageUrl;

  let name = assetBundle ? node.assetBundle.name : node.asset.name;

  let onSale = node[assetBundle ? 'assetBundle' : 'asset'].orderData.bestAsk;

  if (onSale) {
    saleType =
      node[assetBundle ? 'assetBundle' : 'asset'].orderData.bestAsk.orderType;
  }

  let price = assetBundle
    ? node.assetBundle.orderData.bestAsk.paymentAssetQuantity.quantity
    : node.asset.orderData.bestAsk
    ? node.asset.orderData.bestAsk.paymentAssetQuantity.quantity
    : null;

  let lastSale =
    node[assetBundle ? 'assetBundle' : 'asset'].assetEventData.lastSale;

  if (lastSale) {
    lastSalePrice =
      node[assetBundle ? 'assetBundle' : 'asset'].assetEventData.lastSale
        .unitPriceQuantity.quantity;
  }

  let bestBid = node[assetBundle ? 'assetBundle' : 'asset'].orderData.bestBid;

  if (bestBid) {
    bestBidPrice =
      node[assetBundle ? 'assetBundle' : 'asset'].orderData.bestBid
        .paymentAssetQuantity.quantity;
  }

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
              <Styled.Price>{Web3.utils.fromWei(price, 'ether')}</Styled.Price>
            </View>
          )}

          {lastSale && !bestBid && (
            <View>
              <Styled.PriceLabel>Last</Styled.PriceLabel>
              <Styled.Price>
                {Web3.utils.fromWei(lastSalePrice, 'ether')}
              </Styled.Price>
            </View>
          )}
          {bestBid && !lastSale && (
            <View>
              <Styled.PriceLabel>Best Bid</Styled.PriceLabel>
              <Styled.Price>
                {Web3.utils.fromWei(bestBidPrice, 'ether')}
              </Styled.Price>
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
