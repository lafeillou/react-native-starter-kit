import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View, StyleSheet, Animated, Dimensions, Button,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

const { height: deviceHeight, width: deviceWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(52,52,52,0.5)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class BaseLightbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opacity: new Animated.Value(0),
    };
  }

  componentDidMount() {
    const { opacity } = this.state;

    Animated.timing(opacity, {
      duration: 500,
      toValue: 1,
    }).start();
  }

  closeModal = () => {
    const { opacity } = this.state;

    Animated.timing(opacity, {
      duration: 500,
      toValue: 0,
    }).start(Actions.pop);
  };

  _renderLightBox = () => {
    const { children, horizontalPercent = 1, verticalPercent = 1 } = this.props;
    const height = verticalPercent
      ? deviceHeight * verticalPercent
      : deviceHeight;
    const width = horizontalPercent
      ? deviceWidth * horizontalPercent
      : deviceWidth;
    return (
      <View
        style={{
          width,
          height,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#0e1c3d',
        }}
      >
        {children}
        <Button title="Close" onPress={this.closeModal} />
      </View>
    );
  };

  render() {
    const { opacity } = this.state;
    return (
      <Animated.View style={[styles.container, { opacity }]}>
        {this._renderLightBox()}
      </Animated.View>
    );
  }
}

BaseLightbox.propTypes = {
  children: PropTypes.any,
  horizontalPercent: PropTypes.number,
  verticalPercent: PropTypes.number,
};
