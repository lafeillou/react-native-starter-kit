import React, { Component } from 'react';

import {
  View, Text, StyleSheet, Dimensions, TouchableOpacity,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TargetObject from './TargetObject';
import { calc } from '../lib/utils';
import Lightbox from './BaseLightbox';

const styles = StyleSheet.create({
  outerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    backgroundColor: '#0c132c',
    width: calc(460),
    height: Dimensions.get('window').height,
    position: 'absolute',
    right: 0,
    top: 0,

  },
});
class LightboxPlaceholder extends Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    Actions.pop();
  }

  render() {
    const { currentModal } = this.props;
    return (
      <View style={styles.outerContainer}>
        <TouchableOpacity style={{ flex: 1 }} onPress={this.closeModal} />
        <View style={styles.container}>
          <TargetObject />
        </View>
        {currentModal.isVisible && (
        <Lightbox verticalPercent={0.75} horizontalPercent={0.75}>
          {/* <Text style={{ color: '#fff' }}>{currentModal.isVisible ? 'true' : 'false'}</Text>
          <Text style={{ color: '#fff' }}>Allows transparency for background</Text> */}
        </Lightbox>
        )}

      </View>
    );
  }
}


LightboxPlaceholder.propTypes = {
  currentModal: PropTypes.object,

};


const mapStateToProps = (state) => ({
  currentModal: state.app.currentModal,
});

const mapDispatchToProps = (dispatch) => ({

});


export default connect(mapStateToProps, mapDispatchToProps)(LightboxPlaceholder);
