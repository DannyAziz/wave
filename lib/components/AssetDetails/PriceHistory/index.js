import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  View,
  ActivityIndicator,
  TextInput,
  Text,
} from 'react-native';
import {
  ChartPath,
  ChartPathProvider,
  useChartData,
} from '@rainbow-me/animated-charts';

import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  runOnJS,
  call,
} from 'react-native-reanimated';

import Web3 from 'web3';

import moment from 'moment';

import {useQuery} from '@apollo/client';

import {OpenSeaQueries} from '@lib/utils/';

import * as Styled from './styled';

export const {width: SIZE} = Dimensions.get('window');

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

function PriceHistory({contractAddress, tokenID}) {
  let chartData;
  let priceData;

  const {
    loading,
    error,
    data: priceHistoryData,
    refetch,
    fetchMore,
  } = useQuery(OpenSeaQueries.PriceHistoryQuery, {
    variables: {
      archetype: {
        assetContractAddress: contractAddress,
        tokenId: tokenID,
      },
      bucketSize: 'DAY',
    },
  });

  if (priceHistoryData) {
    const rawHistoryData = priceHistoryData.tradeHistory.results;
    if (rawHistoryData.length > 1) {
      priceData = rawHistoryData.map(item => {
        let date = moment(item.bucketStart).unix();
        let numOfSales = item.quantity;
        let volume = parseFloat(
          Web3.utils.fromWei(item.volume.quantity, 'ether'),
          10,
        );

        let price = volume / numOfSales;

        return {
          points: {x: date, y: price},
          volume,
          numOfSales,
        };
      });
      chartData = {
        points: priceData.map(item => item.points),
        smoothingFactor: 1,
        smoothingStrategy: 'bezier',
      };
    }
  }

  const formatY = value => {
    'worklet';
    if (value === '') {
      if (priceData) {
        return `Average Price: ${JSON.stringify(
          priceData[priceData.length - 1].points.y,
        )}`;
      }
      return '';
    }
    return `Average Price: ${value}`;
  };

  const getDataForTimeStamp = timestamp => {
    return priceData.find(item => item.points.x == timestamp);
  };

  const ChartLabel = ({format, ...props}) => {
    const [numberOfSales, setNumberOfSales] = useState(null);
    const [volumeOnDay, setVolumeOnDay] = useState(null);
    const {['originalX']: val = 0} = useChartData();

    const recordResult = result => {
      if (result === '') {
        setNumberOfSales(null);
        setVolumeOnDay(null);
      }
      const data = getDataForTimeStamp(result);
      if (data) {
        const {volume, numOfSales} = data;
        setNumberOfSales(numOfSales);
        setVolumeOnDay(volume);
      }
    };

    const formattedValue = useDerivedValue(() => {
      runOnJS(recordResult)(val.value);
      return val.value;
    }, []);
    const textProps = useAnimatedStyle(() => {
      return {
        text: formattedValue.value,
      };
    }, []);

    return (
      <Styled.XLabel>
        <AnimatedTextInput
          {...props}
          animatedProps={textProps}
          defaultValue={val.value}
          editable={false}
        />
        <Text>Volume - {volumeOnDay}</Text>
        <Text>Number of Sales - {numberOfSales}</Text>
      </Styled.XLabel>
    );
  };

  return (
    <View>
      {loading && <ActivityIndicator />}
      {chartData && (
        <ChartPathProvider data={chartData}>
          <Styled.YLabel format={formatY} />
          {/* <ChartLabel /> */}
          <ChartPath
            hapticsEnabled={false}
            hitSlop={30}
            fill="none"
            height={SIZE / 2}
            stroke="rgba(86, 204, 242, 1)"
            strokeWidth={3.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            selectedStrokeWidth={3}
            width={SIZE}
          />
          <Styled.Dot size={65} color={'rgba(86, 204, 242, 0.3)'}>
            <Styled.InnerDot color={'rgba(86, 204, 242, 1)'} />
          </Styled.Dot>
        </ChartPathProvider>
      )}
    </View>
  );
}

export default PriceHistory;
