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
      ...CollectionStatsBar_data
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
  fragment CollectionStatsBar_data on CollectionType {
    stats {
      numOwners
      totalSupply
      totalVolume
      floorPrice
      id
    }
    slug
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

export const NavSearchQuery = gql`
  query NavSearchQuery($query: String!) {
    accounts(first: 4, query: $query) {
      edges {
        node {
          address
          config
          imageUrl
          relayId
          user {
            publicUsername
            id
          }
          metadata {
            discordUsername
            id
          }
          ...accounts_url
          id
        }
      }
    }
    collections(
      first: 4
      query: $query
      sortBy: SEVEN_DAY_VOLUME
      includeHidden: true
    ) {
      edges {
        node {
          imageUrl
          name
          relayId
          stats {
            totalSupply
            id
          }
          ...verification_data
          ...collection_url
          id
        }
      }
    }
  }

  fragment accounts_url on AccountType {
    address
    user {
      publicUsername
      id
    }
  }

  fragment collection_url on CollectionType {
    slug
  }

  fragment verification_data on CollectionType {
    isMintable
    isSafelisted
    isVerified
  }
`;

export const ItemQuery = gql`
  query itemQuery($archetype: ArchetypeInputType!, $chain: ChainScalar) {
    archetype(archetype: $archetype) {
      asset {
        ...AssetCardHeader_data
        ...assetInputType
        assetContract {
          address
          chain
          blockExplorerLink
          id
        }
        assetOwners(first: 1) {
          edges {
            node {
              quantity
              owner {
                ...AccountLink_data
                id
              }
              id
            }
          }
        }
        creator {
          ...AccountLink_data
          id
        }
        animationUrl
        backgroundColor
        collection {
          description
          displayData {
            cardDisplayStyle
          }
          hidden
          imageUrl
          name
          slug
          ...CollectionLink_collection
          ...Boost_collection
          ...Property_collection
          ...NumericTrait_collection
          ...SocialBar_data
          ...verification_data
          id
        }
        decimals
        description
        imageUrl
        numVisitors
        isDelisted
        isListable
        name
        relayId
        tokenId
        hasUnlockableContent
        favoritesCount
        traits(first: 100) {
          edges {
            node {
              relayId
              displayType
              floatValue
              intValue
              traitType
              value
              ...Boost_trait
              ...Property_trait
              ...NumericTrait_trait
              ...Date_trait
              id
            }
          }
        }
        ...AssetMedia_asset
        ...EnsManualEntryModal_asset
        ...Toolbar_asset
        ...asset_url
        ...itemEvents_data
        ...ChainInfo_data
        id
      }
      ownedQuantity(identity: {})
      ownershipCount
      quantity
      ...TradeStation_archetype_3wquQ2
      ...BidModalContent_archetype_3wquQ2
    }
    tradeSummary(archetype: $archetype) {
      bestAsk {
        closedAt
        orderType
        maker {
          ...wallet_accountKey
          id
        }
        relayId
        id
      }
      ...BidModalContent_trade
      ...TradeStation_data
    }
    assetEvents(archetype: $archetype, first: 11) {
      edges {
        node {
          relayId
          id
        }
      }
    }
  }

  fragment AccountLink_data on AccountType {
    address
    config
    user {
      publicUsername
      id
    }
    metadata {
      discordUsername
      id
    }
    ...ProfileImage_data
    ...wallet_accountKey
    ...accounts_url
  }

  fragment AskPrice_data on OrderV2Type {
    dutchAuctionFinalPrice
    openedAt
    priceFnEndedAt
    makerAssetBundle {
      assetQuantities(first: 30) {
        edges {
          node {
            ...quantity_data
            id
          }
        }
      }
      id
    }
    takerAssetBundle {
      assetQuantities(first: 1) {
        edges {
          node {
            ...AssetQuantity_data
            id
          }
        }
      }
      id
    }
  }

  fragment AssetCardHeader_data on AssetType {
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

  fragment BidModalContent_archetype_3wquQ2 on ArchetypeType {
    asset {
      assetContract {
        address
        chain
        id
      }
      decimals
      relayId
      collection {
        slug
        paymentAssets(chain: $chain) {
          relayId
          asset {
            assetContract {
              address
              chain
              id
            }
            decimals
            symbol
            usdSpotPrice
            relayId
            id
          }
          ...PaymentTokenInputV2_data
          id
        }
        ...verification_data
        id
      }
      id
    }
    quantity
    ownedQuantity(identity: {})
  }

  fragment BidModalContent_trade on TradeSummaryType {
    bestAsk {
      closedAt
      isFulfillable
      oldOrder
      orderType
      relayId
      makerAssetBundle {
        assetQuantities(first: 30) {
          edges {
            node {
              asset {
                collection {
                  ...verification_data
                  id
                }
                id
              }
              id
            }
          }
        }
        id
      }
      takerAssetBundle {
        assetQuantities(first: 1) {
          edges {
            node {
              quantity
              asset {
                decimals
                relayId
                id
              }
              id
            }
          }
        }
        id
      }
      id
    }
    bestBid {
      relayId
      makerAssetBundle {
        assetQuantities(first: 1) {
          edges {
            node {
              quantity
              asset {
                decimals
                id
              }
              ...AssetQuantity_data
              id
            }
          }
        }
        id
      }
      id
    }
  }

  fragment Boost_collection on CollectionType {
    numericTraits {
      key
      value {
        max
        min
      }
    }
    slug
  }

  fragment Boost_trait on TraitType {
    displayType
    floatValue
    intValue
    traitType
  }

  fragment ChainInfo_data on AssetType {
    assetContract {
      openseaVersion
      address
      chain
      blockExplorerLink
      id
    }
    isEditableByOwner {
      value
    }
    tokenId
    isFrozen
    frozenAt
    tokenMetadata
  }

  fragment CollectionLink_collection on CollectionType {
    name
    ...collection_url
  }

  fragment Date_trait on TraitType {
    traitType
    floatValue
    intValue
  }

  fragment EnsManualEntryModal_asset on AssetType {
    assetContract {
      address
      id
    }
    tokenId
  }

  fragment NumericTrait_collection on CollectionType {
    numericTraits {
      key
      value {
        max
        min
      }
    }
    slug
  }

  fragment NumericTrait_trait on TraitType {
    displayType
    floatValue
    intValue
    maxValue
    traitType
  }

  fragment PaymentAsset_data on PaymentAssetType {
    asset {
      assetContract {
        chain
        id
      }
      imageUrl
      symbol
      id
    }
  }

  fragment PaymentTokenInputV2_data on PaymentAssetType {
    relayId
    asset {
      decimals
      symbol
      usdSpotPrice
      id
    }
    ...PaymentAsset_data
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

  fragment ProfileImage_data on AccountType {
    imageUrl
    address
  }

  fragment Property_collection on CollectionType {
    slug
    stats {
      totalSupply
      id
    }
  }

  fragment Property_trait on TraitType {
    displayType
    traitCount
    traitType
    value
  }

  fragment ReportModal_data on AssetType {
    relayId
    ...itemEvents_data
  }

  fragment SocialBar_data on CollectionType {
    discordUrl
    externalUrl
    instagramUsername
    mediumUsername
    slug
    telegramUrl
    twitterUsername
    ...collection_url
  }

  fragment Toolbar_asset on AssetType {
    ...ReportModal_data
    ...asset_url
    ...itemEvents_data
    assetContract {
      address
      chain
      id
    }
    collection {
      externalUrl
      name
      slug
      id
    }
    externalLink
    name
    relayId
    tokenId
  }

  fragment TradeStation_archetype_3wquQ2 on ArchetypeType {
    asset {
      assetContract {
        chain
        id
      }
      assetOwners(first: 1) {
        edges {
          node {
            owner {
              ...wallet_accountKey
              id
            }
            id
          }
        }
      }
      collection {
        ...verification_data
        id
      }
      relayId
      id
    }
    ...BidModalContent_archetype_3wquQ2
  }

  fragment TradeStation_data on TradeSummaryType {
    bestAsk {
      isFulfillable
      closedAt
      dutchAuctionFinalPrice
      openedAt
      orderType
      priceFnEndedAt
      englishAuctionReservePrice
      relayId
      maker {
        ...wallet_accountKey
        id
      }
      makerAssetBundle {
        assetQuantities(first: 30) {
          edges {
            node {
              asset {
                relayId
                assetContract {
                  chain
                  id
                }
                collection {
                  slug
                  ...verification_data
                  id
                }
                ...itemEvents_data
                id
              }
              ...quantity_data
              id
            }
          }
        }
        id
      }
      taker {
        ...wallet_accountKey
        id
      }
      takerAssetBundle {
        assetQuantities(first: 1) {
          edges {
            node {
              quantity
              asset {
                symbol
                decimals
                relayId
                usdSpotPrice
                id
              }
              ...AssetQuantity_data
              id
            }
          }
        }
        id
      }
      ...AskPrice_data
      ...orderLink_data
      ...quantity_remaining
      id
    }
    bestBid {
      makerAssetBundle {
        assetQuantities(first: 1) {
          edges {
            node {
              quantity
              ...AssetQuantity_data
              id
            }
          }
        }
        id
      }
      id
    }
    ...BidModalContent_trade
  }

  fragment accounts_url on AccountType {
    address
    user {
      publicUsername
      id
    }
  }

  fragment assetInputType on AssetType {
    tokenId
    assetContract {
      address
      chain
      id
    }
  }

  fragment asset_url on AssetType {
    assetContract {
      address
      chain
      id
    }
    tokenId
  }

  fragment collection_url on CollectionType {
    slug
  }

  fragment itemEvents_data on AssetType {
    assetContract {
      address
      chain
      id
    }
    tokenId
  }

  fragment orderLink_data on OrderV2Type {
    makerAssetBundle {
      assetQuantities(first: 30) {
        edges {
          node {
            asset {
              externalLink
              collection {
                externalUrl
                id
              }
              id
            }
            id
          }
        }
      }
      id
    }
  }

  fragment quantity_data on AssetQuantityType {
    asset {
      decimals
      id
    }
    quantity
  }

  fragment quantity_remaining on OrderV2Type {
    makerAsset: makerAssetBundle {
      assetQuantities(first: 1) {
        edges {
          node {
            asset {
              decimals
              id
            }
            quantity
            id
          }
        }
      }
      id
    }
    takerAsset: takerAssetBundle {
      assetQuantities(first: 1) {
        edges {
          node {
            asset {
              decimals
              id
            }
            quantity
            id
          }
        }
      }
      id
    }
    remainingQuantity
    side
  }

  fragment verification_data on CollectionType {
    isMintable
    isSafelisted
    isVerified
  }

  fragment wallet_accountKey on AccountType {
    address
  }
`;
