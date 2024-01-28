import React, { Component } from 'react';
import {
  Text,
  Animated,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  BackAndroid,
  BackHandler,
  Pressable
} from 'react-native';

import PropTypes from 'prop-types';
import config from '../../config/alertScreen-config';
import styles from './Style';
const HwBackHandler = BackHandler || BackAndroid;
const HW_BACK_EVENT = 'hardwareBackPress';
export default class Alert extends Component {
  constructor(props) {
    super(props);
    const { show } = this.props;
    this.springValue = new Animated.Value(0.3);

    this.state = {
      showSelf: false
    };

    if (show) this._springShow(true);
  }


  componentDidMount() {
    HwBackHandler.addEventListener(HW_BACK_EVENT, this._handleHwBackEvent);
  }

  _springShow = fromConstructor => {
    this._toggleAlert(fromConstructor);
    Animated.spring(this.springValue, {
      toValue: 1,
      bounciness: 10
    }).start();
  };

  _springHide = () => {
    if (this.state.showSelf === true) {
      Animated.spring(this.springValue, {
        toValue: 0,
        tension: 10
      }).start();

      setTimeout(() => {
        this._toggleAlert();
        this._onDismiss();
      }, 70);
    }
  };

  _toggleAlert = fromConstructor => {
    if (fromConstructor) this.state = { showSelf: true };
    else this.setState({ showSelf: !this.state.showSelf });
  };

  _handleHwBackEvent = () => {
    const { closeOnHardwareBackPress } = this.props;
    if (this.state.showSelf && closeOnHardwareBackPress) {
      this._springHide();
      return true;
    } else if (!closeOnHardwareBackPress && this.state.showSelf) {
      return true;
    }

    return false;
  };

  _onTapOutside = () => {
    const { closeOnTouchOutside } = this.props;
    closeOnTouchOutside.setShowAlert(false)
    //if (closeOnTouchOutside.val) this._springHide();

  };

  _onDismiss = () => {
    const { onDismiss } = this.props;
    onDismiss && onDismiss();
  };

  _renderButton = (data, primaryBtn = true) => {
    const {
      text,
      backgroundColor,
      buttonStyle = {},
      buttonTextStyle,
      onPress
    } = data;

    return (

      <View style={[styles.btn,buttonStyle]}>
        <TouchableOpacity onPress={onPress} style={styles.btnLgradient}>
          <Text style={styles.btnText} >{text}</Text>
        </TouchableOpacity>
      </View>

      // <TouchableOpacity onPress={onPress}>
      //   <View style={[styles.button, { backgroundColor }, buttonStyle, (primaryBtn) ?
      //     { backgroundColor: '#104462' } : { backgroundColor: 'silver' }]}>
      //     <Text style={[styles.buttonText, buttonTextStyle]}>{text}</Text>
      //   </View>
      // </TouchableOpacity >


    );
  };

  _renderAlert = () => {
    const animation = { transform: [{ scale: this.springValue }] };

    const { showProgress } = this.props;
    const { title, message, customView = null } = this.props;

    const {
      showCancelButton,
      cancelText,
      cancelButtonColor,
      cancelButtonStyle,
      cancelButtonTextStyle,
      onCancelPressed
    } = this.props;
    const {
      showConfirmButton,
      confirmText,
      confirmButtonColor,
      confirmButtonStyle,
      confirmButtonTextStyle,
      onConfirmPressed
    } = this.props;

    const {
      alertContainerStyle,
      overlayStyle,
      progressSize,
      progressColor,
      contentContainerStyle,
      titleStyle,
      messageStyle
    } = this.props;

    const cancelButtonData = {
      text: cancelText,
      backgroundColor: cancelButtonColor,
      buttonStyle: cancelButtonStyle,
      buttonTextStyle: cancelButtonTextStyle,
      onPress: onCancelPressed
    };

    const confirmButtonData = {
      text: confirmText,
      backgroundColor: confirmButtonColor,
      buttonStyle: confirmButtonStyle,
      buttonTextStyle: confirmButtonTextStyle,
      onPress: onConfirmPressed
    };

    return (
      <View style={[styles.container, alertContainerStyle]}>
        <TouchableWithoutFeedback onPress={this._onTapOutside}>
          <View style={[styles.overlay, overlayStyle]} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={[styles.contentContainer, animation, contentContainerStyle]}
        >
          <View style={styles.content}>
            {showProgress ? (
              <ActivityIndicator size={progressSize} color={progressColor} />
            ) : null}
            {title ? (
              <Text style={[styles.title, titleStyle]}>{title}</Text>
            ) : null}
            {message ? (
              <Text style={[styles.message, messageStyle, { textAlign: 'center' }]}>{message}</Text>
            ) : null}
            {customView}
          </View>
          <View style={styles.action}>
            {showCancelButton ? this._renderButton(cancelButtonData, false) : null}
            {showConfirmButton ? this._renderButton(confirmButtonData) : null}
          </View>
        </Animated.View>
      </View>
    );
  };

  render() {
    const { showSelf } = this.state;

    if (showSelf) return this._renderAlert();

    return null;
  }

  componentWillReceiveProps(nextProps) {
    const { show } = nextProps;
    const { showSelf } = this.state;

    if (show && !showSelf) this._springShow();
    else if (show === false && showSelf) this._springHide();
  }

  componentWillUnmount() {
    HwBackHandler.removeEventListener(HW_BACK_EVENT, this._handleHwBackEvent);
  }
}

Alert.propTypes = {
  show: PropTypes.bool,
  showProgress: PropTypes.bool,
  title: PropTypes.string,
  message: PropTypes.string,
  closeOnTouchOutside: PropTypes.object,
  closeOnHardwareBackPress: PropTypes.bool,
  showCancelButton: PropTypes.bool,
  showConfirmButton: PropTypes.bool,
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
  cancelButtonColor: PropTypes.string,
  confirmButtonColor: PropTypes.string,
  onCancelPressed: PropTypes.func,
  onConfirmPressed: PropTypes.func,
  customView: PropTypes.object
};

Alert.defaultProps = {
  show: false,
  showProgress: false,
  closeOnTouchOutside: true,
  closeOnHardwareBackPress: true,
  showCancelButton: false,
  showConfirmButton: false,
  cancelText: config.alert.cancelText,
  confirmText: config.alert.confirmText,
  cancelButtonColor: config.colors.cancel,
  confirmButtonColor: config.colors.confirm,
  customView: null
};