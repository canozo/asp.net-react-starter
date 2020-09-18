export default interface Asset {
  assetId: string;
  createdOn: string;
  name: string;
  amount: number;
};

export function clone(asset: Asset | null): Asset | null {
  if (asset === null) {
    return null;
  }

  return {
    assetId: asset.assetId,
    createdOn: asset.createdOn,
    name: asset.name,
    amount: asset.amount,
  };
};
