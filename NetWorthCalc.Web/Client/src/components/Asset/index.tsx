import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Asset from '../../interfaces/Asset';

interface Props {
  index: number;
  asset: Asset;
  onDelete: () => void;
};

const AssetComponent: React.FC<Props> = ({ index, asset, onDelete }) => {
  const [name, setName] = useState(asset.name);
  const [amount, setAmount] = useState(asset.amount);

  const { getAccessTokenSilently } = useAuth0();

  const changeAssetName = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const token = await getAccessTokenSilently();
      const body = {
        name: event.target.value,
        amount: amount,
      };

      const response = await fetch(`/api/asset/${asset.assetId}`, {
        method: 'put',
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setName(event.target.value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeAssetAmount = async (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const number = Number(event.target.value);
    if (number < 0) {
      return;
    }

    setAmount(number);
  };

  const deleteAsset = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`/api/asset/${asset.assetId}`, {
        method: 'delete',
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      if (response.ok) {
        onDelete();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mb-5">
      <div className="mb-1">
        <label htmlFor={`assetName#${index}`} className="form-label">
          Asset name
        </label>
        <input
          type="text"
          className="form-control"
          id={`assetName#${index}`}
          value={name}
          onChange={event => changeAssetName(event)}
        />
      </div>
      <div className="mb-1">
        <label htmlFor={`assetAmount#${index}`} className="form-label">
          Asset amount
        </label>
        <input
          type="number"
          className="form-control"
          id={`assetAmount#${index}`}
          value={amount}
          onChange={event => changeAssetAmount(event, index)}
        />
      </div>
      <div className="mb-1">
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => deleteAsset()}
        >
          Delete asset
        </button>
      </div>
    </div>
  );
};

export default AssetComponent;
