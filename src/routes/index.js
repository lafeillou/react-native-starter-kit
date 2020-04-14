import React from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';

import LeafletMap from '../components/LeafletMap';

const Index = (
  <Router hideNavBar>
    <Stack key="root" hideNavBar>
      <Scene initial key="home" component={LeafletMap} />
    </Stack>
  </Router>
);


export default Index;
