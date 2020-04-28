import React from 'react';
import {
  Stack, Scene, Drawer,
} from 'react-native-router-flux';


import LeafletMap from '../components/LeafletMap';


import TargetObject from '../components/TargetObject';
import { calc } from '../lib/utils';


const Index = (
  <Stack key="root" hideNavBar>
    {/* <Drawer
      key="targetObject"
      drawerWidth={calc(460)}
      onExit={() => {
        console.log('Drawer closed');
      }}
      onEnter={() => {
        console.log('Drawer opened');
      }}
      contentComponent={TargetObject}
      drawerPosition="right"
      drawerLockMode="unlocked"
    > */}
    <Scene hideNavBar key="home" component={LeafletMap} />
    {/* </Drawer> */}
  </Stack>
);

export default Index;
