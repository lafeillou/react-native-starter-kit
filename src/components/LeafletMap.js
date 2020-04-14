import 'react-native-get-random-values';
import React from 'react';
import { WebView } from 'react-native-webview';

const LeafLetMap = () => (
  <WebView
    source={{ uri: 'http://www.baidu.com' }}
    style={{ marginTop: 20 }}
  />
);
export default LeafLetMap;
