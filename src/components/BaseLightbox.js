import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View, StyleSheet, Animated, Dimensions, Button, Text, TouchableOpacity, ScrollView,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Icon from 'yofc-react-native-vector-icons/Iconfont';
import { calc } from '../lib/utils';


import { getTroopDispositionList } from '../api/index';

const { height: deviceHeight, width: deviceWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0, 0.15)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    height: calc(48),
    backgroundColor: '#212e4c',
  },
  body: {
    flex: 1,
    // backgroundColor: 'red',
    paddingLeft: calc(20),
    paddingRight: calc(20),
    paddingTop: calc(20),
    paddingBottom: calc(20),
  },
  tableHeader: {
    height: calc(48),
    flexDirection: 'row',
    backgroundColor: '#212e4c',
  },
  tableHeaderItem: {
    flex: 1,
    lineHeight: calc(48),
    color: '#fff',
    textAlign: 'center',
  },
  tableContent: {
    flex: 1,
    // backgroundColor: 'red',
  },
  listItem: {
    height: calc(48),
    flex: 1,
    flexDirection: 'row',
    // backgroundColor: 'red',
  },
});

class BaseLightbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opacity: new Animated.Value(0),
      troopDispositionList: [],
    };

    this.closeModal = this.closeModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
  }

  componentDidMount() {
    const { currentTarget } = this.props;
    const { opacity } = this.state;

    Animated.timing(opacity, {
      duration: 500,
      toValue: 1,
    }).start();

    // 加载兵力部署列表的数据
    getTroopDispositionList({
      targetId: currentTarget.id,
      pageNum: 1,
      pageSize: 1000,
    }).then((res) => {
      console.log(res);
      if (res.data.status === 200) {
        this.setState({
          troopDispositionList: res.data.data.records,
        });
      }
    });
  }


  _renderLightBox = () => {
    const { children, horizontalPercent = 1, verticalPercent = 1 } = this.props;
    const height = verticalPercent
      ? deviceHeight * verticalPercent
      : deviceHeight;
    const width = horizontalPercent
      ? deviceWidth * horizontalPercent
      : deviceWidth;

    const { troopDispositionList } = this.state;
    return (
      <View
        style={{
          width,
          height,
          // justifyContent: 'center',
          // alignItems: 'center',
          backgroundColor: '#0e1c3d',
          borderWidth: 1,
          borderColor: '#112346',
        }}
      >
        {/* {children} */}
        <View style={[styles.header, { width }]}>
          <Text style={{ lineHeight: calc(48), color: '#fff', marginLeft: calc(20) }}>兵力部署</Text>
          <TouchableOpacity
            style={{
              width: calc(48), height: calc(48), position: 'absolute', right: 0, top: 0,
            }}
            onPress={this.closeModal}
          >
            <Icon
              name="close"
              size={calc(24)}
              color="#45AEFF"
              style={{ lineHeight: calc(48), textAlign: 'center' }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.body}>
          <View style={styles.tableHeader}>

            <Text style={styles.tableHeaderItem}>姓名</Text>
            <Text style={styles.tableHeaderItem}>联系电话</Text>
            <Text style={styles.tableHeaderItem}>组织岗位</Text>
            <Text style={styles.tableHeaderItem}>所在分队</Text>
            <Text style={styles.tableHeaderItem}>家庭住址</Text>
          </View>

          <View style={styles.tableContent}>
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

              {troopDispositionList.map((o, index) => (

                <View style={[styles.listItem, { backgroundColor: (index + 1) % 2 === 0 ? '#172545' : 'transparent' }]} key={o.id}>
                  <Text style={styles.tableHeaderItem}>{o.name}</Text>
                  <Text style={styles.tableHeaderItem}>{o.telephone}</Text>
                  <Text style={styles.tableHeaderItem}>{o.orgPost}</Text>
                  <Text style={styles.tableHeaderItem}>{o.contingentName}</Text>
                  <Text style={styles.tableHeaderItem}>{o.homeAddress}</Text>
                </View>
              ))}

            </ScrollView>
          </View>

        </View>
      </View>
    );
  };

  closeModal() {
    const { opacity } = this.state;

    Animated.timing(opacity, {
      duration: 500,
      toValue: 0,
    }).start(this._closeModal); // Actions.pop
  }


  _closeModal() {
    const { setCurrentModal } = this.props;
    setCurrentModal({
      isVisible: false,
      componentName: '',
    });
  }

  render() {
    const { opacity } = this.state;
    return (
      <Animated.View style={[styles.container, { opacity }]}>
        {this._renderLightBox()}
      </Animated.View>
    );
  }
}

BaseLightbox.propTypes = {
  // children: PropTypes.any,
  horizontalPercent: PropTypes.number,
  verticalPercent: PropTypes.number,
  setCurrentModal: PropTypes.func,
  currentTarget: PropTypes.object,
};

const mapStateToProps = (state) => ({
  currentTarget: state.app.currentTarget,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentModal: dispatch.app.setCurrentModal,
});


export default connect(mapStateToProps, mapDispatchToProps)(BaseLightbox);
