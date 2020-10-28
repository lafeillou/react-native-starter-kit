import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  StyleSheet, View, Text, Dimensions, TouchableOpacity, Switch, ScrollView, PixelRatio, Image,
} from 'react-native';

import Icon from 'yofc-react-native-vector-icons/Iconfont';
import TargetSubPanel from '../TargetSubPanel';
// 接口
import { getTargetTreeList, sendCommandToRemote } from '../../api';

import { calc } from '../../lib/utils';

import ImageIconMap from '../ImageIcon';

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    backgroundColor: '#0e1c3d',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  header: {
    backgroundColor: '#212e4c',
    height: calc(48),
  },
  body: {
    flex: 1,
  },
  headerIcon: {
    position: 'absolute',
    left: calc(18),
    top: calc(16),
  },
  title: {
    color: '#45AEFF',
    fontSize: calc(18),
    lineHeight: calc(48),
    marginLeft: calc(48),
  },
  listItem: {
    flex: 0,
    height: calc(56),
    backgroundColor: '#0e1c3d',
    position: 'relative',

  },
  listItemDivider: {
    height: 1 / PixelRatio.get(),
    width: calc(288),
    marginLeft: calc(18),
    marginRight: calc(16),
    backgroundColor: '#212e4c',
    position: 'absolute',
    bottom: 0,
  },
  closeBtn: {
    width: calc(48),
    height: calc(48),
    position: 'absolute',
    left: 0,
    top: 0,
  },
});


export default class TargetPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAllOn: false,
      // 显示模式,为true则将所有目标作为背景显示
      showMode: true,
      targetList: [],
      // 当前选中的一级分类
      currentFirstIndex: -1,
      // 是否显示二级分类列表
      showTargetSubPanel: false,
      // 当前面板宽度
      currentWidth: calc(322),
      // 二级列表
      childList: [],
      // 二级列表标题：
      title: '',
      // 二级列表当前选中的节点索引
      selectedIndex: -1,
    };

    this.switchTopSwitchValue = this.switchTopSwitchValue.bind(this);
    this.switchFirstSwitchValue = this.switchFirstSwitchValue.bind(this);
    this.closeThisPanel = this.closeThisPanel.bind(this);
    this.closeTargetSubPanel = this.closeTargetSubPanel.bind(this);
    this.pressTargetItem = this.pressTargetItem.bind(this);
    this.getChildTargetList = this.getChildTargetList.bind(this);
    // this.isAllOn = this.isAllOn.bind(this);
    this.childListItemSelected = this.childListItemSelected.bind(this);
    this.switchShowMode = this.switchShowMode.bind(this);
    // 传递数据，在地图上显示所有目标作为背景
    this.dispatchAllGeoJsonDataAsBgToH5 = this.dispatchAllGeoJsonDataAsBgToH5.bind(this);
  }


  componentDidMount() {
    getTargetTreeList({
      queryAreaType: 'CITY',
      queryAreaName: '鹤壁市',
      keyword: '',
    }).then((res) => {
      // console.log(res);
      if (res.status === 200) {
        // 处理一下res.data.data, 标记其子元素上一种状态，即全部灯亮的状态isOn ,注意区别于全局灯亮的isAllOn
        const data = res.data.data.map((o) => {
          const temp = o;
          temp.isOn = false;
          return temp;
        });
        // console.log(data);
        this.setState({
          targetList: data,
        });
      }
    });
  }

  // 获取当前节点子节点数据
  getChildTargetList() {
    const { targetList, currentFirstIndex } = this.state;
    return targetList[currentFirstIndex].targets;
  }

  // 顶级开关
  switchTopSwitchValue() {
    const { isAllOn } = this.state;
    this.setState(
      {
        isAllOn: !isAllOn,
      },
    );

    // 将所有一级的开关都打开
    const { targetList } = this.state;
    targetList.forEach((o) => {
      const temp = o;
      temp.isOn = !isAllOn;
      // 二级开关也需要设置
      temp.targets.forEach((obj) => {
        const temp2 = obj;
        temp2.isOn = !isAllOn;
      });
    });
    this.setState({
      targetList,
    });
    // 将所有二级的快关都打开
  }

  // 一级开关
  switchFirstSwitchValue(index) {
    const { targetList } = this.state;
    targetList[index].isOn = !targetList[index].isOn;
    targetList[index].targets.forEach((obj) => {
      const temp2 = obj;
      temp2.isOn = targetList[index].isOn;
    });

    this.setState({
      targetList,
    });
  }

  closeThisPanel() {
    const { closeFn } = this.props;
    closeFn();
  }


  // 选中某个一级分类
  selectItem(index) {
    const { targetList } = this.state;
    // 设置二级列表数据
    this.setState({
      currentFirstIndex: index,
      childList: targetList[index].targets,
      title: targetList[index].targetClassify.classifyName,
      selectedIndex: -1,
    });
  }

  // 关闭二级分类列表
  closeTargetSubPanel() {
    this.setState({
      showTargetSubPanel: false,
      // 必须得修改当前面板的宽度
      currentWidth: calc(322),
    });
  }

  pressTargetItem(index) {
    this.setState({
      showTargetSubPanel: true,
      // 必须得修改当前面板的宽度
      currentWidth: calc(322) * 2,
    });
    this.selectItem(index);
  }

  // 切换显示模式
  switchShowMode() {
    const { showMode, targetList } = this.state;
    this.setState(
      {
        showMode: !showMode,
      },
    );
    // 发出指令，让h5显示所有的目标作为背景
    this.dispatchAllGeoJsonDataAsBgToH5({
      showMode: !showMode,
      targetList,
    });
    // 通知外界
    // 向远端发送指令
    sendCommandToRemote({
      targetId: '',
      eventSource: 'PAD',
      eventType: 'MAP',
      eventAction: 'SHOWALLTARGETS',
      eventAttachmentUrl: !showMode, // true: 全部target显示； false：一个时间仅显示一个
    }).then((res) => {
      // console.log('=============指令调用结果==================');
      console.log(res);
    });
  }

  // 子组件传来状态,某个子节点被选中状态
  childListItemSelected(index, bool) {
    const { targetList, currentFirstIndex, selectedIndex } = this.state;
    targetList[currentFirstIndex].targets.forEach((o, i) => {
      if (i === index) {
        // eslint-disable-next-line no-param-reassign
        o.isOn = bool;
      }
    });

    let isOn = false;

    isOn = targetList[currentFirstIndex].targets.every((o) => o.isOn);


    targetList[currentFirstIndex].isOn = isOn;

    let isAllOn = false;

    isAllOn = targetList.every((o) => o.isOn);


    this.setState({
      targetList,
      isAllOn,
      selectedIndex: index,
    });
  }

  dispatchAllGeoJsonDataAsBgToH5(data) {
    const { webref } = this.context;
    const json = {
      callback: 'window.Vue.$emit("dispatchAllGeoJsonDataAsBgToH5", {data: data.data})',
      args: {
        data: JSON.stringify(data),
      },
    };
    // console.log('==================显示地图上所有目标作为背景========================');
    // console.log(this.context);
    webref.injectJavaScript(`webviewCallback(${JSON.stringify(json)})`);
  }

  render() {
    const {
      isAllOn, showMode, targetList, currentFirstIndex, showTargetSubPanel, selectedIndex,
      currentWidth, childList, title,
    } = this.state;
    const { isVisible } = this.props;
    if (isVisible) {
      return (
        <View style={[styles.container, { width: currentWidth, flexDirection: 'row' }]}>
          <View style={{ flex: 1 }}>
            <View style={styles.header}>
              <TouchableOpacity style={styles.closeBtn} onPress={this.closeThisPanel}>
                <View style={styles.closeBtn}>
                  <Icon
                    name="close"
                    size={calc(18)}
                    color="#45AEFF"
                    style={{ lineHeight: calc(48), textAlign: 'center' }}
                  />
                </View>
              </TouchableOpacity>
              <Text style={styles.title}>目标控制器</Text>

              {/* <View style={{
                position: 'absolute', height: calc(48), right: calc(4), top: 0, alignItems: 'center',
              }}
              >
                <Switch
                  style={{ flex: 1 }}
                  thumbColor="#fefefe"
                  trackColor={{ true: '#45aeff', false: 'fefefe' }}
                  value={isAllOn}
                  onValueChange={this.switchTopSwitchValue}
                />
              </View> */}

              {/* 显示模式控制,打开时所有的目标作为背景，在屏幕上显示 */}

              <View style={{
                position: 'absolute', height: calc(48), right: calc(4), top: 0, alignItems: 'center',
              }}
              >
                <Switch
                  style={{ flex: 1 }}
                  thumbColor="#fefefe"
                  trackColor={{ true: '#45aeff', false: 'fefefe' }}
                  value={showMode}
                  onValueChange={this.switchShowMode}
                />
              </View>
            </View>

            <View style={styles.body}>
              <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                {/* <View> */}
                {targetList.map(
                  (value, index) => (
                    <TouchableOpacity style={styles.listItem} onPress={() => { this.pressTargetItem(index); }} key={`${value.targetClassify.classifyCode}_${value.targetClassify.classifyOrder}`}>
                      <View style={[styles.listItem, currentFirstIndex === index ? { backgroundColor: '#45aeff' } : {}]}>
                        {/* <Icon name="shiweizhengfu_2" size={calc(24)} color="#d36262" style={{ position: 'absolute', left: calc(20), top: calc(16) }} /> */}

                        <Image
                          source={ImageIconMap[value.targetClassify.classifyCode]}
                          style={{
                            width: calc(40), height: calc(40), position: 'absolute', left: calc(20), top: calc(10),
                          }}
                        />
                        <Text style={{
                          color: '#fff', fontSize: calc(24), lineHeight: calc(56), marginLeft: calc(70),
                        }}
                        >
                          {value.targetClassify.classifyName}
                        </Text>
                        <Icon name="right" size={calc(20)} color="#fff" style={{ position: 'absolute', right: calc(16), top: calc(16) }} />
                        <View style={styles.listItemDivider} />
                      </View>
                    </TouchableOpacity>
                  ),
                )}
                {/* </View> */}
              </ScrollView>
            </View>
          </View>
          <TargetSubPanel
            isVisible={showTargetSubPanel}
            closeFn={this.closeTargetSubPanel}
            onSelected={this.childListItemSelected}
            list={childList}
            title={title}
            selectedIndex={selectedIndex}
            style={{ flex: 1 }}
          />
        </View>
      );
    }
    return null;
  }
}


TargetPanel.propTypes = {
  isVisible: PropTypes.bool,
  closeFn: PropTypes.func,
};

TargetPanel.defaultProps = {
  isVisible: false,
  closeFn: () => {},
};

TargetPanel.contextTypes = {
  webref: PropTypes.object,
  setCurrentFocusTarget: PropTypes.func,
};
