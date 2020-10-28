import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  PixelRatio,
  ToastAndroid,
  DeviceEventEmitter,
} from 'react-native';

import Slider from '@react-native-community/slider';

import PropTypes from 'prop-types';
import Icon from 'yofc-react-native-vector-icons/Iconfont';
import Icon2 from 'yofc-react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
// import _ from 'lodash';
import { calc } from '../../lib/utils';
import TargetItem from './TargetItem';

import { sendCommandToRemote, getForceList } from '../../api/index';

const styles = StyleSheet.create({
  container: {
    flex: 0,
    // backgroundColor: '#0e1c3d',
  },
  header: {
    height: calc(40),
    lineHeight: calc(40),
    marginTop: calc(20),
    marginLeft: calc(20),
    marginBottom: calc(10),
  },
  headerText: {
    color: '#fff',
  },
  sliderWrap: {
    flexDirection: 'row',
    paddingLeft: calc(20),
    paddingRight: calc(20),
  },
  leftText: {
    flex: 0,

  },
  rightText: {
    flex: 0,

  },
  middle: {
    flex: 1,
  },
  contentView: {
    flex: 1,
    marginTop: calc(20),
  },
  contentViewHd: {
    height: calc(40),
    lineHeight: calc(40),
  },
});

class NearbyForces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forceRangePanelOpened: true,
      // 当前范围值
      currentRangeRadius: 0,
      // 指定范围内兵员数据
      targetsDataInRange: [],
      // 当前人员总人数
      forceNum: 0,
    };
    this.toggleForceRangePanel = this.toggleForceRangePanel.bind(this);
    this.onValueChangeHandle = this.onValueChangeHandle.bind(this);
    this.onSlidingCompleteHandle = this.onSlidingCompleteHandle.bind(this);
    this.drawCircle = this.drawCircle.bind(this);
  }

  componentDidMount() {
    this.onSlidingCompleteHandle();
  }

  onValueChangeHandle($event) {
    const { currentTarget } = this.props;
    this.setState({
      currentRangeRadius: $event,
    });

    this.drawCircle({
      targetLocation: JSON.parse(currentTarget.targetLocation),
      radius: $event,
    });
  }

  onSlidingCompleteHandle($event) {
    const { currentRangeRadius } = this.state;
    const { currentTarget } = this.props;
    // console.log('=======================滑动结束==========');
    // console.log($event);
    // console.log(this.props.currentTarget);
    getForceList({
      targetId: currentTarget.id,
      radius: currentRangeRadius,
    }).then((res) => {
      if (res.status === 200) {
        this.setState({
          targetsDataInRange: res.data.data,
        });

        let forceNum = 0;
        // 统计当前人数
        res.data.data.forEach((o) => {
          if (o.troopsList.length > 0) {
            forceNum += o.troopsList.length;
          }
        });

        this.setState({
          forceNum,
        });
        // this.drawCircle({
        //   targetLocation: JSON.parse(currentTarget.targetLocation),
        //   radius: $event,
        // });
        // 发送远程指令
        sendCommandToRemote({
          targetId: currentTarget.id,
          eventSource: 'PAD',
          eventType: 'OBJECT',
          eventAction: 'DRAWCIRCLE',
          eventAttachmentUrl: JSON.stringify({ radius: currentRangeRadius * 1000 }),
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
    });
  }

  toggleForceRangePanel() {
    const { forceRangePanelOpened } = this.state;
    this.setState({
      forceRangePanelOpened: !forceRangePanelOpened,
    });
  }


  drawCircle(data) {
    DeviceEventEmitter.emit('drawCircleEvent', data);
  }

  render() {
    const {
      forceRangePanelOpened, currentRangeRadius, targetsDataInRange, forceNum,
    } = this.state;
    const { currentTarget } = this.props;
    return (
      <View style={styles.container}>

        <View style={[styles.header, { marginBottom: calc(10) }]}>
          {/* <Text style={styles.headerText}>
            目标点位经纬度
          </Text> */}
          <Text style={styles.headerText}>
            {`经度：${JSON.parse(currentTarget.targetLocation)[0]} °E     纬度:${JSON.parse(currentTarget.targetLocation)[1]}°N`}
          </Text>
        </View>
        <View style={styles.header}>

          <Text style={styles.headerText}>
            {`查询范围半径(${currentRangeRadius.toFixed(1)}km)`}
          </Text>
        </View>

        <View style={styles.sliderWrap}>
          <View style={styles.leftText}>
            <Text style={{ color: '#fff' }}>0</Text>
          </View>

          <View style={styles.middle}>
            <Slider
              onValueChange={this.onValueChangeHandle}
              onSlidingComplete={this.onSlidingCompleteHandle}
              minimumValue={0}
              maximumValue={10}
              minimumTrackTintColor="#0e2d61"
              maximumTrackTintColor="#ffffff"
              thumbTintColor="#ffffff"
              step={0.1}
            />
          </View>

          <View style={styles.rightText}>
            <Text style={{ color: '#fff' }}>10</Text>
          </View>

        </View>

        <View style={styles.contentView}>
          <TouchableOpacity onPress={this.toggleForceRangePanel}>
            <View style={styles.contentViewHd}>
              <Text style={{ color: '#fff', lineHeight: calc(40), marginLeft: calc(20) }}>
                查询范围内兵力详情(共
                {forceNum}
                人)
              </Text>
              <Icon2 name={forceRangePanelOpened ? 'ios-arrow-up' : 'ios-arrow-down'} size={calc(24)} color="#fff" style={{ position: 'absolute', right: calc(20), top: calc(12) }} />
            </View>
          </TouchableOpacity>

          {forceRangePanelOpened && (
          <View style={{ flex: 1 }}>
            {targetsDataInRange.filter((o) => o.troopsList.length > 0).map((o) => (<TargetItem key={o.id} {...o} />))}
          </View>
          )}
        </View>
      </View>
    );
  }
}

NearbyForces.propTypes = {
  currentTarget: PropTypes.object,
  webref: PropTypes.object,
};


// export default TargetObjectTabs;

const mapStateToProps = (state) => ({
  currentTarget: state.app.currentTarget,
  webref: state.app.webref,
});

const mapDispatchToProps = (dispatch) => ({

});


export default connect(mapStateToProps, mapDispatchToProps)(NearbyForces);
