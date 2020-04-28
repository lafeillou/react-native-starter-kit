import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View, StyleSheet, Animated, Dimensions, Button, Text, TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Icon from 'yofc-react-native-vector-icons/Iconfont';
import { calc } from '../lib/utils';

const { height: deviceHeight, width: deviceWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0, 0.15)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    height: calc(48),
    backgroundColor: '#212e4c',
  },
});

class BaseLightbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opacity: new Animated.Value(0),
    };

    this.closeModal = this.closeModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
  }

  componentDidMount() {
    const { opacity } = this.state;

    Animated.timing(opacity, {
      duration: 500,
      toValue: 1,
    }).start();
  }


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
          // justifyContent: 'center',
          // alignItems: 'center',
          backgroundColor: '#0e1c3d',
          borderWidth: 1,
          borderColor: '#112346',
        }}
      >
        {/* {children} */}
        <View style={[styles.header, { width }]}>
          <Text style={{ lineHeight: calc(48), color: '#fff', marginLeft: calc(20) }}>兵力部署</Text>
          <TouchableOpacity
            style={{
              width: calc(48), height: calc(48), position: 'absolute', right: 0, top: 0,
            }}
            onPress={this.closeModal}
          >
            <Icon
              name="close"
              size={calc(24)}
              color="#45AEFF"
              style={{ lineHeight: calc(48), textAlign: 'center' }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  closeModal() {
    const { opacity } = this.state;

    Animated.timing(opacity, {
      duration: 500,
      toValue: 0,
    }).start(this._closeModal); // Actions.pop
  }


  _closeModal() {
    const { setCurrentModal } = this.props;
    setCurrentModal({
      isVisible: false,
      componentName: '',
    });
  }

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
  setCurrentModal: PropTypes.object,
};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  setCurrentModal: dispatch.app.setCurrentModal,
});


export default connect(mapStateToProps, mapDispatchToProps)(BaseLightbox);
