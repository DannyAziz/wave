import React, {useState, useRef, useMemo, useCallback} from 'react';
import {View, Dimensions, ActivityIndicator} from 'react-native';

import {useTheme} from 'styled-components';

import * as Styled from './styled';

import {useQuery} from '@apollo/client';
import BottomSheet from '@gorhom/bottom-sheet';
import moment from 'moment';

import {OpenSeaQueries} from '@lib/utils/';
import Pill from '@lib/components/Pill';
import Eth from '@lib/components/Eth';
import Back from '@lib/components/Back';

import {
  Helpers,
  About,
  AssetBundleAbout,
  PriceHistory,
  Properties,
  TradingHistory,
  BundleList,
} from '@lib/components/AssetDetails';

const windowWidth = Dimensions.get('window').width;

const Asset = props => {
  let image;
  let images;
  let views;
  let assetContractAddress;
  let tokenId;

  const theme = useTheme();
  const [activeWindow, setActiveWindow] = useState(0);

  // ref
  const bottomSheetRef = useRef(null);
  const carouselRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['50%', '75%'], []);

  // callbacks
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  const setWindow = index => {
    setActiveWindow(index);
    if (carouselRef) {
      carouselRef.current.scrollToIndex({index});
    }
  };

  const {data} = props.route.params;
  let assetBundle = data.assetBundle;

  if (assetBundle) {
    images = data.assetBundle.assetQuantities.edges.map(
      item => item.node.asset.displayImageUrl,
    );
  } else {
    image = data.asset.displayImageUrl;
  }

  let name = assetBundle
    ? data.assetBundle.name
    : data.asset.name
    ? data.asset.name
    : data.asset.tokenId;

  let variables = {};

  if (!assetBundle) {
    assetContractAddress = data.asset.assetContract.address;
    tokenId = data.asset.tokenId;

    variables = {
      archetype: {
        assetContractAddress,
        tokenId,
      },
    };

    console.log(assetData);
  } else {
    variables = {
      slug: data.assetBundle.slug,
    };
  }

  const {
    loading,
    error,
    data: assetData,
    refetch,
    fetchMore,
  } = useQuery(OpenSeaQueries[assetBundle ? 'BundleQuery' : 'ItemQuery'], {
    variables,
  });

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
  } = Helpers.getPriceInfo(
    Object.prototype.hasOwnProperty.call(
      data[assetBundle ? 'assetBundle' : 'asset'],
      'orderData',
    )
      ? data
      : assetData
      ? {
          asset: {
            ...assetData.archetype.asset,
            orderData: assetData.tradeSummary,
          },
        }
      : null,
    assetBundle,
  );

  if (assetBundle) {
    views = ['About', `${data.assetBundle.assetQuantities.edges.length} Items`];
  } else {
    views = [
      'About',
      'Price History',
      'Properties',
      // 'Listings',
      // 'Offers',
      // 'More From This Collection',
    ];
  }

  const renderCarouselItem = ({item, index}) => {
    return (
      <Pill
        active={activeWindow === index}
        onPress={e => setWindow(index)}
        text={item}
      />
    );
  };

  return (
    <Styled.Container>
      <Back onPress={() => props.navigation.goBack()} />
      {assetBundle && (
        <Styled.ImageSlider
          horizontal
          pagingEnabled
          snapToInterval={windowWidth}
          showsHorizontalScrollIndicator>
          {images.map((item, index) => (
            <Styled.Image key={index} source={{uri: item}} />
          ))}
        </Styled.ImageSlider>
      )}
      {!assetBundle && <Styled.Image source={{uri: image}} />}
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enableOverDrag={false}
        animateOnMount
        style={{
          shadowColor: 'black',
          borderTopStartRadius: 24,
          borderTopEndRadius: 24,
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.75,
          shadowRadius: 16.0,
          elevation: 24,
        }}
        handleStyle={{
          backgroundColor: theme.bodyColor,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
        handleIndicatorStyle={{backgroundColor: theme.textColor}}>
        <Styled.InfoContainer>
          <Styled.Title>{name}</Styled.Title>
          {!assetBundle && (
            <Styled.Subtitle>{data.asset.collection.name}</Styled.Subtitle>
          )}
          <View>
            {saleType === 'BASIC' && (
              <Styled.PriceContainer>
                <Eth height={30} width={30} />
                <Styled.Price>{price.toFixed(2)}</Styled.Price>
                <Styled.USDPrice>(${priceUSD.toFixed(2)})</Styled.USDPrice>
              </Styled.PriceContainer>
            )}

            {lastSale && !bestBid && (
              <>
                <Styled.PriceLabel>Last</Styled.PriceLabel>
                <Styled.PriceContainer>
                  <Eth height={30} width={30} />
                  <Styled.Price>{lastSalePrice.toFixed(2)}</Styled.Price>
                  <Styled.USDPrice>
                    (${lastSalePriceUSD.toFixed(2)})
                  </Styled.USDPrice>
                </Styled.PriceContainer>
              </>
            )}
            {bestBid && !lastSale && (
              <>
                <Styled.PriceLabel>Best Bid</Styled.PriceLabel>
                <Styled.PriceContainer>
                  <Eth height={30} width={30} />
                  <Styled.Price>{bestBidPrice.toFixed(2)}</Styled.Price>
                  <Styled.USDPrice>
                    (${bestBidPriceUSD.toFixed(2)})
                  </Styled.USDPrice>
                </Styled.PriceContainer>
              </>
            )}

            {onSale && saleType !== 'BASIC' && (
              <Styled.PriceContainer>
                {/* <Styled.SubText>Time Left</Styled.SubText> */}
                <Styled.Price>
                  {moment().to(
                    data[assetBundle ? 'assetBundle' : 'asset'].orderData
                      .bestAsk.closedAt,
                  )}
                </Styled.Price>
              </Styled.PriceContainer>
            )}
          </View>
          <Styled.Carousel
            ref={carouselRef}
            data={views}
            renderItem={renderCarouselItem}
            keyExtractor={item => item}
          />
          <Styled.WindowContainer>
            {loading && <ActivityIndicator />}
            {!assetBundle && (
              <>
                {assetData && activeWindow === 0 && (
                  <About asset={assetData.archetype.asset} />
                )}
                {assetData && activeWindow === 1 && (
                  <>
                    {/* <PriceHistory
                      contractAddress={assetContractAddress}
                      tokenID={tokenId}
                    /> */}
                    <TradingHistory
                      contractAddress={assetContractAddress}
                      tokenID={tokenId}
                    />
                  </>
                )}
                {assetData && activeWindow === 2 && (
                  <Properties
                    traits={assetData.archetype.asset.traits.edges}
                    totalSupply={
                      assetData.archetype.asset.collection.stats.totalSupply
                    }
                  />
                )}
              </>
            )}
            {assetBundle && (
              <>
                {assetData && activeWindow === 0 && (
                  <AssetBundleAbout
                    description={assetData.bundle.description}
                  />
                )}
                {assetData && activeWindow === 1 && (
                  <BundleList bundle={assetData.bundle} />
                )}
              </>
            )}
          </Styled.WindowContainer>
        </Styled.InfoContainer>
      </BottomSheet>
    </Styled.Container>
  );
};

export default Asset;
