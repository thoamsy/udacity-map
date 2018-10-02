import React, { Component, createRef } from 'react';
import { createPortal } from 'react-dom';
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
  transition: all 0.6s;
  opacity: ${props => +props.isShow};
  transform: ${props => `transform(${props.isShow ? 0 : '100%'})`};
`;

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      needToClose: false,
    };
    this.container = document.querySelector('#notification');
    this.ele = document.createElement('div');
    this.container.appendChild(this.ele);
    this.notification = createRef();
  }

  removeNotification = () => this.container.removeChild(this.ele);
  componentDidMount = () => {
    const { timeout } = this.props;
    this.notification.current.addEventListener(
      'transitionend',
      this.removeNotification
    );

    setTimeout(() => {
      this.setState({
        needToClose: true,
      });
    }, timeout);
  };

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
        ref={this.notification}
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
