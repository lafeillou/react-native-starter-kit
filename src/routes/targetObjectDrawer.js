import React from 'react';
import {
  Stack, Scene, Drawer, ActionConst,
} from 'react-native-router-flux';


import { Alert } from 'react-native';
import LeafletMap from '../components/LeafletMap';
import Login from '../components/Login';
import Test from '../components/Test';

import TargetObject from '../components/TargetObject';

import { calc } from '../lib/utils';

const Index = (

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

    <Scene hideNavBar key="test" component={Test} />

  </Drawer>


);

export default Index;
