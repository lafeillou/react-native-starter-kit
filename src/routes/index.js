import React from 'react';
import { Stack, Scene, Drawer } from 'react-native-router-flux';

import { Alert } from 'react-native';
import LeafletMap from '../components/LeafletMap';
import Login from '../components/Login';

// import TargetObject from '../components/TargetObject';

import { calc } from '../lib/utils';

const Index = (
  <Scene key="root" hideNavBar>
    <Scene key="login" component={Login} />
    <Scene key="home" component={LeafletMap}>
      {/* <Drawer key="targetObject" drawerPosition="right" hideNavBar drawerWidth={calc(460)} contentComponent={TargetObject}>
        <Scene />
      </Drawer> */}
    </Scene>


  </Scene>
);

export default Index;
