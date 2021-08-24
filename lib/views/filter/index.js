import React from 'react';

import {Picker, PickerIOS} from '@react-native-picker/picker';

import Button from '@lib/components/Buttons';
import TextInput from '@lib/components/TextInput';
import Avatar from '@lib/components/Avatar';

import * as Styled from './styled';

const StatusFilter = () => {
  return (
    <Styled.FilterBlock>
      <Styled.FilterTitle>Status</Styled.FilterTitle>
      <Styled.StatusSection>
        <Styled.WrappedButton>
          <Button text="Buy Now" type="secondary" />
        </Styled.WrappedButton>
        <Button text="Buy Now" type="secondary" />
        <Styled.WrappedButton>
          <Button text="Buy Now" type="secondary" />
        </Styled.WrappedButton>
        <Button text="Buy Now" type="secondary" />
      </Styled.StatusSection>
      <Styled.Divider />
    </Styled.FilterBlock>
  );
};

const PriceFilter = () => {
  const [currency, setCurrency] = React.useState('USD');
  return (
    <Styled.FilterBlock>
      <Styled.FilterTitle>Price</Styled.FilterTitle>

      <PickerIOS
        selectedValue={currency}
        onValueChange={(itemValue, itemIndex) => setCurrency(itemValue)}
        style={{top: -70, height: 120}}>
        <PickerIOS.Item label="USD" value="USD" />
        <PickerIOS.Item label="ETH" value="ETH" />
      </PickerIOS>
      <Styled.PriceSection>
        <TextInput placeholder="Min" />
        <Styled.PriceText>to</Styled.PriceText>
        <TextInput placeholder="Max" />
      </Styled.PriceSection>
      <Styled.Divider />
    </Styled.FilterBlock>
  );
};

const CollectionFilter = () => {
  const renderItem = () => <Avatar />;

  return (
    <Styled.FilterBlock>
      <Styled.FilterTitle>Collection</Styled.FilterTitle>

      <Styled.CollectionSection>
        <TextInput placeholder="Search" />
        <Styled.CollectionResults
          data={[
            1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          ]}
          renderItem={renderItem}
          keyExtractor={item => item}
        />
      </Styled.CollectionSection>
      <Styled.Divider />
    </Styled.FilterBlock>
  );
};

const CustomPropertyFilter = () => {
  return (
    <Styled.FilterBlock>
      <Styled.FilterTitle>Custom Property</Styled.FilterTitle>
      <Styled.Divider />
    </Styled.FilterBlock>
  );
};

const Filter = () => {
  return (
    <Styled.Container>
      <Styled.Handle />

      <Styled.ScrollView>
        <StatusFilter />
        <PriceFilter />
        <CollectionFilter />
      </Styled.ScrollView>
    </Styled.Container>
  );
};

export default Filter;
