import React from 'react';
import {
  Stack, Scene, Drawer, ActionConst,
} from 'react-native-router-flux';


import { Alert } from 'react-native';
import LeafletMap from '../components/LeafletMap';
import Login from '../components/Login';

// import TargetObject from '../components/TargetObject';

import { calc } from '../lib/utils';

const Index = (
  <Stack key="root" hideNavBar>
    <Scene key="login" initial component={Login} type={ActionConst.REPLACE} />
    <Scene key="home" component={LeafletMap} />
  </Stack>
);

export default Index;
