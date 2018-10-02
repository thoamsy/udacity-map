import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const classMap = {
  success: 'is-success',
  danger: 'is-danger',
  warning: 'is-warning',
};

const NotificationContainer = styled.article.attrs({
  className: props => `message ${classMap[props.type]}`,
})`
  position: fixed;
  right: 0;
  top: 66px;
  z-index: 1024;
`;

const Notification = ({ type, onClose, timeout = 3000, children }) => (
  <NotificationContainer type={type}>
    <div className="message-body">
      {onClose && <button className="delete" onClick={onClose} />}
      {children}
    </div>
  </NotificationContainer>
);

Notification.propTypes = {
  onClose: PropTypes.func,
  type: PropTypes.oneOf(['success, warning, danger']),
  timeout: PropTypes.number,
};

export default Notification;
