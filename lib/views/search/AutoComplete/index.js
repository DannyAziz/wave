import React, {useContext} from 'react';
import {ActivityIndicator, Pressable} from 'react-native';
import {useQuery} from '@apollo/client';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import * as Styled from './styled';

import {SearchContext, REDUCER_TYPES} from '@lib/utils/context';

import {OpenSeaQueries} from '@lib/utils/';
import Avatar from '@lib/components/Avatar';

const AutoComplete = props => {
  const {searchState, searchDispatch} = useContext(SearchContext);
  const {loading, error, data, refetch, fetchMore} = useQuery(
    OpenSeaQueries.NavSearchQuery,
    {
      variables: {
        query: searchState.searchText,
      },
    },
  );
  if (error) console.error(error);

  const handlePress = item => {
    ReactNativeHapticFeedback.trigger('impactMedium');
    searchDispatch({
      type: REDUCER_TYPES.SET_COLLECTION,
      payload: item.node.slug,
    });
    searchDispatch({
      type: REDUCER_TYPES.SET_COLLECTIONS,
      payload: item,
    });
    searchDispatch({
      type: REDUCER_TYPES.SET_SEARCH_OPEN,
      payload: false,
    });
    if (props.inputRef.current) {
      props.inputRef.current.blur();
    }
  };

  return (
    <Styled.Container>
      {loading && <ActivityIndicator size="large" />}
      {data && (
        <>
          <Styled.Section>
            <Styled.Message>Press Enter To Search All Results</Styled.Message>
            <Styled.SectionTitle>Collections</Styled.SectionTitle>
            <Styled.Results>
              {data.collections.edges.map((item, index) => (
                <Pressable key={index} onPress={() => handlePress(item)}>
                  <Avatar image={item.node.imageUrl} name={item.node.name} />
                </Pressable>
              ))}
            </Styled.Results>
          </Styled.Section>
          {/* <Styled.Section>
            <Styled.SectionTitle>Accounts</Styled.SectionTitle>
            {data.accounts.edges.map((item, index) => (
              <Pressable onPress={() => {}}>
                <Avatar
                  image={item.node.imageUrl}
                  name={item.node.user.publicUsername}
                />
              </Pressable>
            ))}
          </Styled.Section> */}
        </>
      )}
    </Styled.Container>
  );
};

export default AutoComplete;
