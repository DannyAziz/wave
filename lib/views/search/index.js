import React, {useCallback, useMemo, useRef} from 'react';
import {SafeAreaView, ScrollView, Text, Button, View} from 'react-native';
import {useQuery} from '@apollo/client';

import {Container} from '@lib/components/layout';

import {OpenSeaQueries} from '@lib/utils/';

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

  const {loading, error, data} = useQuery(OpenSeaQueries.AssetSearchQuery, {
    variables,
  });
  console.log('Response:', data);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!data) {
    return <Text></Text>;
  }

  const renderResults = () => {
    return data.assets.search.edges.map(item => {
      if (item.node.asset) {
        return <AssetCard key={item.node.asset.id} node={item.node} />;
      }
    });
  };

  return (
    <Container>
      <ScrollView style={{padding: 20}}>{renderResults()}</ScrollView>
    </Container>
  );
};

export default Search;
