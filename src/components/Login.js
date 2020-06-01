import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';

import {
  Form, Item, Input, Label, Icon, Button,
} from 'native-base';


import { Actions } from 'react-native-router-flux';

import AsyncStorage from '@react-native-community/async-storage';

import Icon2 from 'yofc-react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../api';


// import { TouchableOpacity } from 'react-native-gesture-handler';


import { calc } from '../lib/utils';

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

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: 'mrbird',
      userPwd: '1234qwer',
      remoteIp: '192.168.8.154',
      // remoteIp: '111.47.10.117:30024',
      showRemoteIp: false,
    };
    this.closeModal = this.closeModal.bind(this);
    // this._afterAnimation = this._afterAnimation.bind(this);
    this.showRemoteIp = this.showRemoteIp.bind(this);
    this.getGlobalRemoteUrl = this.getGlobalRemoteUrl.bind(this);
  }


  componentDidMount() {
    this.getGlobalRemoteUrl().then((res) => {
      if (typeof res === 'string') {
        this.setState({
          remoteIp: res,
        });
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async getGlobalRemoteUrl() {
    let globalRemoteUrl = '192.168.8.154';
    globalRemoteUrl = await AsyncStorage.getItem('@GlobalRemoteUrl');
    console.log('=====================globalRemoteUrl');
    console.log(globalRemoteUrl);
    return globalRemoteUrl;
  }

  closeModal() {
    const { userName, userPwd, remoteIp } = this.state;
    const { setGlobalRemoteUrl, setUserInfo } = this.props;
    AsyncStorage.setItem('@GlobalRemoteUrl', remoteIp);
    setGlobalRemoteUrl(remoteIp);


    login({
      username: userName,
      password: userPwd,
    }).then((res) => {
      // 登录成功了，缓存token
      if (res.status === 200) {
        AsyncStorage.setItem('@Authentication:token', res.data.data.token);
        // 将用户信息存储到redux中
        setUserInfo(res.data.data);
        Actions.home();
      }
    });
  }

  showRemoteIp() {
    const { showRemoteIp } = this.state;
    this.setState({
      showRemoteIp: !showRemoteIp,
    });
  }


  render() {
    const {
      userName, userPwd, remoteIp, showRemoteIp,
    } = this.state;
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
            // height: 250,
            backgroundColor: '#000',
            borderWidth: 2,
            borderColor: '#fff',
            borderRadius: 6,
          }}
        >

          <Form style={{ padding: 20 }}>
            <TouchableOpacity style={{ position: 'absolute', right: -2, top: -2 }} onPress={this.showRemoteIp}>
              <View style={{
                paddingTop: calc(10), paddingBottom: calc(10), paddingLeft: calc(10), paddingRight: calc(10), borderWidth: 2, borderColor: '#fff', borderRadius: 6, borderTopLeftRadius: 0, borderBottomRightRadius: 0,
              }}
              >
                <Icon2
                  name="ios-settings"
                  size={calc(30)}
                  color="#45AEFF"
                  style={{ lineHeight: calc(30), textAlign: 'center' }}
                />
              </View>
            </TouchableOpacity>
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

            {showRemoteIp && (
            <Item inlineLabel last>
              <Icon name="ios-link" type="Ionicons" style={{ color: '#fff' }} />
              <Label style={{ color: '#fff' }}>   IP  </Label>
              <Input
                style={{ color: '#fff' }}
                value={remoteIp}
                onChangeText={(text) => { this.setState({ remoteIp: text }); }}
                returnKeyType="done"
                clearButtonMode="always"
              />
            </Item>
            )}

            <Button full style={{ marginTop: 20 }} onPress={this.closeModal}>
              <Text style={{ fontSize: 20, color: '#fff' }}>登 录</Text>
            </Button>
          </Form>
        </View>
      </View>
    );
  }
}

Login.defaultProps = {
  setGlobalRemoteUrl: () => {},
  setUserInfo: () => {},
};

Login.propTypes = {
  setGlobalRemoteUrl: PropTypes.func,
  setUserInfo: PropTypes.func,
};


const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  setGlobalRemoteUrl: dispatch.app.setGlobalRemoteUrl,
  setUserInfo: dispatch.app.setUserInfo,
});


export default connect(mapStateToProps, mapDispatchToProps)(Login);
