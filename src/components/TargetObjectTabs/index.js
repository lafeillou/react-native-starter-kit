import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  PixelRatio,
} from 'react-native';

import PropTypes from 'prop-types';
import Icon from 'yofc-react-native-vector-icons/Iconfont';
import { calc } from '../../lib/utils';

const tabW = calc(460) / 3.0;
const tabMargin = 0;
const tabItemArr = [{ title: '文字', icon: 'font-size' }, { title: '图片', icon: 'image' }, { title: '视频', icon: 'play-circle' }];
const WIDTH = calc(460);
const maxW = (tabW + tabMargin) * tabItemArr.length;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e1c3d',
  },
  scrollViewStyle: {
    flex: 1,
  },
  itemStyle: {
    // 尺寸
    flex: 1,
    width: WIDTH,
  },
});

class TargetObjectTabs extends Component {
  constructor(props) {
    super(props);

    this.WIDTH = WIDTH;
    this.state = {
      tabArr: [],
      // currentIndex: 0,
    };
  }

  componentDidMount() {
    this._setIndex(0);
  }


  // 渲染每个tab页签
  _renderTabItem = (data, index) => {
    if (data.item.selected) {
      return (
        <TouchableOpacity key={index} onPress={() => this._tabClick(data.item.index)}>
          <View style={
                    {
                      height: calc(45),
                      marginLeft: tabMargin,
                      width: tabW,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#0e1c3d',
                      flexDirection: 'row',
                    }
}
          >

            <Icon
              name={data.item.icon}
              size={calc(24)}
              color="#45AEFF"
              style={{ lineHeight: calc(48), textAlign: 'center', marginRight: calc(8) }}
            />

            <Text style={{
              color: '#45AEFF', fontSize: calc(20), lineHeight: calc(45), fontWeight: 'bold',
            }}
            >
              {data.item.title}
            </Text>
            <View style={{
              position: 'absolute', height: calc(3), width: tabW, bottom: 0, left: 0, backgroundColor: '#45AEFF',
            }}
            />
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity key={index} onPress={() => this._tabClick(data.item.index)}>
        <View style={
                    {
                      height: calc(45),
                      marginLeft: tabMargin,
                      width: tabW,
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }
}
        >
          <Icon
            name={data.item.icon}
            size={calc(24)}
            color="#fff"
            style={{ lineHeight: calc(48), textAlign: 'center', marginRight: calc(8) }}
          />
          <Text style={{
            color: '#fff', fontSize: calc(20), lineHeight: calc(45), fontWeight: 'bold',
          }}
          >
            {data.item.title}
          </Text>

        </View>
      </TouchableOpacity>

    );
  }


  // 滑屏动作结尾
  _onAnimationEnd = (e) => {
    const offset = e.nativeEvent.contentOffset.x;
    if (offset < 0) {
      return;
    }
    // 300是专门针对M6平板的值,这里的问题我没有搞明白，目前
    const currentX = Math.floor(offset / 300);
    this._tabScrollToIndex(currentX);
  }

  // 单击某个页签
  _tabClick(index) {
    this._tabScrollToIndex(index);
    this._scrollView.scrollTo({ x: index * WIDTH, y: 0, animated: true });
  }

  // 渲染每个tab页签对应的内容区域
  _renderItem() {
    const itemAry = [];
    tabItemArr.forEach((o, i) => {
      itemAry.push(
        <View key={`${o.title}`} style={[styles.itemStyle]}>
          {this._getStepContents(i)}
        </View>,
      );
    });
    return itemAry;
  }


  _getStepContents(stepIndex) {
    const { children } = this.props;
    const child = children[stepIndex];
    return child.props.children;
  }

  _tabScrollToIndex(index) {
    this._setIndex(index);
    const centerX = this.WIDTH / 2.0;
    const tabOffset = index * (tabW + tabMargin);
    const itemX = tabOffset + (tabW / 2.0);
    let scrollX = itemX - centerX;
    if (scrollX < 0) {
      scrollX = 0;
    }
    if (scrollX >= maxW - this.WIDTH) {
      scrollX = maxW - this.WIDTH;
    }
    this._flatList.scrollToOffset({ offset: scrollX });
  }

  // 定位到某个tab
  _setIndex(index) {
    if (index >= tabItemArr.length) {
      return;
    }
    const arr = [];
    tabItemArr.forEach((o, i) => {
      let tabItem;
      if (i === index) {
        tabItem = {
          title: o.title,
          index: i,
          icon: o.icon,
          selected: true,
        };
      } else {
        tabItem = {
          title: o.title,
          index: i,
          icon: o.icon,
          selected: false,
        };
      }
      arr.push(
        tabItem,
      );
    });
    this.setState({
      tabArr: arr,
      // currentIndex: index,
    });
  }

  render() {
    const { tabArr } = this.state;
    return (
      <View style={styles.container}>

        <View style={{ width: this.WIDTH }}>
          <FlatList
            ref={(flatList) => { this._flatList = flatList; }}
            renderItem={this._renderTabItem}
            horizontal
            data={tabArr}
            keyExtractor={(v, i) => `${i}_${v}`}
          />
        </View>

        <ScrollView
          style={styles.scrollViewStyle}
          ref={(scrollView) => { this._scrollView = scrollView; }}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={this._onAnimationEnd}
        >
          {this._renderItem()}
        </ScrollView>
      </View>

    );
  }
}

TargetObjectTabs.propTypes = {
  children: PropTypes.any,
};
export default TargetObjectTabs;
