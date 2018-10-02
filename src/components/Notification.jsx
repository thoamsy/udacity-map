import React, { Component } from 'react';
import { createPortal } from 'react-dom';
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
  constructor(props) {
    super(props);
    this.state = {
      needToClose: false,
    };
    this.container = document.querySelector('#notification');
    this.createDom();
  }

  createDom() {
    this.ele = document.createElement('div');
    this.container.appendChild(this.ele);
  }

  autoClose() {
    const { timeout } = this.props;

    setTimeout(() => {
      this.setState({
        needToClose: true,
      });
    }, timeout);
  }

  removeNotification = () => this.container.removeChild(this.ele);
  componentDidMount = () => {
    this.autoClose();
  };

  componentDidUpdate(prevProps) {
    if (this.props.children !== prevProps.children) {
      this.createDom();
      this.autoClose();
      this.setState({
        needToClose: false,
      });
    }
  }

  componentWillUnmount() {
    this.container.removeChild(this.ele);
    this.notification.current.removeEventListener(
      'transitionend',
      this.removeNotification
    );
  }

  static propTypes = {
    onClose: PropTypes.func,
    type: PropTypes.oneOf(['success', 'warning', 'danger']),
    timeout: PropTypes.number,
  };

  static defaultProps = {
    timeout: 3000,
  };

  renderNotification() {
    const { type, onClose, children } = this.props;
    return (
      <NotificationContainer
        isShow={!this.state.needToClose}
        type={type}
        onTransitionEnd={this.removeNotification}
      >
        <div className="message-body">
          {onClose && <button className="delete" onClick={onClose} />}
          {children}
        </div>
      </NotificationContainer>
    );
  }

  render() {
    return createPortal(this.renderNotification(), this.ele);
  }
}

export default Notification;
