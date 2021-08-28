import React, {useContext, useState} from 'react';
import {ActivityIndicator, Pressable, FlatList} from 'react-native';
import {useTheme} from 'styled-components';

import {useQuery} from '@apollo/client';
import {SearchContext, REDUCER_TYPES} from '@lib/utils/context';

import {Picker, PickerIOS} from '@react-native-picker/picker';

import {OpenSeaQueries} from '@lib/utils/';
import Button from '@lib/components/Buttons';
import TextInput from '@lib/components/TextInput';
import Avatar from '@lib/components/Avatar';

import * as Styled from './styled';

const Sort = () => {
  const theme = useTheme();
  const {searchState, searchDispatch} = useContext(SearchContext);
  const {sort} = searchState;
  const options = {
    'No Sorting': null,
    'Recently Listed': 'LISTING_DATE',
    'Recently Created': 'CREATED_DATE',
    'Recently Sold': 'LAST_SALE_DATE',
    'Recently Received': 'LAST_TRANSFER_DATE',
    'Ending Soon': 'EXPIRATION_DATE',
    'Price: Low to High': '-PRICE',
    'Price: High to Low': 'PRICE',
    'Highest Last Sale': 'LAST_SALE_PRICE',
    'Most Viewed': 'VIEWER_COUNT',
    'Most Favorited': 'FAVORITE_COUNT',
    Oldest: '-CREATED_DATE',
  };

  const setSort = item => {
    searchDispatch({
      payload: item,
      type: REDUCER_TYPES.SET_SORT,
    });
  };

  return (
    <Styled.FilterBlock>
      <Styled.FilterTitle>Sort</Styled.FilterTitle>
      <PickerIOS
        selectedValue={sort}
        onValueChange={(itemValue, itemIndex) => setSort(itemValue)}
        style={{top: -70, height: 120}}>
        {Object.keys(options).map((key, index) => (
          <PickerIOS.Item
            label={key}
            value={options[key]}
            key={index}
            color={theme.textColor}
          />
        ))}
      </PickerIOS>
      <Styled.Divider />
    </Styled.FilterBlock>
  );
};

const StatusFilter = () => {
  const {searchState, searchDispatch} = useContext(SearchContext);
  const {toggles} = searchState;

  const toggleBuyNow = () => {
    searchDispatch({
      payload: 'BUY_NOW',
      type: REDUCER_TYPES.SET_TOGGLE,
    });
  };

  const toggleOnAuction = () => {
    searchDispatch({
      payload: 'ON_AUCTION',
      type: REDUCER_TYPES.SET_TOGGLE,
    });
  };

  const toggleNew = () => {
    searchDispatch({
      payload: 'HAS_OFFERS',
      type: REDUCER_TYPES.SET_TOGGLE,
    });
  };

  const toggleHasOffers = () => {
    searchDispatch({
      payload: 'IS_NEW',
      type: REDUCER_TYPES.SET_TOGGLE,
    });
  };

  const isActive = key => (toggles ? toggles.includes(key) : false);

  return (
    <Styled.FilterBlock>
      <Styled.FilterTitle>Status</Styled.FilterTitle>
      <Styled.StatusSection>
        <Styled.WrappedButton>
          <Button
            text="Buy Now"
            type={isActive('BUY_NOW') ? 'primary' : 'secondary'}
            onPress={toggleBuyNow}
          />
        </Styled.WrappedButton>
        <Button
          text="On Auction"
          type={isActive('ON_AUCTION') ? 'primary' : 'secondary'}
          onPress={toggleOnAuction}
        />
        <Styled.WrappedButton>
          <Button
            text="New"
            type={isActive('HAS_OFFERS') ? 'primary' : 'secondary'}
            onPress={toggleNew}
          />
        </Styled.WrappedButton>
        <Button
          text="Has Offers"
          type={isActive('IS_NEW') ? 'primary' : 'secondary'}
          onPress={toggleHasOffers}
        />
      </Styled.StatusSection>
      <Styled.Divider />
    </Styled.FilterBlock>
  );
};

const PriceFilter = () => {
  const theme = useTheme();
  const {searchState, searchDispatch} = useContext(SearchContext);
  const {priceFilter} = searchState;

  const setPriceFilter = value => {
    searchDispatch({
      payload: value,
      type: REDUCER_TYPES.SET_PRICE_FILTER,
    });
  };

  const setMin = min => {
    setPriceFilter({...priceFilter, min});
  };

  const setMax = max => {
    setPriceFilter({...priceFilter, max});
  };

  return (
    <Styled.FilterBlock>
      <Styled.FilterTitle>Price</Styled.FilterTitle>

      <PickerIOS
        selectedValue={priceFilter.symbol}
        onValueChange={(itemValue, itemIndex) =>
          setPriceFilter({...priceFilter, symbol: itemValue})
        }
        style={{top: -70, height: 120}}>
        <PickerIOS.Item label="USD" value="USD" color={theme.textColor} />
        <PickerIOS.Item label="ETH" value="ETH" color={theme.textColor} />
      </PickerIOS>
      <Styled.PriceSection>
        <TextInput
          placeholder="Min"
          keyboardType={'number-pad'}
          value={priceFilter.min}
          onChangeText={setMin}
        />
        <Styled.PriceText>to</Styled.PriceText>
        <TextInput
          placeholder="Max"
          keyboardType={'number-pad'}
          value={priceFilter.max}
          onChangeText={setMax}
        />
      </Styled.PriceSection>
      <Styled.Divider />
    </Styled.FilterBlock>
  );
};

const CollectionFilter = () => {
  const {searchState, searchDispatch} = useContext(SearchContext);
  const [collectionSearch, setCollectionSearch] = useState('');
  const {collections} = searchState;

  const variables = {
    assetOwner: null,
    categories: null,
    chains: null,
    collections: [],
    count: 100,
    cursor: null,
    includeHidden: false,
    query: collectionSearch,
    sortBy: 'SEVEN_DAY_VOLUME',
  };

  const {loading, error, data, refetch, fetchMore} = useQuery(
    OpenSeaQueries.CollectionFilterQuery,
    {
      variables,
    },
  );

  const paginate = () => {
    fetchMore({
      variables: {cursor: data.query.collections.pageInfo.endCursor},
      updateQuery: (prev, {fetchMoreResult}) => {
        if (!fetchMoreResult) {
          return prev;
        }

        return {
          query: {
            ...fetchMoreResult.query,
            collections: {
              ...fetchMoreResult.query.collections,
              edges: [
                ...prev.query.collections.edges,
                ...fetchMoreResult.query.collections.edges,
              ],
            },
          },
        };
      },
    });
  };

  const selectItem = item => {
    searchDispatch({
      payload: item,
      type: REDUCER_TYPES.SET_COLLECTIONS,
    });
  };

  const renderItem = ({item}) => {
    if (item.LOADING) {
      return <ActivityIndicator />;
    }
    if (collections) {
      let index = collections.findIndex(
        collection => collection.cursor === item.cursor,
      );
      if (index > -1) {
        return;
      }
    }

    const onPress = () => selectItem(item);
    return (
      <Pressable onPress={onPress}>
        <Avatar image={item.node.imageUrl} name={item.node.name} />
      </Pressable>
    );
  };

  const renderSelectedItem = ({item}) => {
    const onPress = () => selectItem(item);
    return (
      <Pressable onPress={onPress} style={{marginRight: 15}}>
        <Avatar active image={item.node.imageUrl} name={item.node.name} />
      </Pressable>
    );
  };

  return (
    <Styled.FilterBlock>
      <Styled.FilterTitle>Collection</Styled.FilterTitle>

      <Styled.CollectionSection>
        <TextInput
          placeholder="Search"
          value={collectionSearch}
          onChangeText={setCollectionSearch}
        />
        {collections !== null && collections.length !== 0 && (
          <Styled.SelectedCollections
            horizontal
            data={collections}
            renderItem={renderSelectedItem}
            keyExtractor={item => item.cursor}
            contentContainerStyle={{
              alignItems: 'center',
            }}
          />
        )}
        {(!data || loading) && <ActivityIndicator />}
        <Styled.CollectionResults
          data={
            data && Object.keys(data.query).length !== 0
              ? [
                  ...data.query.collections.edges,
                  {cursor: 'loading', LOADING: true},
                ]
              : null
          }
          renderItem={renderItem}
          keyExtractor={item => item.cursor}
          onEndReached={
            data && Object.keys(data.query).length !== 0 ? paginate : null
          }
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
    <Styled.Container behavior={'padding'} keyboardVerticalOffset={100}>
      <Styled.Handle />

      <Styled.ScrollView>
        <Sort />
        <StatusFilter />
        <PriceFilter />
        <CollectionFilter />
      </Styled.ScrollView>
    </Styled.Container>
  );
};

export default Filter;
