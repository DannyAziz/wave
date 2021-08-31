import React from 'react';

import {View, Text} from 'react-native';
import moment from 'moment';

import {useNavigation} from '@react-navigation/native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import {Helpers} from '@lib/components/AssetDetails';

import Eth from '@lib/components/Eth';

import * as Styled from './styled';

const RenderPrice = ({node, assetBundle, simple}) => {
  if (simple) {
    return null;
  }

  let [priceData, setPriceData] = React.useState(null);

  React.useEffect(() => {
    let {
      onSale,
      price,
      saleType,
      lastSale,
      bestBid,
      lastSalePrice,
      bestBidPrice,
    } = Helpers.getPriceInfo(node, assetBundle);
    setPriceData({
      onSale,
      price,
      saleType,
      lastSale,
      bestBid,
      lastSalePrice,
      bestBidPrice,
    });
  }, []);

  if (!priceData || Object.keys(priceData).length === 0) {
    return null;
  }

  return (
    <Styled.AssetPriceContainer>
      {priceData.saleType === 'BASIC' && (
        <View>
          <Styled.PriceLabel>Price</Styled.PriceLabel>
          <Styled.PriceContainer>
            <Eth />
            <Styled.Price>{priceData.price.toFixed(2)}</Styled.Price>
          </Styled.PriceContainer>
        </View>
      )}

      {priceData.lastSale && !priceData.bestBid && (
        <View>
          <Styled.PriceLabel>Last</Styled.PriceLabel>
          <Styled.PriceContainer>
            <Eth />
            <Styled.Price>{priceData.lastSalePrice.toFixed(2)}</Styled.Price>
          </Styled.PriceContainer>
        </View>
      )}
      {priceData.bestBid && !priceData.lastSale && (
        <View>
          <Styled.PriceLabel>Best Bid</Styled.PriceLabel>
          <Styled.PriceContainer>
            <Eth />
            <Styled.Price>{priceData.bestBidPrice.toFixed(2)}</Styled.Price>
          </Styled.PriceContainer>
        </View>
      )}

      {priceData.onSale && priceData.saleType !== 'BASIC' && (
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

  const navigate = () => {
    ReactNativeHapticFeedback.trigger('impactHeavy');
    navigation.navigate('Asset', {data: node});
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
        {/* TODO: This causes too many renders maybe?? */}
        <RenderPrice node={node} assetBundle={assetBundle} simple={simple} />
      </Styled.AssetInfo>
    </Styled.AssetCard>
  );
};

export default AssetCard;
