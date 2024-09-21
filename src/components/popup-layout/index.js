import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function PopupLayout({ children }) {
  const cn = bem('PageLayout');

  return (
    <div className = "Popup">
        <div className="Popup-inner">
            {children}
        </div>
    </div>
  );
}

PopupLayout.propTypes = {
  children: PropTypes.node,
};

export default React.memo(PopupLayout);