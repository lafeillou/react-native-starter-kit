import React from 'react';
import {
  Stack, Scene, Drawer, ActionConst,
} from 'react-native-router-flux';


import { Alert } from 'react-native';
import LeafletMap from '../components/LeafletMap';
import Login from '../components/Login';

import TargetObject from '../components/TargetObject';
import Test from '../components/Test';

import { calc } from '../lib/utils';

const Index = (
  <Stack key="root" hideNavBar>

    <Drawer
      hideNavBar
      key="targetObject"
      onExit={() => {
        console.log('Drawer closed');
      }}
      onEnter={() => {
        console.log('Drawer opened');
      }}
      contentComponent={TargetObject}
    >
      {/* <Scene hideNavBar key="login" component={Login} /> */}
      <Scene hideNavBar key="home" component={LeafletMap} />
      {/* <Scene hideNavBar key="test" component={Test} /> */}

    </Drawer>
  </Stack>
  // <Stack key="root" hideNavBar>
  //   <Scene key="login" component={Login} />
  //   <Scene key="home" component={LeafletMap} />
  // </Stack>


);

export default Index;
