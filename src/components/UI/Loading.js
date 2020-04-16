import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import Colors from '../../../native-base-theme/variables/commonColor';

const Loading = () => (
  <View style={{
    flex: 1, flexDirection: 'column', justifyContent: 'center', backgroundColor: '#0c132c',
  }}
  >
    <ActivityIndicator size="large" color={Colors.brandPrimary} />
  </View>
);

export default Loading;
