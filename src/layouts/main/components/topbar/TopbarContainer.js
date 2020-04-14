import React from 'react';
import PropTypes from 'prop-types';

import Topbar from './Topbar';

const TopbarContainer = ({ className, onSidebarOpen }) => <Topbar className={className} onSidebarOpen={onSidebarOpen} />;

TopbarContainer.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func.isRequired,
};

export default TopbarContainer;
