import 'react-native-get-random-values';
import React, { Component } from 'react';

import {
  StyleSheet, View, Text, Dimensions, TouchableOpacity,
} from 'react-native';

import { WebView } from 'react-native-webview';
import Icon from 'yofc-react-native-vector-icons/Iconfont';

// import PropTypes  from 'prop-types';
import { calc } from '../lib/utils';

import TargetPanel from './TargetPanel';

import clientMethod from '../lib/postJsCode';

const patchPostMessageJsCode = `(${String(clientMethod)})(); true;`;


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

  // 左下角地图切换按钮
  layerSwitch: {
    width: calc(96),
    height: calc(48),
    backgroundColor: '#212e4c',
    position: 'absolute',
    left: calc(20),
    bottom: calc(20),
    borderRadius: calc(6),
    flexDirection: 'row',
  },
});


export default class LeafLetMap extends Component {
  webref = null;

  constructor(props) {
    super(props);
    this.state = {
      showTargetPanel: false,
    };
    this.openTargetPanel = this.openTargetPanel.bind(this);
    this.closeTargetPanel = this.closeTargetPanel.bind(this);
    this.testClick = this.testClick.bind(this);
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
  }


  componentDidMount() {

  }

  /** *
     * 接收web发送过来的消息，调用rn中提供的方法
     */
    onMessage = (event) => {
      const data = JSON.parse(event.nativeEvent.data);
      if (!data) {
        return;
      }
      const { type, params, callback } = data;

      const json = {
        callback,
        args: params,
      };
      switch (type) {
        case 'getUser':
          this.webref.injectJavaScript(`webviewCallback(${JSON.stringify(json)})`);
          break;
        default:
          break;
      }
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

    testClick() {
      // console.log('testClick');
      const json = {
        // 传入函数体,这个写法很反人类
        callback: String(`
          alert(data.name)
          alert(data.age)
        `),
        args: {
          name: 'lafeillou',
          age: 34,
        },
      };
      this.webref.injectJavaScript(`webviewCallback(${JSON.stringify(json)})`);
    }

    // 放大地图
    zoomIn() {
      const json = {
        callback: 'window.Vue.$emit("zoomIn");',
        args: {},
      };
      this.webref.injectJavaScript(`webviewCallback(${JSON.stringify(json)})`);
    }


    // 缩小地图
    zoomOut() {
      const json = {
        callback: 'window.Vue.$emit("zoomOut");',
        args: {},
      };
      this.webref.injectJavaScript(`webviewCallback(${JSON.stringify(json)})`);
    }

    render() {
      const { showTargetPanel } = this.state;

      return (
        <View style={styles.container}>
          <WebView
            onMessage={this.onMessage}
            ref={(r) => { this.webref = r; }}
            injectedJavaScript={patchPostMessageJsCode}
            style={{ backgroundColor: '#0c132c' }}
            source={{ uri: 'http://10.90.132.112:8080/' }}
          />
          {/* 菜单按钮 */}
          <TouchableOpacity style={[styles.btn, styles.pos1]} onPress={this.openTargetPanel}>
            <View style={[styles.btn]}>
              <Icon name="menu" size={calc(24)} color="white" />
            </View>
          </TouchableOpacity>
          {/* 用户按钮 */}
          <TouchableOpacity style={[styles.btn, styles.pos2]} onPress={this.testClick}>
            <View style={[styles.btn]}>
              <Icon name="user" size={calc(24)} color="white" />
            </View>
          </TouchableOpacity>

          {/* 右下角四个按钮 对应 搜索、放大、缩小、定位当前位置 */}
          <View style={styles.btnListWrap}>

            <TouchableOpacity style={[styles.btn, styles.flex0]}>
              <View style={[styles.btn, styles.flex0]}>
                <Icon name="search" size={calc(24)} color="white" />
              </View>
            </TouchableOpacity>


            <TouchableOpacity style={[styles.btn, styles.flex0]} onPress={this.zoomIn}>
              <View style={[styles.btn, styles.flex0]}>
                <Icon name="plus" size={calc(24)} color="white" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btn, styles.flex0]} onPress={this.zoomOut}>
              <View style={[styles.btn, styles.flex0]}>
                <Icon name="minus" size={calc(24)} color="white" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btn, styles.flex0]}>
              <View style={[styles.btn, styles.flex0]}>
                <Icon name="aim" size={calc(24)} color="white" />
              </View>
            </TouchableOpacity>
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

          {/* 左下角地图切换按钮 */}
          <View style={styles.layerSwitch}>
            <TouchableOpacity style={[{ flex: 1 }]}>
              <Text style={{
                color: '#fff', lineHeight: calc(48), fontSize: calc(14), textAlign: 'center',
              }}
              >
                地球
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[{ flex: 1 }]}>
              <Text style={{
                color: '#fff', lineHeight: calc(48), fontSize: calc(14), textAlign: 'center',
              }}
              >
                卫星
              </Text>
            </TouchableOpacity>
          </View>
          <TargetPanel isVisible={showTargetPanel} closeFn={this.closeTargetPanel} />
        </View>
      );
    }
}
