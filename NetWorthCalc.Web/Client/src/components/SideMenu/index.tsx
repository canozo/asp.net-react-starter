import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Power, ArrowLeft, ArrowRight, Briefcase, PlusSquare, Calendar } from 'react-feather';
import NetWorth from '../../interfaces/NetWorth';
import './SideMenu.scss';

const SideMenu: React.FC = () => {
  const [networth, setNetworth] = useState(0.0);
  const [shrink, setShrink] = useState(window.innerWidth < 768);
  const { getAccessTokenSilently, logout, user } = useAuth0();
  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      const token = await getAccessTokenSilently();
      const response = await fetch('/api/yearlyreport/latest', {
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      if (response.ok) {
        const resData: NetWorth = await response.json();
        setNetworth(resData.total);
      }
    };
    getData();
  }, []); // eslint-disable-line

  let classNames = 'd-flex flex-column justify-content-around align-items-center';
  if (shrink) {
    classNames += ' shrink';
  }

  return (
    <div id="side-menu" className={classNames}>
      {/* Toggle shrink */}
      <button
        type="button"
        className="btn btn-light btn-icon"
        onClick={() => setShrink(!shrink)}
      >
        {shrink ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
      </button>

      {/* Options and user info */}
      <div className="options d-flex flex-column justify-content-between align-items-center">
        {/* User info */}
        <div className="d-flex flex-column justify-content-between align-items-center">
          <img className="avatar" src={user.picture} alt="Your profile" />
          <p className="user-name">{user.email}</p>
          <p className="user-name">Latest Net Worth: </p> ${networth}
        </div>

        {/* Options */}
        <div className="d-flex flex-column h-100 justify-content-evenly align-items-start">
          <div className="option" onClick={() => history.push('/app/new')}>
            <button
              type="button"
              className="btn btn-light btn-icon"
              onClick={() => history.push('/app/new')}
            >
              <PlusSquare />
            </button>
            {shrink ? null : <span className="opt-text css-fade">New Report</span>}
          </div>

          <div className="option" onClick={() => history.push('/app/reports')}>
            <button
              type="button"
              className="btn btn-light btn-icon"
              onClick={() => history.push('/app/reports')}
            >
              <Briefcase />
            </button>
            {shrink ? null : <span className="opt-text css-fade">Monthly Reports</span>}
          </div>

          <div className="option" onClick={() => history.push('/app/history')}>
            <button
              type="button"
              className="btn btn-light btn-icon"
              onClick={() => history.push('/app/history')}
            >
              <Calendar />
            </button>
            {shrink ? null : <span className="opt-text css-fade">History</span>}
          </div>
        </div>
      </div>

      {/* Exit */}
      <button
        type="button"
        className="btn btn-light btn-icon"
        onClick={() => logout({ returnTo: window.location.origin })}
      >
        <Power size={18} />
      </button>
    </div>
  );
};

export default SideMenu;
