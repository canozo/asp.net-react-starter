import React, { useState, useEffect, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Liability from '../../interfaces/Liability';

interface Props {
  index: number;
  liability: Liability;
  onDelete: () => void;
};

const LiabilityComponent: React.FC<Props> = ({ index, liability, onDelete }) => {
  const [name, setName] = useState(liability.name);
  const [amount, setAmount] = useState(liability.amount);
  const timer = useRef<number | null>(null);
  const fetched = useRef<boolean>(false);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (!fetched.current) {
      fetched.current = true;
      return;
    }

    if (timer.current !== null) {
      clearTimeout(timer.current);
      timer.current = null;
    }

    timer.current = window.setTimeout(async () => {
      timer.current = null;
      try {
        const token = await getAccessTokenSilently();
        fetch(`/api/liability/${liability.liabilityId}`, {
          method: 'put',
          body: JSON.stringify({ name, amount }),
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.log(error);
      }
    }, 3000);
  }, [name, amount]); // eslint-disable-line

  const changeLiabilityName = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const changeLiabilityAmount = async (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const number = Number(event.target.value);
    if (number < 0) {
      return;
    }
    setAmount(number);
  };

  const deleteLiability = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`/api/liability/${liability.liabilityId}`, {
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
        <label htmlFor={`liabilityName#${index}`} className="form-label">
          Liability name
        </label>
        <input
          type="text"
          placeholder="Credit cards"
          className="form-control"
          id={`liabilityName#${index}`}
          value={name}
          onChange={event => changeLiabilityName(event)}
        />
      </div>
      <div className="mb-1">
        <label htmlFor={`liabilityAmount#${index}`} className="form-label">
          Liability amount
        </label>
        <div className="input-group mb-3">
          <span className="input-group-text">$</span>
          <input
            type="number"
            placeholder="250000"
            className="form-control"
            id={`liabilityAmount#${index}`}
            value={amount}
            onChange={event => changeLiabilityAmount(event, index)}
          />
        </div>
      </div>
      <div className="mt-2">
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => deleteLiability()}
        >
          Delete liability
        </button>
      </div>
    </div>
  );
};

export default LiabilityComponent;
