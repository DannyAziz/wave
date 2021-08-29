import Web3 from 'web3';

export const getPriceInfo = (node, assetBundle) => {
  let onSale;
  let lastSale;
  let bestBid;
  let spotPrice;
  let price;
  let priceUSD;
  let saleType;
  let lastSalePrice;
  let lastSalePriceUSD;
  let bestBidPrice;
  let bestBidPriceUSD;

  if (node) {
    onSale = node[assetBundle ? 'assetBundle' : 'asset'].orderData.bestAsk;

    if (onSale) {
      saleType =
        node[assetBundle ? 'assetBundle' : 'asset'].orderData.bestAsk.orderType;
    }

    price = assetBundle
      ? node.assetBundle.orderData.bestAsk.paymentAssetQuantity.quantity
      : node.asset.orderData.bestAsk
      ? node.asset.orderData.bestAsk.paymentAssetQuantity
        ? node.asset.orderData.bestAsk.paymentAssetQuantity.quantity
        : node.asset.orderData.bestAsk.takerAssetBundle.assetQuantities.edges[0]
            .node.quantity
      : null;

    spotPrice = assetBundle
      ? node.assetBundle.orderData.bestAsk.paymentAssetQuantity.asset
          .usdSpotPrice
      : node.asset.orderData.bestAsk
      ? node.asset.orderData.bestAsk.paymentAssetQuantity
        ? node.asset.orderData.bestAsk.paymentAssetQuantity.asset.usdSpotPrice
        : node.asset.orderData.bestAsk.takerAssetBundle.assetQuantities.edges[0]
            .node.asset.usdSpotPrice
      : null;

    if (price && spotPrice) {
      price = parseFloat(Web3.utils.fromWei(price, 'ether'), 10);
      priceUSD = price * spotPrice;
    }

    lastSale = node[assetBundle ? 'assetBundle' : 'asset'].assetEventData
      ? node[assetBundle ? 'assetBundle' : 'asset'].assetEventData.lastSale
      : null;

    if (lastSale && lastSale.unitPriceQuantity.asset.symbol === 'ETH') {
      lastSalePrice =
        node[assetBundle ? 'assetBundle' : 'asset'].assetEventData.lastSale
          .unitPriceQuantity.quantity;
      lastSalePrice = parseFloat(
        Web3.utils.fromWei(lastSalePrice, 'ether'),
        10,
      );
      spotPrice =
        node[assetBundle ? 'assetBundle' : 'asset'].assetEventData.lastSale
          .unitPriceQuantity.asset.usdSpotPrice;
      lastSalePriceUSD = lastSalePrice * spotPrice;
    } else {
      lastSale = null;
    }

    bestBid = node[assetBundle ? 'assetBundle' : 'asset'].orderData.bestBid;
    let bidBundleItem;

    if (bestBid) {
      bidBundleItem = Object.prototype.hasOwnProperty.call(
        bestBid,
        'makerAssetBundle',
      );
    }

    if (
      !bidBundleItem &&
      bestBid &&
      bestBid.paymentAssetQuantity.asset.symbol === 'ETH'
    ) {
      bestBidPrice =
        node[assetBundle ? 'assetBundle' : 'asset'].orderData.bestBid
          .paymentAssetQuantity.quantity;
      bestBidPrice = parseFloat(Web3.utils.fromWei(bestBidPrice, 'ether'), 10);
      spotPrice =
        node[assetBundle ? 'assetBundle' : 'asset'].orderData.bestBid
          .paymentAssetQuantity.asset.usdSpotPrice;
      bestBidPriceUSD = bestBidPrice * spotPrice;
    } else if (bidBundleItem) {
      bestBidPrice =
        bestBid.makerAssetBundle.assetQuantities.edges[0].node.quantity;
      bestBidPrice = parseFloat(Web3.utils.fromWei(bestBidPrice, 'ether'), 10);
      spotPrice =
        bestBid.makerAssetBundle.assetQuantities.edges[0].node.asset
          .usdSpotPrice;
      bestBidPriceUSD = bestBidPrice * spotPrice;
    } else {
      bestBid = null;
    }
  }

  return {
    onSale,
    price,
    priceUSD,
    saleType,
    lastSale,
    bestBid,
    lastSalePrice,
    lastSalePriceUSD,
    bestBidPrice,
    bestBidPriceUSD,
  };
};
