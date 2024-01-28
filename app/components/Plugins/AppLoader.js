
//     react-native-loading-spinner-overlay
//     Copyright (c) 2016- Nick Baugh <niftylettuce@gmail.com>
//     MIT Licensed

// * Author: [@niftylettuce](https://twitter.com/#!/niftylettuce)
// * Source:
// <https://github.com/niftylettuce/react-native-loading-spinner-overlay>

// # react-native-loading-spinner-overlay
//
// <https://github.com/facebook/react-native/issues/2501>
// <https://rnplay.org/apps/1YkBCQ>
// <https://github.com/facebook/react-native/issues/2501>
// <https://github.com/brentvatne/react-native-overlay>
//

import {
    ActivityIndicator,
    Dimensions,
    Image,
    Modal,
    StatusBar,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { FONTFAMILY } from "../../config/font-config";
import themes from '../../config/themes-config';
import LottieView from 'lottie-react-native';
import PropTypes from 'prop-types';
import React from 'react';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    background: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
        flex: 1,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
    },
    textContent: {
        top: 80,
        height: 120,
        paddingTop: 30,
        fontSize: 20,
        fontFamily: FONTFAMILY.MEDIUM
    }
});

const ANIMATION = ['none', 'slide', 'fade'];
const SIZES = ['small', 'normal', 'large'];

export default class Spinner extends React.Component {

    constructor(props) {
        super(props);
        this.state = { visible: this.props.visible, textContent: this.props.textContent };

    }

    static propTypes = {
        visible: PropTypes.bool,
        cancelable: PropTypes.bool,
        textContent: PropTypes.string,
        animation: PropTypes.oneOf(ANIMATION),
        color: PropTypes.string,
        size: PropTypes.oneOf(SIZES),
        overlayColor: PropTypes.string
    };

    static defaultProps = {
        visible: false,
        cancelable: false,
        textContent: '',
        animation: 'slide',
        color: themes[0]?.PRIMARY,
        size: 'normal', // 'normal',
        overlayColor: 'rgba(16,68,98,0.5)'
    };

    close() {
        this.setState({ visible: false });
    }
    componentDidMount() {
        if (this.state.visible) {
            this.animationRef.play();
            // Or set a specific startFrame and endFrame with:
            this.animationRef.play();
        }
    }
    componentWillReceiveProps(nextProps) {
        const { visible, textContent } = nextProps;
        this.setState({ visible, textContent }, () => {
            if (this.state.visible) {
                this.animationRef.play();
                // Or set a specific startFrame and endFrame with:
                this.animationRef.play();
            }
        });
    }

    _handleOnRequestClose() {
        if (this.props.cancelable) {
            this.close();
        }
    }

    _renderDefaultContent() {
        return (
            <View style={styles.background}>
                <LottieView
                    ref={animation => {
                        this.animationRef = animation;
                    }}
                    style={{
                        width: Dimensions.get('window').width / 1,
                        height: Dimensions.get('window').height / 2.5
                    }}
                    source={require('../../assets/json/loader.json')}
                />
                <View style={styles.textContainer}>
                    <Text style={[styles.textContent, this.props.textStyle, { color: themes[0]?.PRIMARY, textAlign: 'center', marginHorizontal: 30 }]}>{this.state.textContent}</Text>
                </View>
            </View>);
    }

    _renderSpinner() {
        const { visible } = this.state;

        if (!visible)
            return null;

        const spinner = (
            <View style={[
                styles.container,
                { backgroundColor: this.props.overlayColor }
            ]} key={`spinner_${Date.now()}`}>
                {this.props.children ? this.props.children : this._renderDefaultContent()}
            </View>
        );

        return (
            <View>
                <Modal
                    // animationType={this.props.animation}
                    onRequestClose={() => this._handleOnRequestClose()}
                    supportedOrientations={['landscape', 'portrait']}
                    transparent
                    visible={visible}>
                    {spinner}
                </Modal>
            </View>
        );

    }

    render() {
        return this._renderSpinner();
    }

}