import React, { Component } from 'react';

import { View, Text } from 'react-native';
import Lightbox from './BaseLightbox';


export default class LightboxPlaceholder extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Lightbox verticalPercent={0.75} horizontalPercent={0.75}>
        <Text>Demo Lightbox:</Text>
        <Text>Allows transparency for background</Text>
      </Lightbox>
    );
  }
}
