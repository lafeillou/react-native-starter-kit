import React, { Component } from 'react';

import {
  View, Text, StyleSheet, Dimensions,
} from 'react-native';
import TargetObject from './TargetObject';

import { calc } from '../lib/utils';

const styles = StyleSheet.create({
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
export default class LightboxPlaceholder extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <TargetObject />
      </View>
    );
  }
}
