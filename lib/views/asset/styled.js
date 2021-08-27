import styled from 'styled-components';
import {Dimensions} from 'react-native';

import {BottomSheetScrollView} from '@gorhom/bottom-sheet';

export const Container = styled.View`
  flex: 1;
`;

export const Image = styled.Image`
  width: 100%;
  height: 400px;
`;

export const InfoContainer = styled(BottomSheetScrollView)`
  width: 100%;
  min-height: ${Dimensions.get('window').height - 380 + 100}px;
  padding: 20px;

  background-color: ${p => p.theme.backgroundColor};
`;

export const Title = styled.Text`
  ${p => p.theme.fonts.sizes.display.bold.large};
`;

export const Subtitle = styled.Text`
  ${p => p.theme.fonts.sizes.text.large};
`;

export const PriceContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Price = styled.Text`
  ${p => p.theme.fonts.sizes.display.bold.medium};
`;

export const USDPrice = styled.Text`
  margin-left: 10px;
  ${p => p.theme.fonts.sizes.text.medium};
`;

export const PriceLabel = styled.Text``;

export const Carousel = styled.FlatList.attrs({
  contentContainerStyle: {paddingHorizontal: 7},
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  width: ${Dimensions.get('window').width}px;
  margin: 0 -20px;
`;

export const WindowContainer = styled.View`
  margin-top: 20px;
  width: 100%;
  padding-bottom: 60px;
`;
