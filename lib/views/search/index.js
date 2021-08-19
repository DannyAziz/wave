import React, {useCallback, useMemo, useRef, useState} from 'react';
import {Text, FlatList, ActivityIndicator} from 'react-native';
import {useQuery} from '@apollo/client';

import {OpenSeaQueries} from '@lib/utils/';

import {Container} from '@lib/components/layout';
import SearchBar from '@lib/components/SearchBar';
import AssetCard from '@lib/components/AssetCard';

const Search = ({navigation}) => {
  const variables = {
    categories: null,
    chains: null,
    collection: null,
    collectionQuery: null,
    collectionSortBy: 'SEVEN_DAY_VOLUME',
    collections: [],
    count: 32,
    cursor: null,
    identity: null,
    includeHiddenCollections: false,
    numericTraits: null,
    paymentAssets: null,
    priceFilter: null,
    query: null,
    resultModel: null,
    showContextMenu: false,
    shouldShowQuantity: false,
    sortAscending: null,
    sortBy: null,
    stringTraits: null,
    toggles: null,
    creator: null,
    assetOwner: null,
    isPrivate: null,
    safelistRequestStatuses: ['APPROVED', 'VERIFIED'],
    isActivityTab: false,
    isListingsTab: true,
    isSingleCollection: false,
  };

  const {loading, error, data, refetch, fetchMore} = useQuery(
    OpenSeaQueries.AssetSearchQuery,
    {
      variables,
    },
  );

  if (!data) {
    return <Text />;
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

  console.log(data, data.assets.search.edges.length);

  return (
    <Container>
      <SearchBar />
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
        onEndReached={paginate}
      />
    </Container>
  );
};

export default Search;
