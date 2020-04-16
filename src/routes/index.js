import React from 'react';
import { Stack, Scene } from 'react-native-router-flux';

import LeafletMap from '../components/LeafletMap';
import Login from '../components/Login';


const Index = (
  <Stack key="login" hideNavBar>
    <Scene key="home" component={LeafletMap} />
    <Scene key="login" component={Login} />
  </Stack>
);

export default Index;
