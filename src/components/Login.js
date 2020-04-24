import React from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';

import {
  Form, Item, Input, Label, Icon, Button,
} from 'native-base';


import { Actions } from 'react-native-router-flux';

import AsyncStorage from '@react-native-community/async-storage';

import { login } from '../api';

// import { calc } from '../lib/utils';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: 'mrbird',
      userPwd: '1234qwer',
    };
    this.closeModal = this.closeModal.bind(this);

    // this._afterAnimation = this._afterAnimation.bind(this);
  }

  componentDidMount() {

  }

  closeModal() {
    const { userName, userPwd } = this.state;
    login({
      username: userName,
      password: userPwd,
    }).then((res) => {
      // 登录成功了，缓存token
      if (res.status === 200) {
        AsyncStorage.setItem('@Authentication:token', res.data.data.token);
        Actions.home();
      }
    });
  }

  render() {
    const { userName, userPwd } = this.state;
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: '#0c132c' },
        ]}
      >
        <View
          style={{
            width: 350,
            height: 250,
            backgroundColor: '#000',
            borderWidth: 2,
            borderColor: '#fff',
            borderRadius: 6,
          }}
        >

          <Form style={{ padding: 20 }}>
            <Text style={{
              fontSize: 27, textAlign: 'center', color: '#fff', opacity: 1,
            }}
            >
              电子沙盘控制APP
            </Text>
            <Item inlineLabel last>
              <Icon name="user" type="AntDesign" style={{ color: '#fff' }} />
              <Label style={{ color: '#fff' }}>账号</Label>
              <Input
                style={{ color: '#fff' }}
                value={userName}
                onChangeText={(text) => { this.setState({ userName: text }); }}
              />
            </Item>
            <Item inlineLabel last>
              <Icon name="lock" type="AntDesign" style={{ color: '#fff' }} />
              <Label style={{ color: '#fff' }}>密码</Label>
              <Input
                secureTextEntry
                style={{ color: '#fff' }}
                value={userPwd}
                onChangeText={(text) => { this.setState({ userPwd: text }); }}
              />
            </Item>
            <Button full style={{ marginTop: 20 }} onPress={this.closeModal}>
              <Text style={{ fontSize: 20, color: '#fff' }}>登 录</Text>
            </Button>
          </Form>
        </View>
      </View>
    );
  }
}
