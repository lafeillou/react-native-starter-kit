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
} from 'react-native';

import Slider from '@react-native-community/slider';

import PropTypes from 'prop-types';
import Icon from 'yofc-react-native-vector-icons/Iconfont';
import Icon2 from 'yofc-react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { calc } from '../../lib/utils';
import ListItem from './ListItem';

import { sendCommandToRemote } from '../../api/index';


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
    };
    this.toggleForceRangePanel = this.toggleForceRangePanel.bind(this);
  }

  componentDidMount() {

  }

  toggleForceRangePanel() {
    const { forceRangePanelOpened } = this.state;
    this.setState({
      forceRangePanelOpened: !forceRangePanelOpened,
    });
  }

  render() {
    const { forceRangePanelOpened } = this.state;
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.headerText}>查询范围半径(km)</Text>
        </View>

        <View style={styles.sliderWrap}>
          <View style={styles.leftText}>
            <Text style={{ color: '#fff' }}>0</Text>
          </View>

          <View style={styles.middle}>
            <Slider

              minimumValue={0}
              maximumValue={100}
              minimumTrackTintColor="#0e2d61"
              maximumTrackTintColor="#ffffff"
              thumbTintColor="#ffffff"
            />
          </View>

          <View style={styles.rightText}>
            <Text style={{ color: '#fff' }}>100</Text>
          </View>

        </View>

        <View style={styles.contentView}>
          <TouchableOpacity onPress={this.toggleForceRangePanel}>
            <View style={styles.contentViewHd}>
              <Text style={{ color: '#fff', lineHeight: calc(40), marginLeft: calc(20) }}>查询范围内兵力详情</Text>
              <Icon2 name={forceRangePanelOpened ? 'ios-arrow-down' : 'ios-arrow-up'} size={calc(24)} color="#fff" style={{ position: 'absolute', right: calc(20), top: calc(12) }} />
            </View>
          </TouchableOpacity>

          {forceRangePanelOpened && (
          <View style={{ flex: 1 }}>
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
          </View>
          )}
        </View>
      </View>
    );
  }
}

NearbyForces.propTypes = {

};


// export default TargetObjectTabs;

const mapStateToProps = (state) => ({
  // currentTarget: state.app.currentTarget,
});

const mapDispatchToProps = (dispatch) => ({

});


export default connect(mapStateToProps, mapDispatchToProps)(NearbyForces);
