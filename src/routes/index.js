import React from 'react';
import { Stack, Scene } from 'react-native-router-flux';

import { Alert } from 'react-native';
import LeafletMap from '../components/LeafletMap';
import Login from '../components/Login';


const Index = (
  <Scene key="root" hideNavBar>
    <Scene key="login" component={Login} />
    <Scene key="home" component={LeafletMap} />
  </Scene>
);

export default Index;
