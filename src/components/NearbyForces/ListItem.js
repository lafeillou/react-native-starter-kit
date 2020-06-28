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

import { sendCommandToRemote } from '../../api/index';


const styles = StyleSheet.create({
  container: {
    flex: 0,
    // backgroundColor: '#0e1c3d',
    paddingLeft: calc(40),
    paddingRight: calc(40),
  },
  header: {
    height: calc(48),
    borderBottomWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
    borderColor: '#101f40',
    flexDirection: 'row',
  },
  hdLeft: {
    flex: 0,
    width: calc(80),
  },
  hdMid: {
    flex: 1,
  },
  hdRight: {
    flex: 0,
  },
});

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opend: false,
    };
    this.toggleShow = this.toggleShow.bind(this);
  }

  componentDidMount() {

  }

  toggleShow() {
    const { opend } = this.state;
    this.setState({
      opend: !opend,
    });
  }

  render() {
    const { opend } = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.toggleShow}>
          <View style={styles.header}>
            <View style={styles.hdLeft}>
              <Text style={{ color: '#fff', lineHeight: calc(48) }}>张三</Text>
            </View>
            <View style={styles.hdMid}>
              <Text style={{ color: '#fff', lineHeight: calc(48) }}>隶属xxxxx点位</Text>
            </View>
            <View style={styles.hdRight}>
              <Icon2 name={opend ? 'ios-arrow-down' : 'ios-arrow-up'} size={calc(24)} color="#fff" style={{ color: '#fff', lineHeight: calc(48) }} />
            </View>
          </View>
        </TouchableOpacity>

        {opend && (
        <View style={styles.content}>
          <Text style={{ color: '#fff', lineHeight: calc(40), opacity: 0.5 }}>组织岗位：岗位1</Text>
          <Text style={{ color: '#fff', lineHeight: calc(40), opacity: 0.5 }}>所在分队：分队1</Text>
          <Text style={{ color: '#fff', lineHeight: calc(40), opacity: 0.5 }}>家庭住址：南阳是邓州市XX街XX号</Text>
          <Text style={{ color: '#fff', lineHeight: calc(40), opacity: 0.5 }}>联系电话：123456789</Text>
        </View>
        )}
      </View>
    );
  }
}

ListItem.propTypes = {

};


// export default TargetObjectTabs;

const mapStateToProps = (state) => ({
  // currentTarget: state.app.currentTarget,
});

const mapDispatchToProps = (dispatch) => ({

});


export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
