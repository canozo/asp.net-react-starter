import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Power, ArrowLeft, ArrowRight, Briefcase, PlusSquare, Calendar } from 'react-feather';
import './SideMenu.scss';

const SideMenu: React.FC = () => {
  const [shrink, setShrink] = useState(false);
  const { logout, user } = useAuth0();
  const history = useHistory();

  console.log(user);

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

      {/* Options and avatar */}
      <div className="options d-flex flex-column justify-content-evenly align-items-center">
        <div className="option text-center" onClick={() => history.push('/app/reports')}>
          <button
            type="button"
            className="btn btn-light btn-icon"
            onClick={() => history.push('/app/reports')}
          >
            <Briefcase />
          </button>
          {shrink ? null : <p className="opt-text pt-2 css-fade">Monthly Reports</p>}
        </div>
        <div className="option text-center" onClick={() => history.push('/app/new')}>
          <button
            type="button"
            className="btn btn-light btn-icon"
            onClick={() => history.push('/app/new')}
          >
            <PlusSquare />
          </button>
          {shrink ? null : <p className="opt-text pt-2 css-fade">New Monthly Report</p>}
        </div>
        <div className="option text-center" onClick={() => history.push('/app/history')}>
          <button
            type="button"
            className="btn btn-light btn-icon"
            onClick={() => history.push('/app/history')}
          >
            <Calendar />
          </button>
          {shrink ? null : <p className="opt-text pt-2 css-fade">History</p>}
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
