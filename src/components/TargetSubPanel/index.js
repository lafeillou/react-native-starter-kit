import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, View, Text, TouchableOpacity, Switch, ScrollView, PixelRatio, ToastAndroid, Image,
} from 'react-native';

import Icon from 'yofc-react-native-vector-icons/Iconfont';

import { connect } from 'react-redux';
import ImageIconMap from '../ImageIcon';

// 接口
import { sendCommandToRemote } from '../../api/index';
import { calc } from '../../lib/utils';

// 引入react-redux


const styles = StyleSheet.create({
  container: {
    width: calc(322),
  },
  header: {
    backgroundColor: '#212e4c',
    height: calc(48),
  },
  body: {
    flex: 1,
    // borderWidth: 5,
    // borderColor: 'red',
    paddingBottom: calc(48),
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


class TargetSubPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAllOn: false,
      targetList: [],
      // 当前选中的一级分类
      currentFirstIndex: -1,
    };

    this.switchTopSwitchValue = this.switchTopSwitchValue.bind(this);
    this.switchFirstSwitchValue = this.switchFirstSwitchValue.bind(this);
    this.closeThisPanel = this.closeThisPanel.bind(this);
    this.dispatchGeoJsonDataToH5 = this.dispatchGeoJsonDataToH5.bind(this);
    this.drawCircle = this.drawCircle.bind(this);
  }

  static getDerivedStateFromProps(nextProps) {
    let isAllOn = false;
    const { list } = nextProps;
    isAllOn = list.every((o) => o.isOn);
    if (nextProps.list) {
      return {
        targetList: nextProps.list,
        currentFirstIndex: nextProps.selectedIndex,
        title: nextProps.title,
        isAllOn,
      };
    }

    return null;
  }

  componentDidMount() {
    // console.log('==========================TargetSubPanel组件=======');
    // console.log(this);
  }

  // 顶级开关
  switchTopSwitchValue() {
    const { onSelected } = this.props;
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
    });


    this.setState({
      targetList,
    });
    // 这个写法很不好
    targetList.forEach((o, index) => {
      onSelected(index, o.isOn);
    });
  }

  // 一级开关
  switchFirstSwitchValue(index) {
    const { targetList } = this.state;
    const { onSelected } = this.props;

    targetList[index].isOn = !targetList[index].isOn;

    this.setState({
      targetList,
    });
    onSelected(index, targetList[index].isOn);
    this.dispatchGeoJsonDataToH5(targetList[index]);
  }

  closeThisPanel() {
    const { closeFn } = this.props;
    closeFn();
  }


  // 选中某个一级分类
  selectItem(index) {
    // 修改开关的状态
    const { targetList } = this.state;
    const data = targetList.map((o, i) => {
      const temp = o;
      if (index === i) {
        temp.isOn = true;
      } else {
        temp.isOn = false;
      }
      return o;
    });
    this.setState({
      currentFirstIndex: index,
      targetList: data,
    });

    // 通知一级分类数据变更
    const { onSelected, setCurrentTarget } = this.props;
    // 修改redux中当前选中目标的值
    setCurrentTarget(data[index]);
    onSelected(index, data[index].isOn);
    // 分发数据给webview中的h5页面，将地图上的自定义图层点亮（自定义图层为GeoJson数据)
    // 选中目标数据
    // console.log('=====================目标数据==========================');
    // console.log(data[index]);

    // console.log('=================当前聚焦的点参考================');
    // console.log(data[index]);


    this.dispatchGeoJsonDataToH5(data[index]);
    // 向远端发送指令
    sendCommandToRemote({
      // "targetId":7(目标对象的ID),
      // "eventSource":"PAD|PC|DI(光感输入信号)",
      // "eventType":"OBJECT(目标对象)|DESCRIBE(文字描述)|PICTURE(图片)|VIDEO(视频)",
      // "eventAction":"LOCATE(目标对象在地图中定位)|SWITCH(目标对象附加tab页的切换动作)|SHOW(附件资料在地图中央的居中弹层展示或播放)",
      // eslint-disable-next-line max-len
      // "eventAttachmentUrl":"eventType=PICTURE|VIDEO & eventAction=SHOW时 必填  内容为 附件URL  可通过http方式直接调用"
      targetId: data[index].id,
      eventSource: 'PAD',
      eventType: 'OBJECT',
      eventAction: 'LOCATE',
    }).then((res) => {
      // console.log('=============指令调用结果==================');
      // console.log(res);
      if (res.status === 200) {
        ToastAndroid.showWithGravity(
          res.data.message,
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
        );
      }
    });
  }

  //
  dispatchGeoJsonDataToH5(data) {
    const { webref, setCurrentFocusTarget } = this.context;
    const json = {
      callback: 'window.Vue.$emit("dispatchGeoJsonDataToH5", {data: data.data})',
      args: {
        data: JSON.stringify(data),
      },
    };
    // console.log('==================打印上下文========================');
    // console.log(this.context);
    webref.injectJavaScript(`webviewCallback(${JSON.stringify(json)})`);
    // 设置当前聚焦的点
    setCurrentFocusTarget(data);
    // 设置当前的目标范围 为0
    this.drawCircle({
      targetLocation: JSON.parse(data.targetLocation),
      radius: 0,
    });
  }

  drawCircle(data) {
    const { webref } = this.context;
    const json = {
      callback: 'window.Vue.$emit("drawCircle", {data: data.data})',
      args: {
        data: JSON.stringify(data),
      },
    };
    console.log('==================在地图上画出指定公里数半径的圆圈========================');
    // console.log(data);
    webref.injectJavaScript(`webviewCallback(${JSON.stringify(json)})`);
  }

  render() {
    const {
      isAllOn, targetList, currentFirstIndex, title,
    } = this.state;
    const { isVisible } = this.props;
    if (isVisible) {
      return (
        <View style={styles.container}>
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
            <Text style={styles.title}>{title}</Text>

            {/* <View style={{
              position: 'absolute', height: calc(48), right: 0, top: 0, alignItems: 'center',
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
          </View>

          <View style={styles.body}>
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
              <View>
                {targetList.map(
                  (value, index) => (
                    <TouchableOpacity style={styles.listItem} onPress={() => { this.selectItem(index); }} key={`${value.classifyCode}_${value.targetName}_${value.id}`}>
                      <View style={[styles.listItem, currentFirstIndex === index ? { backgroundColor: '#45aeff' } : {}]}>
                        {/* <Icon name="shiweizhengfu_2" size={24} color="#d36262" style={{ position: 'absolute', left: calc(20), top: calc(16) }} /> */}
                        <Image
                          source={ImageIconMap[value.classifyCode]}
                          style={{
                            width: calc(40), height: calc(40), position: 'absolute', left: calc(20), top: calc(8),
                          }}
                        />

                        <Text style={{
                          color: '#fff', fontSize: calc(20), lineHeight: calc(56), marginLeft: calc(70),
                        }}
                        >
                          {value.targetName}
                        </Text>

                        {/* <View style={{
                          flex: 1, alignItems: 'center', width: calc(56), height: calc(56),
                          // position: 'absolute', right: calc(16), top: 0,
                        }}
                        >
                          <Switch
                            style={{ flex: 1 }}
                            thumbColor="#fefefe"
                            trackColor={{ true: '#45aeff', false: 'fefefe' }}
                            value={value.isOn}
                            onValueChange={() => { this.switchFirstSwitchValue((index)); }}
                          />
                        </View> */}
                        <View style={styles.listItemDivider} />
                      </View>
                    </TouchableOpacity>
                  ),
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      );
    }
    return null;
  }
}


TargetSubPanel.propTypes = {
  isVisible: PropTypes.bool,
  closeFn: PropTypes.func,
  list: PropTypes.array, // 为什么eslint 提示有问题
  title: PropTypes.string,
  onSelected: PropTypes.func,
  selectedIndex: PropTypes.number,
  setCurrentTarget: PropTypes.func,

};

TargetSubPanel.defaultProps = {
  isVisible: false,
  list: [],
  title: '',
  closeFn: () => {},
  onSelected: () => {},
};

TargetSubPanel.contextTypes = {
  webref: PropTypes.object,
  setCurrentFocusTarget: PropTypes.func,
};


const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  setCurrentTarget: dispatch.app.setCurrentTarget,
});


export default connect(mapStateToProps, mapDispatchToProps)(TargetSubPanel);
