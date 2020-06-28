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
import ListItem from './ListItem';

const styles = StyleSheet.create({
  container: {
    flex: 0,
  },
});

class TargetItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opend: false,
    };
  }

  componentDidMount() {

  }


  render() {
    const { troopsList } = this.props;

    return (
      <View style={styles.container}>

        {troopsList.map((o) => (
          <ListItem {...this.props} {...o} />
        ))}

      </View>
    );
  }
}

TargetItem.propTypes = {

};


// export default TargetObjectTabs;

const mapStateToProps = (state) => ({
  // currentTarget: state.app.currentTarget,
});

const mapDispatchToProps = (dispatch) => ({

});


export default connect(mapStateToProps, mapDispatchToProps)(TargetItem);
