import React from 'react';
import {ActivityIndicator} from 'react-native';

import * as Styled from './styled';

import {useQuery} from '@apollo/client';

import {OpenSeaQueries} from '@lib/utils/';
import Button from '@lib/components/Buttons';

import moment from 'moment';
import Web3 from 'web3';

// TODO: Linking to user accounts

const TradingHistory = ({contractAddress, tokenID}) => {
  let hasNextPage = false;

  const variables = {
    archetype: {
      assetContractAddress: contractAddress,
      tokenId: tokenID,
    },
    bundle: null,
    collections: null,
    categories: null,
    chains: null,
    eventTypes: ['AUCTION_SUCCESSFUL', 'ASSET_TRANSFER'],
    cursor: null,
    count: 10,
    showAll: false,
    identity: null,
  };

  const {loading, error, data, refetch, fetchMore} = useQuery(
    OpenSeaQueries.EventHistoryQuery,
    {
      variables,
    },
  );

  const renderItem = ({node}, index) => {
    let eventType;
    let fromAccount;
    let toAccount;
    let price;
    let date;

    switch (node.eventType) {
      case 'TRANSFER':
        if (node.eventType === 'TRANSFER') {
          eventType = 'Transfer';
        }

        fromAccount = node.fromAccount;

        if (
          fromAccount.address === '0x0000000000000000000000000000000000000000'
        ) {
          eventType = 'Minted';
          fromAccount = null;
        }

        toAccount = node.toAccount;

        break;
      case 'SUCCESSFUL':
        eventType = 'Sale';
        fromAccount = node.seller;
        toAccount = node.winnerAccount;
        price = Web3.utils.fromWei(node.price.quantity, 'ether');
    }

    if (fromAccount) {
      if (fromAccount.user && fromAccount.user.publicUsername) {
        fromAccount = fromAccount.user.publicUsername;
      } else {
        fromAccount = fromAccount.address.substring(2, 7).toUpperCase();
      }
    }
    if (toAccount.user && toAccount.user.publicUsername) {
      toAccount = toAccount.user.publicUsername;
    } else {
      toAccount = toAccount.address.substring(2, 7).toUpperCase();
    }

    date = moment(node.eventTimestamp).fromNow();

    return (
      <Styled.TableRowContainer key={index}>
        <Styled.TableRow>
          <Styled.TableRowItem>{eventType}</Styled.TableRowItem>
          <Styled.TableRowItem>{price ? price : ''}</Styled.TableRowItem>
          <Styled.TableRowItem>
            {fromAccount ? fromAccount : ''}
          </Styled.TableRowItem>
          <Styled.TableRowItem>{toAccount}</Styled.TableRowItem>
          <Styled.TableRowItem>{date}</Styled.TableRowItem>
        </Styled.TableRow>
        <Styled.TableRowDivider />
      </Styled.TableRowContainer>
    );
  };

  if (error) console.error(error);

  if (data) {
    hasNextPage = data.assetEvents.pageInfo.hasNextPage;
  }

  const paginate = () => {
    fetchMore({
      variables: {cursor: data.assetEvents.pageInfo.endCursor},
      updateQuery: (prev, {fetchMoreResult}) => {
        if (!fetchMoreResult) {
          return prev;
        }

        return {
          assetEvents: {
            ...fetchMoreResult.assetEvents,
            edges: [
              ...prev.assetEvents.edges,
              ...fetchMoreResult.assetEvents.edges,
            ],
          },
        };
      },
    });
  };

  return (
    <Styled.Container>
      {loading && <ActivityIndicator />}
      {data && (
        <>
          <Styled.TableHeader>
            <Styled.TableHeaderItem>Event</Styled.TableHeaderItem>
            <Styled.TableHeaderItem>Price</Styled.TableHeaderItem>
            <Styled.TableHeaderItem>From</Styled.TableHeaderItem>
            <Styled.TableHeaderItem>To</Styled.TableHeaderItem>
            <Styled.TableHeaderItem>Date</Styled.TableHeaderItem>
          </Styled.TableHeader>
          {data.assetEvents.edges.map((item, index) => renderItem(item, index))}
          {hasNextPage && (
            <Styled.LoadMoreContainer>
              <Button type="subtle" text="Load More" onPress={paginate} />
            </Styled.LoadMoreContainer>
          )}
        </>
      )}
    </Styled.Container>
  );
};

export default TradingHistory;
