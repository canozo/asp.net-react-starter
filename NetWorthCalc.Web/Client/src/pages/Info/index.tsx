import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import MonthlyReport, { clone } from '../../interfaces/MonthlyReport';
import Asset from '../../interfaces/Asset';
import Liability from '../../interfaces/Liability';
import Body from '../../components/Body';
import './Info.scss';

const Info: React.FC = () => {
  const [monthlyReport, setMonthlyReport] = useState<MonthlyReport | null>(null);
  const { getAccessTokenSilently } = useAuth0();
  const location = useLocation();
  const history = useHistory();

  const path = location.pathname.split('/');
  const monthlyReportId = path[path.length - 1];

  useEffect(() => {
    const getData = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(`/api/monthlyreport/${monthlyReportId}`, {
          method: 'get',
          headers: {
            Authorization: `Bearer ${token}`
          },
        });

        if (!response.ok) {
          history.push('/app');
          return;
        }

        const result: MonthlyReport = await response.json();
        setMonthlyReport(result);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const deleteMonthlyReport = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`/api/monthlyreport/${monthlyReportId}`, {
        method: 'delete',
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      if (response.ok) {
        history.push('/app');
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addAsset = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`/api/asset/${monthlyReportId}`, {
        method: 'post',
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      if (response.ok) {
        const result: Asset = await response.json();
        const newReport: MonthlyReport | null = clone(monthlyReport);
        newReport?.assets.push(result);
        setMonthlyReport(newReport);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addLiability = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`/api/liability/${monthlyReportId}`, {
        method: 'post',
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      if (response.ok) {
        const result: Liability = await response.json();
        const newReport: MonthlyReport | null = clone(monthlyReport);
        newReport?.liabilities.push(result);
        setMonthlyReport(newReport);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeAssetName = async (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newReport: MonthlyReport | null = clone(monthlyReport);
    if (newReport === null) {
      return;
    }
    newReport.assets[index].name = event.target.value;
    setMonthlyReport(newReport);
  };

  const changeAssetAmount = async (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const number = Number(event.target.value);
    if (number < 0) {
      return;
    }

    const newReport: MonthlyReport | null = clone(monthlyReport);
    if (newReport === null) {
      return;
    }
    newReport.assets[index].amount = number;
    setMonthlyReport(newReport);
  };

  const deleteAsset = async (asset: Asset) => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`/api/asset/${asset.assetId}`, {
        method: 'delete',
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      if (response.ok) {
        const newReport: MonthlyReport | null = clone(monthlyReport);
        if (newReport === null) {
          return;
        }
        newReport.assets = newReport.assets.filter(a => a.assetId !== asset.assetId);
        setMonthlyReport(newReport);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (monthlyReport == null) {
    return (
      <Body
        title="Monthly report information"
        subtitle="Modify your monthly report information."
      >
        <div className="d-flex min-vh-100 align-items-center justify-content-center">
          <div className="spinner-border text-dark" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </Body>
    );
  }

  return (
    <Body
      title="Monthly report information"
      subtitle="Modify your monthly report information."
    >
      <button type="button" className="btn btn-danger" onClick={deleteMonthlyReport}>
        Delete monthly report
      </button>
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg mt-3">
            {/* Assets */}
            <p className="form-label">Assets</p>
            <button type="button" className="btn btn-primary mb-3" onClick={addAsset}>
              Add new asset
            </button>
            {monthlyReport.assets.map((asset, index) => (
              <div key={asset.assetId} className="mb-5">
                <div className="mb-1">
                  <label htmlFor={`assetName#${index}`} className="form-label">
                    Asset name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id={`assetName#${index}`}
                    value={asset.name}
                    onChange={event => changeAssetName(event, index)}
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
                    value={asset.amount}
                    onChange={event => changeAssetAmount(event, index)}
                  />
                </div>
                <div className="mb-1">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteAsset(asset)}
                  >
                    Delete asset
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="col-lg mt-3">
            {/* Liabilities */}
            <p className="form-label">Liabilities</p>
            <button type="button" className="btn btn-primary mb-3" onClick={addLiability}>
              Add new liability
            </button>
            {monthlyReport.liabilities.map(liability => (
              <div key={liability.liabilityId}>{liability.liabilityId}</div>
            ))}
          </div>
        </div>
      </div>
    </Body>
  );
};

export default Info;
