import React from 'react';
import {
  Stack, Scene, Drawer,
} from 'react-native-router-flux';


import LeafletMap from '../components/LeafletMap';


import TargetObject from '../components/TargetObject';


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
      <Scene hideNavBar key="home" component={LeafletMap} />
    </Drawer>
  </Stack>
);

export default Index;
