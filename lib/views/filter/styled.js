import styled from 'styled-components';

import {ScrollView as GestureHandlerScrollView} from 'react-native-gesture-handler';

export const Container = styled.KeyboardAvoidingView`
  padding: 15px;
  align-items: center;
  flex: 1;
  background-color: ${p => p.theme.backgroundColor};
`;

export const Handle = styled.View`
  width: 36px;
  height: 5px;
  border-radius: 3px;
  background-color: #c4c4c4;
`;

export const ScrollView = styled(GestureHandlerScrollView)`
  margin-top: 10px;
  padding-bottom: 30px;
  width: 100%;
`;

export const FilterBlock = styled.View``;

export const FilterTitle = styled.Text`
  ${p => p.theme.fonts.sizes.display.regular.small};
  color: ${p => p.theme.textColor};
`;

export const Divider = styled.View`
  width: 362px;
  height: 1px;
  background: #dcdcdc;
  margin-top: 25px;
  margin-bottom: 15px;
`;

export const StatusSection = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export const WrappedButton = styled.View`
  margin-bottom: 20px;
  margin-right: 20px;
`;

export const PriceSection = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const PriceText = styled.Text`
  color: ${p => p.theme.textColor};
  ${p => p.theme.fonts.sizes.text.medium};
`;

export const CollectionSection = styled.View`
  margin-top: 15px;
`;

export const CollectionResults = styled.FlatList`
  margin-top: 5px;
  padding: 20px;
  max-height: 175px;
`;

export const SelectedCollections = styled.FlatList`
  /* border: 1px solid black; */
  padding: 10px 0;
`;
