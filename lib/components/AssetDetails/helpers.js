import Web3 from 'web3';

export const getPriceInfo = (node, assetBundle) => {
  let spotPrice;
  let price;
  let priceUSD;
  let saleType;
  let lastSalePrice;
  let lastSalePriceUSD;
  let bestBidPrice;
  let bestBidPriceUSD;

  let onSale = node[assetBundle ? 'assetBundle' : 'asset'].orderData.bestAsk;

  if (onSale) {
    saleType =
      node[assetBundle ? 'assetBundle' : 'asset'].orderData.bestAsk.orderType;
  }

  price = assetBundle
    ? node.assetBundle.orderData.bestAsk.paymentAssetQuantity.quantity
    : node.asset.orderData.bestAsk
    ? node.asset.orderData.bestAsk.paymentAssetQuantity.quantity
    : null;

  spotPrice = assetBundle
    ? node.assetBundle.orderData.bestAsk.paymentAssetQuantity.asset.usdSpotPrice
    : node.asset.orderData.bestAsk
    ? node.asset.orderData.bestAsk.paymentAssetQuantity.asset.usdSpotPrice
    : null;

  if (price && spotPrice) {
    price = parseFloat(Web3.utils.fromWei(price, 'ether'), 10);
    priceUSD = price * spotPrice;
  }

  let lastSale =
    node[assetBundle ? 'assetBundle' : 'asset'].assetEventData.lastSale;

  if (lastSale) {
    lastSalePrice =
      node[assetBundle ? 'assetBundle' : 'asset'].assetEventData.lastSale
        .unitPriceQuantity.quantity;
    lastSalePrice = parseFloat(Web3.utils.fromWei(lastSalePrice, 'ether'), 10);
    spotPrice =
      node[assetBundle ? 'assetBundle' : 'asset'].assetEventData.lastSale
        .unitPriceQuantity.asset.usdSpotPrice;
    lastSalePriceUSD = lastSalePrice * spotPrice;
  }

  let bestBid = node[assetBundle ? 'assetBundle' : 'asset'].orderData.bestBid;

  if (bestBid) {
    bestBidPrice =
      node[assetBundle ? 'assetBundle' : 'asset'].orderData.bestBid
        .paymentAssetQuantity.quantity;
    bestBidPrice = parseFloat(Web3.utils.fromWei(bestBidPrice, 'ether'), 10);
    spotPrice =
      node[assetBundle ? 'assetBundle' : 'asset'].orderData.bestBid
        .paymentAssetQuantity.asset.usdSpotPrice;
    bestBidPriceUSD = bestBidPrice * spotPrice;
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
