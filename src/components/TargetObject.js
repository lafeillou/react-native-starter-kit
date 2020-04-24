import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';

import Icon from 'yofc-react-native-vector-icons/Iconfont';

import { Actions } from 'react-native-router-flux';
import { calc } from '../lib/utils';

import TargetObjectTabs from './TargetObjectTabs';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e1c3d',

  },

  header: {
    backgroundColor: '#212e4c',
    height: calc(48),
    flexDirection: 'row',
  },
  closeBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: calc(48),
    height: calc(48),
  },
  rightBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: calc(100),
    height: calc(48),
  },
  flex1: {
    flex: 1,
  },
  flex0: {
    flex: 0,
  },
});

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
    this.closeDrawer = this.closeDrawer.bind(this);
  }

  componentDidMount() {

  }

  // eslint-disable-next-line class-methods-use-this
  closeDrawer() {
    Actions.drawerClose();
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <TouchableOpacity
            style={[styles.flex0, styles.closeBtn]}
            onPress={this.closeDrawer}
          >

            <Icon
              name="close"
              size={calc(18)}
              color="#45AEFF"
              style={{ lineHeight: calc(48), textAlign: 'center' }}
            />


          </TouchableOpacity>


          <View style={{ flex: 1 }}>
            <Text style={{
              color: '#45AEFF', lineHeight: calc(48), fontSize: calc(18), fontWeight: 'bold',
            }}
            >
              邓州市市委市政府
            </Text>
          </View>


          <TouchableOpacity style={[styles.flex0, styles.rightBtn]}>

            <Text style={{ color: '#45AEFF', lineHeight: calc(48), fontSize: calc(18) }}>兵力部署</Text>

          </TouchableOpacity>
        </View>


        <View style={{ flex: 1 }}>
          <TargetObjectTabs>
            <View style={{ flex: 1 }}>
              <Text style={{ color: '#fff' }}>1</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: '#fff' }}>2</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: '#fff' }}>3</Text>
            </View>
          </TargetObjectTabs>
        </View>
      </View>
    );
  }
}
