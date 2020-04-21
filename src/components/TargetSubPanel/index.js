import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  StyleSheet, View, Text, TouchableOpacity, Switch, ScrollView, PixelRatio,
} from 'react-native';

// 接口
import Icon from 'react-native-vector-icons/Iconfont';
import { getTargetTreeList } from '../../api';

const styles = StyleSheet.create({
  container: {
    width: 322,
  },
  header: {
    backgroundColor: '#212e4c',
    height: 48,
  },
  body: {
    flex: 1,
  },
  headerIcon: {
    position: 'absolute',
    left: 18,
    top: 16,
  },
  title: {
    color: '#45AEFF',
    fontSize: 18,
    lineHeight: 48,
    marginLeft: 48,
  },
  listItem: {
    flex: 0,
    height: 56,
    backgroundColor: '#0e1c3d',
    position: 'relative',

  },
  listItemDivider: {
    height: 1 / PixelRatio.get(),
    width: 288,
    marginLeft: 18,
    marginRight: 16,
    backgroundColor: '#212e4c',
    position: 'absolute',
    bottom: 0,
  },
  closeBtn: {
    width: 48,
    height: 48,
    position: 'absolute',
    left: 0,
    top: 0,
  },
});


export default class TargetSubPanel extends Component {
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
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.list) {
      return {
        targetList: nextProps.list,
        currentFirstIndex: -1,
        title: nextProps.title,
      };
    }
    return null;
  }

  componentDidMount() {
    // const { list } = this.props;
    // const data = list.map((o) => {
    //   const temp = o;
    //   temp.isOn = false;
    //   return temp;
    // });
    // console.log('==========================list');
    // console.log(data);
    // this.setState({
    //   targetList: data,
    // });
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
    // 修改开关的状态
    const { targetList } = this.state;
    const data = targetList.map((o, i) => {
      if (index === i) {
        const temp = o;
        temp.isOn = !o.isOn;
      }
      return o;
    });
    this.setState({
      currentFirstIndex: index,
      targetList: data,
    });
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
                  size={18}
                  color="#45AEFF"
                  style={{ lineHeight: 48, textAlign: 'center' }}
                />
              </View>
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>

            <View style={{
              position: 'absolute', height: 48, right: 0, top: 0, alignItems: 'center',
            }}
            >
              <Switch
                style={{ flex: 1 }}
                thumbColor="#fefefe"
                trackColor={{ true: '#45aeff', false: 'fefefe' }}
                value={isAllOn}
                onValueChange={this.switchTopSwitchValue}
              />
            </View>
          </View>

          <View style={styles.body}>
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
              <View>
                {targetList.map(
                  (value, index) => (
                    <TouchableOpacity style={styles.listItem} onPress={() => { this.selectItem(index); }} key={`${value.classifyCode}_${value.targetName}_${value.id}`}>
                      <View style={[styles.listItem, currentFirstIndex === index ? { backgroundColor: '#45aeff' } : {}]}>
                        <Icon name="shiweizhengfu_2" size={24} color="#d36262" style={{ position: 'absolute', left: 20, top: 16 }} />
                        <Text style={{
                          color: '#fff', fontSize: 15, lineHeight: 56, marginLeft: 56,
                        }}
                        >
                          {value.targetName}
                        </Text>

                        <View style={{
                          flex: 1, alignItems: 'center', width: 56, height: 56, position: 'absolute', right: 0, top: 0,
                        }}
                        >
                          <Switch
                            style={{ flex: 1 }}
                            thumbColor="#fefefe"
                            trackColor={{ true: '#45aeff', false: 'fefefe' }}
                            value={value.isOn}
                            onValueChange={() => { this.switchFirstSwitchValue((index)); }}
                          />
                        </View>
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
};

TargetSubPanel.defaultProps = {
  isVisible: false,
  list: [],
  title: '',
  closeFn: () => {},
};
