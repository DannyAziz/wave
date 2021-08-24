import React, {createContext, useReducer} from 'react';

export const SearchContext = createContext();

// const variables = {
//   categories: null,
//   chains: null,
//   collection: null,
//   collectionQuery: null,
//   collectionSortBy: 'SEVEN_DAY_VOLUME',
//   collections: [],
//   count: 32,
//   cursor: null,
//   identity: null,
//   includeHiddenCollections: false,
//   numericTraits: null,
//   paymentAssets: null,
//   priceFilter: null,
//   query: null,
//   resultModel: null,
//   showContextMenu: false,
//   shouldShowQuantity: false,
//   sortAscending: null,
//   sortBy: null,
//   stringTraits: null,
//   toggles: null,
//   creator: null,
//   assetOwner: null,
//   isPrivate: null,
//   safelistRequestStatuses: ['APPROVED', 'VERIFIED'],
//   isActivityTab: false,
//   isListingsTab: true,
//   isSingleCollection: false,
// };

export const REDUCER_TYPES = {
  SET_TOGGLE: 'SET_TOGGLE',
  SET_PRICE_FILTER: 'SET_PRICE_FILTER',
  SET_COLLECTIONS: 'SET_COLLECTIONS',
};

export const initialState = {
  toggles: null,
  priceFilter: {symbol: 'USD', min: 0},
  collections: null,
};

function reducer(state, action) {
  switch (action.type) {
    case REDUCER_TYPES.SET_TOGGLE:
      if (state.toggles) {
        let toggles = JSON.parse(JSON.stringify(state.toggles));
        if (toggles.includes(action.payload)) {
          let index = toggles.indexOf(action.payload);
          if (index > -1) {
            toggles.splice(index, 1);
          }
        } else if (!toggles.includes(action.payload)) {
          toggles.push(action.payload);
        }
        return {...state, toggles};
      } else {
        return {...state, toggles: [action.payload]};
      }
    case REDUCER_TYPES.SET_COLLECTIONS:
      if (state.collections) {
        let collections = JSON.parse(JSON.stringify(state.collections));
        let index = collections.findIndex(
          collection => collection.cursor === action.payload.cursor,
        );
        if (index > -1) {
          collections.splice(index, 1);
        } else {
          collections.push(action.payload);
        }
        return {...state, collections};
      } else {
        return {...state, collections: [action.payload]};
      }
    case REDUCER_TYPES.SET_PRICE_FILTER:
      return {...state, priceFilter: action.payload};
  }

  return state;
}

export const SearchContextProvider = props => {
  const [searchState, searchDispatch] = useReducer(reducer, initialState);

  return (
    <SearchContext.Provider value={{searchState, searchDispatch}}>
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
