import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components';

const classMap = {
  success: 'is-success',
  danger: 'is-danger',
  warning: 'is-warning',
};

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(100%);
  }

  100% {
    opacity; 1;
    transform: translateX(0);
  }
`;
const fadeInRule = css`
  ${fadeIn} 0.5s;
`;

const NotificationContainer = styled.article.attrs({
  className: props => `message ${classMap[props.type]}`,
})`
  position: fixed;
  right: 0;
  top: 66px;
  min-width: 200px;
  z-index: 1024;
  transition: all 0.5s ease-out;
  opacity: ${({ isShow }) => +isShow};
  transform: ${props => `translateX(${props.isShow ? 0 : '100%'})`};
  animation: ${fadeInRule};
`;

class Notification extends Component {
  state = {
    notification: '',
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.notification && !nextProps.children) {
      return {
        show: false,
      };
    }

    if (prevState.notification !== nextProps.children) {
      return {
        notification: nextProps.children,
        show: true,
      };
    }

    return null;
  }

  static propTypes = {
    onClose: PropTypes.func,
    children: PropTypes.string,
    type: PropTypes.oneOf(['success', 'warning', 'danger']),
    timeout: PropTypes.number,
  };

  removeNotification = () => {
    this.setState({
      show: false,
      notification: null,
    });
  };

  renderNotification() {
    const { type, onClose } = this.props;
    const { notification, show } = this.state;
    if (!notification) return null;

    return (
      <NotificationContainer
        type={type}
        isShow={show}
        onTransitionEnd={this.removeNotification}
      >
        <div className="message-body">
          {onClose && <button className="delete" onClick={onClose} />}
          {notification}
        </div>
      </NotificationContainer>
    );
  }

  render() {
    return this.renderNotification();
  }
}

export default Notification;
