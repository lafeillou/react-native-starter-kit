import React from 'react';
import { Scene } from 'react-native-router-flux';

import LeafletMap from '../components/LeafletMap';

const Index = (
  <Scene hideNavBar key="home" component={LeafletMap} />
);


export default Index;
