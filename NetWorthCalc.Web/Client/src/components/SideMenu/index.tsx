import React, { useState } from 'react';
import './SideMenu.scss';

const SideMenu: React.FC = () => {
  const [shrink, setShrink] = useState(false);

  return (
    <div id="side-menu" className={shrink ? 'shrink' : ''}>
      <button type="button" onClick={() => setShrink(!shrink)}>
        {shrink ? '>' : '<'}
      </button>
    </div>
  );
};

export default SideMenu;
