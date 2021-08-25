import React, {useContext, useMemo, useRef, useState} from 'react';
import {Text, FlatList, ActivityIndicator} from 'react-native';
import {useQuery} from '@apollo/client';

import {SearchContext, REDUCER_TYPES} from '@lib/utils/context';

import {OpenSeaQueries} from '@lib/utils/';

import {Container} from '@lib/components/layout';
import SearchBar from '@lib/components/SearchBar';
import AssetCard from '@lib/components/AssetCard';
import AutoComplete from './AutoComplete';

const Search = ({navigation}) => {
  const inputRef = useRef(null);
  const updateRef = ref => {
    inputRef.current = ref.current;
  };

  const {searchState, searchDispatch} = useContext(SearchContext);
  const {toggles, priceFilter, collections, searchOpen, collection, query} =
    searchState;

  const filterActive =
    (toggles && toggles.length !== 0) ||
    priceFilter.min !== 0 ||
    priceFilter.max ||
    (collections && collections.length !== 0);

  const variables = {
    categories: null,
    chains: null,
    collection,
    collectionQuery: null,
    collectionSortBy: 'SEVEN_DAY_VOLUME',
    collections: collections ? collections.map(item => item.node.slug) : null,
    count: 32,
    cursor: null,
    identity: null,
    includeHiddenCollections: false,
    numericTraits: null,
    paymentAssets: null,
    priceFilter,
    query,
    resultModel: null,
    showContextMenu: false,
    shouldShowQuantity: false,
    sortAscending: null,
    sortBy: null,
    stringTraits: null,
    toggles,
    creator: null,
    assetOwner: null,
    isPrivate: null,
    safelistRequestStatuses: ['APPROVED', 'VERIFIED'],
    isActivityTab: false,
    isListingsTab: true,
    isSingleCollection: false,
  };

  console.log(variables);

  const {loading, error, data, refetch, fetchMore} = useQuery(
    OpenSeaQueries.AssetSearchQuery,
    {
      variables,
    },
  );

  if (error) {
    console.error(error);
  }

  if (!data) {
    return (
      <Container>
        <SearchBar />
        <ActivityIndicator />
      </Container>
    );
  }

  const renderItem = ({item}) => {
    if (item.LOADING) {
      return <ActivityIndicator />;
    }
    if (item.node.asset || item.node.assetBundle) {
      return <AssetCard node={item.node} />;
    }
  };

  const refresh = () => refetch();

  const paginate = () => {
    console.log('fetching more');
    fetchMore({
      variables: {cursor: data.assets.search.pageInfo.endCursor},
      updateQuery: (prev, {fetchMoreResult}) => {
        if (!fetchMoreResult) {
          return prev;
        }

        return {
          assets: {
            ...fetchMoreResult.assets,
            search: {
              ...fetchMoreResult.assets.search,
              edges: [
                ...prev.assets.search.edges,
                ...fetchMoreResult.assets.search.edges,
              ],
            },
          },
        };
      },
    });
  };

  const handleSearchEnter = () => {
    searchDispatch({
      type: REDUCER_TYPES.SET_SEARCH_OPEN,
      payload: false,
    });
    searchDispatch({
      type: REDUCER_TYPES.SET_QUERY,
      payload: searchState.searchText,
    });
  };

  return (
    <Container>
      <SearchBar
        filterActive={filterActive}
        filterDisabled={searchOpen}
        inputUpdateRef={e => {
          updateRef(e);
        }}
        inputRef={inputRef}
        onSubmitEditing={handleSearchEnter}
      />
      {searchOpen && <AutoComplete inputRef={inputRef} />}
      <FlatList
        data={
          data && Object.keys(data.assets).length !== 0
            ? [...data.assets.search.edges, {LOADING: true}]
            : []
        }
        renderItem={renderItem}
        keyExtractor={item => item.cursor}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-around'}}
        onRefresh={refresh}
        refreshing={loading}
        onEndReached={
          data && Object.keys(data.assets).length !== 0 ? paginate : null
        }
      />
    </Container>
  );
};

export default Search;
