import React from 'react';
import {
  View, Text, StyleSheet, Animated, Dimensions,
} from 'react-native';

import {
  Form, Item, Input, Label, Icon, Button,
} from 'native-base';


import { Actions } from 'react-native-router-flux';

const { height: deviceHeight } = Dimensions.get('window');

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
      offset: new Animated.Value(deviceHeight),
    };
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    const { offset } = this.state;
    Animated.timing(offset, {
      duration: 300,
      toValue: 0,
    }).start();
  }

  closeModal() {
    const { offset } = this.state;
    Animated.timing(offset, {
      duration: 300,
      toValue: -deviceHeight,
      // start中的参数是动画结束后的回调
    }).start(Actions.home());
  }

  render() {
    const { offset } = this.state;
    // const { data } = this.props;

    return (
      <Animated.View
        style={[
          styles.container,
          { backgroundColor: '#0c132c' },
          { transform: [{ translateY: offset }] },
        ]}
      >
        <View
          style={{
            width: 350,
            height: 250,
            // justifyContent: 'center',
            // alignItems: 'center',
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
              <Input />
            </Item>
            <Item inlineLabel last>
              <Icon name="lock" type="AntDesign" style={{ color: '#fff' }} />
              <Label style={{ color: '#fff' }}>密码</Label>
              <Input />
            </Item>
            <Button full style={{ marginTop: 20 }} onPress={this.closeModal}>
              <Text style={{ fontSize: 20, color: '#fff' }}>登 录</Text>
            </Button>
          </Form>
        </View>
      </Animated.View>
    );
  }
}
