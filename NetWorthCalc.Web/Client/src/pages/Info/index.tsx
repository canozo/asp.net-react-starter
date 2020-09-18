import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import MonthlyReport from '../../interfaces/MonthlyReport';
import Asset from '../../interfaces/Asset';
import Liability from '../../interfaces/Liability';
import AssetComponent from '../../components/Asset';
import Body from '../../components/Body';
import './Info.scss';

const Info: React.FC = () => {
  const [monthlyReport, setMonthlyReport] = useState<MonthlyReport | null>(null);
  const [assets, setAssets] = useState<Array<Asset> | null>(null);
  const [liabilities, setLiabilities] = useState<Array<Liability> | null>(null);
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
        setAssets(result.assets);
        setLiabilities(result.liabilities);

        result.assets = [];
        result.liabilities = [];
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
    if (assets == null) {
      return;
    }

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
        const newAssets = assets.map(a => a);
        newAssets.push(result);
        setAssets(newAssets);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addLiability = async () => {
    if (liabilities == null) {
      return;
    }

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
        const newLiabilities = liabilities.map(a => a);
        newLiabilities.push(result);
        setLiabilities(newLiabilities);
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
            {assets?.map((asset, index) => (
              <AssetComponent
                key={asset.assetId}
                index={index}
                asset={asset}
                onDelete={() => setAssets(assets.filter(a => a.assetId !== asset.assetId))}
              />
            ))}
          </div>

          <div className="col-lg mt-3">
            {/* Liabilities */}
            <p className="form-label">Liabilities</p>
            <button type="button" className="btn btn-primary mb-3" onClick={addLiability}>
              Add new liability
            </button>
            {liabilities?.map(liability => (
              <div key={liability.liabilityId}>{liability.liabilityId}</div>
            ))}
          </div>
        </div>
      </div>
    </Body>
  );
};

export default Info;
