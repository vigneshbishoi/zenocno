import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Animated, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Label extends PureComponent {
  static defaultProps = {
    numberOfLines: 1,

    active: false,
    focused: false,
    errored: false,
    restricted: false,
    required: false
  };

  static propTypes = {
    active: PropTypes.bool,
    focused: PropTypes.bool,
    errored: PropTypes.bool,
    restricted: PropTypes.bool,
    required: PropTypes.bool,

    baseSize: PropTypes.number.isRequired,
    fontSize: PropTypes.number.isRequired,
    activeFontSize: PropTypes.number.isRequired,
    basePadding: PropTypes.number.isRequired,

    tintColor: PropTypes.string.isRequired,
    baseColor: PropTypes.string.isRequired,
    errorColor: PropTypes.string.isRequired,

    animationDuration: PropTypes.number.isRequired,

    style: Text.propType,

    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  };

  constructor(props) {
    super(props);

    this.state = {
      input: new Animated.Value(this.inputState()),
      focus: new Animated.Value(this.focusState()),
    };
  }

  componentWillReceiveProps(props) {
    let { focus, input } = this.state;
    let { active, focused, errored, animationDuration: duration } = this.props;

    if (focused ^ props.focused || active ^ props.active) {
      let toValue = this.inputState(props);

      Animated
        .timing(input, { toValue, duration })
        .start();
    }

    if (focused ^ props.focused || errored ^ props.errored) {
      let toValue = this.focusState(props);

      Animated
        .timing(focus, { toValue, duration })
        .start();
    }
  }

  inputState({ focused, active } = this.props) {
    return active || focused ? 1 : 0;
  }

  focusState({ focused, errored } = this.props) {
    return errored ? -1 : (focused ? 1 : 0);
  }

  render() {
    let { focus, input } = this.state;
    let {
      children,
      restricted,
      fontSize,
      activeFontSize,
      errorColor,
      baseColor,
      tintColor,
      baseSize,
      basePadding,
      style,
      errored,
      active,
      focused,
      animationDuration,
      required,
      iconName,
      ...props
    } = this.props;

    let color = restricted ?
      errorColor :
      focus.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [errorColor, baseColor, tintColor],
      });

    let top = input.interpolate({
      inputRange: [0, 1],
      outputRange: [
        25,
        baseSize - basePadding - activeFontSize,
      ],
    });

    let textStyle = {
      fontSize: input.interpolate({
        inputRange: [0, 1],
        outputRange: [fontSize, activeFontSize],
      }),

      color,
    };

    let containerStyle = {
      position: 'absolute',
      top,
      left: (iconName === "" ? 0 : 25),
      right: this.props.RTL ? 0 : null,
    };

    return (
      <Animated.View style={containerStyle}>
        <Animated.Text style={[style, textStyle]} {...props}>
          {children} {required && <Animated.Text style={{ color: 'red' }}>*</Animated.Text>}
        </Animated.Text>
      </Animated.View>
    );
  }
}
