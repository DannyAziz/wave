import {gql} from '@apollo/client';

export const AssetSearchQuery = gql`
  query assetsQuery(
    $categories: [CollectionSlug!]
    $chains: [ChainScalar!]
    $collection: CollectionSlug
    $collections: [CollectionSlug!]
    $collectionQuery: String
    $collectionSortBy: CollectionSort
    $count: Int
    $cursor: String
    $isListingsTab: Boolean! = false
    $isActivityTab: Boolean! = false
    $isSingleCollection: Boolean! = false
    $numericTraits: [TraitRangeType!]
    $paymentAssets: [PaymentAssetSymbol!]
    $priceFilter: PriceFilterType
    $query: String
    $resultModel: SearchResultModel
    $sortAscending: Boolean
    $sortBy: SearchSortBy
    $stringTraits: [TraitInputType!]
    $toggles: [SearchToggle!]
    $safelistRequestStatuses: [SafelistRequestStatus!]
  ) {
    assets: query @include(if: $isListingsTab) {
      ...AssetSearch_data_23HkA5
    }
    activity: query @include(if: $isActivityTab) {
      ...ActivitySearch_data_2eDEPY
    }
  }

  fragment ActivitySearchFilter_data_yLmsP on Query {
    ...CollectionFilter_data_rfWZ1
  }

  fragment ActivitySearch_data_2eDEPY on Query {
    collection(collection: $collection) @include(if: $isSingleCollection) {
      includeTradingHistory
      id
    }
    ...CollectionHeadMetadata_data_2YoIWt
    ...ActivitySearchFilter_data_yLmsP
    ...SearchPills_data_2Kg4Sq
  }

  fragment AssetCardContent_asset on AssetType {
    relayId
    name
    ...AssetMedia_asset
    assetContract {
      address
      chain
      openseaVersion
      id
    }
    tokenId
    collection {
      slug
      id
    }
    isDelisted
  }

  fragment AssetCardContent_assetBundle on AssetBundleType {
    assetQuantities(first: 18) {
      edges {
        node {
          asset {
            relayId
            ...AssetMedia_asset
            id
          }
          id
        }
      }
    }
  }

  fragment AssetCardFooter_assetBundle on AssetBundleType {
    name
    assetCount
    assetQuantities(first: 18) {
      edges {
        node {
          asset {
            collection {
              name
              relayId
              isVerified
              id
            }
            id
          }
          id
        }
      }
    }
    assetEventData {
      lastSale {
        unitPriceQuantity {
          ...AssetQuantity_data
          id
        }
      }
    }
    orderData {
      bestBid {
        orderType
        paymentAssetQuantity {
          ...AssetQuantity_data
          id
        }
      }
      bestAsk {
        closedAt
        orderType
        dutchAuctionFinalPrice
        openedAt
        priceFnEndedAt
        quantity
        decimals
        paymentAssetQuantity {
          quantity
          ...AssetQuantity_data
          id
        }
      }
    }
  }

  fragment AssetCardFooter_asset_2V84VL on AssetType {
    name
    tokenId
    collection {
      name
      isVerified
      id
    }
    hasUnlockableContent
    isDelisted
    isFrozen
    assetContract {
      address
      chain
      openseaVersion
      id
    }
    assetEventData {
      firstTransfer {
        timestamp
      }
      lastSale {
        unitPriceQuantity {
          ...AssetQuantity_data
          id
        }
      }
    }
    decimals
    orderData {
      bestBid {
        orderType
        paymentAssetQuantity {
          ...AssetQuantity_data
          id
        }
      }
      bestAsk {
        closedAt
        orderType
        dutchAuctionFinalPrice
        openedAt
        priceFnEndedAt
        quantity
        decimals
        paymentAssetQuantity {
          quantity
          ...AssetQuantity_data
          id
        }
      }
    }
  }

  fragment AssetCardHeader_data_3z3gbW on AssetType {
    relayId
    favoritesCount
    isDelisted
    isFavorite
  }

  fragment AssetMedia_asset on AssetType {
    animationUrl
    backgroundColor
    collection {
      displayData {
        cardDisplayStyle
      }
      id
    }
    isDelisted
    displayImageUrl
  }

  fragment AssetQuantity_data on AssetQuantityType {
    asset {
      ...Price_data
      id
    }
    quantity
  }

  fragment AssetSearchFilter_data_2Urq7C on Query {
    ...CollectionFilter_data_2UnRVu
    collection(collection: $collection) {
      numericTraits {
        key
        value {
          max
          min
        }
        ...NumericTraitFilter_data
      }
      stringTraits {
        key
        ...StringTraitFilter_data
      }
      id
    }
    ...PaymentFilter_data_2YoIWt
  }

  fragment AssetSearchList_data_3JpaAE on SearchResultType {
    asset {
      assetContract {
        address
        chain
        id
      }
      collection {
        isVerified
        id
      }
      relayId
      tokenId
      ...AssetSelectionItem_data
      ...asset_url
      id
    }
    assetBundle {
      relayId
      id
    }
    ...Asset_data_3JpaAE
  }

  fragment AssetSearch_data_23HkA5 on Query {
    ...CollectionHeadMetadata_data_2YoIWt
    ...AssetSearchFilter_data_2Urq7C
    ...SearchPills_data_2Kg4Sq
    search(
      after: $cursor
      chains: $chains
      categories: $categories
      collections: $collections
      first: $count
      numericTraits: $numericTraits
      paymentAssets: $paymentAssets
      priceFilter: $priceFilter
      querystring: $query
      resultType: $resultModel
      sortAscending: $sortAscending
      sortBy: $sortBy
      stringTraits: $stringTraits
      toggles: $toggles
      safelistRequestStatuses: $safelistRequestStatuses
    ) {
      edges {
        node {
          ...AssetSearchList_data_3JpaAE
          __typename
        }
        cursor
      }
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }

  fragment AssetSelectionItem_data on AssetType {
    backgroundColor
    collection {
      displayData {
        cardDisplayStyle
      }
      imageUrl
      id
    }
    imageUrl
    name
    relayId
  }

  fragment Asset_data_3JpaAE on SearchResultType {
    asset {
      assetContract {
        chain
        id
      }
      isDelisted
      ...AssetCardHeader_data_3z3gbW
      ...AssetCardContent_asset
      ...AssetCardFooter_asset_2V84VL
      ...AssetMedia_asset
      ...asset_url
      ...itemEvents_data
      id
    }
    assetBundle {
      slug
      ...AssetCardContent_assetBundle
      ...AssetCardFooter_assetBundle
      id
    }
  }

  fragment CollectionFilter_data_2UnRVu on Query {
    selectedCollections: collections(
      first: 25
      collections: $collections
      includeHidden: true
    ) {
      edges {
        node {
          assetCount
          imageUrl
          name
          slug
          id
        }
      }
    }
    collections(
      chains: $chains
      first: 100
      includeHidden: false
      parents: $categories
      query: $collectionQuery
      sortBy: $collectionSortBy
    ) {
      edges {
        node {
          assetCount
          imageUrl
          name
          slug
          id
          __typename
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }

  fragment CollectionFilter_data_rfWZ1 on Query {
    selectedCollections: collections(
      first: 25
      collections: $collections
      includeHidden: true
    ) {
      edges {
        node {
          assetCount
          imageUrl
          name
          slug
          id
        }
      }
    }
    collections(
      chains: $chains
      first: 100
      includeHidden: false
      parents: $categories
      query: $collectionQuery
      sortBy: $collectionSortBy
    ) {
      edges {
        node {
          assetCount
          imageUrl
          name
          slug
          id
          __typename
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }

  fragment CollectionHeadMetadata_data_2YoIWt on Query {
    collection(collection: $collection) {
      bannerImageUrl
      description
      imageUrl
      name
      id
    }
  }

  fragment CollectionModalContent_data on CollectionType {
    description
    imageUrl
    name
    slug
  }

  fragment NumericTraitFilter_data on NumericTraitTypePair {
    key
    value {
      max
      min
    }
  }

  fragment PaymentFilter_data_2YoIWt on Query {
    paymentAssets(first: 10) {
      edges {
        node {
          symbol
          relayId
          id
          __typename
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
    PaymentFilter_collection: collection(collection: $collection) {
      paymentAssets {
        symbol
        relayId
        id
      }
      id
    }
  }

  fragment Price_data on AssetType {
    decimals
    imageUrl
    symbol
    usdSpotPrice
    assetContract {
      blockExplorerLink
      chain
      id
    }
  }

  fragment SearchPills_data_2Kg4Sq on Query {
    selectedCollections: collections(
      first: 25
      collections: $collections
      includeHidden: true
    ) {
      edges {
        node {
          imageUrl
          name
          slug
          ...CollectionModalContent_data
          id
        }
      }
    }
  }

  fragment StringTraitFilter_data on StringTraitType {
    counts {
      count
      value
    }
    key
  }

  fragment asset_url on AssetType {
    assetContract {
      address
      chain
      id
    }
    tokenId
  }

  fragment itemEvents_data on AssetType {
    assetContract {
      address
      chain
      id
    }
    tokenId
  }
`;

export const CollectionFilterQuery = gql`
  query CollectionFilterQuery(
    $assetOwner: IdentityInputType
    $categories: [CollectionSlug!]
    $chains: [ChainScalar!]
    $collections: [CollectionSlug!]
    $count: Int
    $cursor: String
    $includeHidden: Boolean
    $query: String
    $sortBy: CollectionSort
  ) {
    query {
      ...CollectionFilter_data_421KmG
    }
  }

  fragment CollectionFilter_data_421KmG on Query {
    selectedCollections: collections(
      first: 25
      collections: $collections
      includeHidden: true
    ) {
      edges {
        node {
          assetCount
          imageUrl
          name
          slug
          id
        }
      }
    }
    collections(
      after: $cursor
      assetOwner: $assetOwner
      chains: $chains
      first: $count
      includeHidden: $includeHidden
      parents: $categories
      query: $query
      sortBy: $sortBy
    ) {
      edges {
        node {
          assetCount
          imageUrl
          name
          slug
          id
          __typename
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
