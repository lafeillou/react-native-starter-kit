import 'react-native-get-random-values';
import React, { Component } from 'react';

import {
  StyleSheet, View, Text, Dimensions, TouchableOpacity,
} from 'react-native';

import { WebView } from 'react-native-webview';
import Icon from 'yofc-react-native-vector-icons/Iconfont';

import { calc } from '../lib/utils';

import TargetPanel from './TargetPanel';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c132c',
  },
  btn: {
    width: calc(48),
    height: calc(48),
    backgroundColor: '#212e4e',
    borderRadius: calc(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  pos1: {
    position: 'absolute',
    left: calc(20),
    top: calc(20),
  },
  pos2: {
    position: 'absolute',
    right: calc(20),
    top: calc(20),
  },
  btnListWrap: {
    width: calc(48),
    height: calc(240),
    position: 'absolute',
    right: calc(20),
    bottom: calc(20),
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  flex0: {
    flex: 0,
  },
  // 中间顶部，连接状态反馈
  topWarningBlock: {
    width: calc(180),
    height: calc(48),
    backgroundColor: '#212e4e',
    position: 'absolute',
    top: calc(20),
    left: Dimensions.get('window').width / 2 - 90,
    borderRadius: calc(6),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});


export default class LeafLetMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTargetPanel: false,
    };
    this.openTargetPanel = this.openTargetPanel.bind(this);
    this.closeTargetPanel = this.closeTargetPanel.bind(this);
  }

  openTargetPanel() {
    this.setState({
      showTargetPanel: true,
    });
  }

  closeTargetPanel() {
    this.setState({
      showTargetPanel: false,
    });
  }

  render() {
    const { showTargetPanel } = this.state;

    return (
      <View style={styles.container}>
        <WebView
          style={{ backgroundColor: '#0c132c' }}
          source={{ uri: 'http://192.168.8.154/webview_map/index.html' }}
        />
        {/* 菜单按钮 */}
        <TouchableOpacity style={[styles.btn, styles.pos1]} onPress={this.openTargetPanel}>
          <View style={[styles.btn]}>
            <Icon name="menu" size={calc(24)} color="white" />
          </View>
        </TouchableOpacity>
        {/* 用户按钮 */}
        <View style={[styles.btn, styles.pos2]}>
          <Icon name="user" size={calc(24)} color="white" />
        </View>

        {/* 右下角四个按钮 对应 搜索、放大、缩小、定位当前位置 */}
        <View style={styles.btnListWrap}>
          <View style={[styles.btn, styles.flex0]}>
            <Icon name="search" size={calc(24)} color="white" />
          </View>

          <View style={[styles.btn, styles.flex0]}>
            <Icon name="plus" size={calc(24)} color="white" />
          </View>

          <View style={[styles.btn, styles.flex0]}>
            <Icon name="minus" size={calc(24)} color="white" />
          </View>

          <View style={[styles.btn, styles.flex0]}>
            <Icon name="aim" size={calc(24)} color="white" />
          </View>
        </View>

        {/* 顶部连接状态反馈 */}
        <View style={styles.topWarningBlock}>
          <View style={[styles.btn, styles.flex0]}>
            <Icon name="tablet" size={calc(24)} color="white" />
          </View>
          <Text style={{ color: '#fff', fontSize: calc(26), lineHeight: calc(48) }}>•••</Text>
          <View style={[styles.btn, styles.flex0]}>
            <Icon name="disconnect" size={calc(24)} color="white" />
          </View>
          <Text style={{ color: '#fff', fontSize: 26, lineHeight: calc(48) }}>•••</Text>
          <View style={[styles.btn, styles.flex0]}>
            <Icon name="desktop" size={calc(24)} color="white" />
          </View>
        </View>

        <TargetPanel isVisible={showTargetPanel} closeFn={this.closeTargetPanel} />
      </View>
    );
  }
}
