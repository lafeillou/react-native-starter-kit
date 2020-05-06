import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ToastAndroid, TouchableWithoutFeedback,
} from 'react-native';

import Icon from 'yofc-react-native-vector-icons/Iconfont';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Video from 'react-native-video';
import Modal from 'react-native-modal';
import { calc } from '../lib/utils';

import TargetObjectTabs from './TargetObjectTabs';

import { sendCommandToRemote } from '../api/index';


// import Lightbox from './BaseLightbox';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e1c3d',

  },

  header: {
    backgroundColor: '#212e4c',
    height: calc(48),
    flexDirection: 'row',
  },
  closeBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: calc(48),
    height: calc(48),
  },
  rightBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: calc(100),
    height: calc(48),
  },
  flex1: {
    flex: 1,
  },
  flex0: {
    flex: 0,
  },
  imageStyle: {
    width: calc(420),
    height: calc(300),
    marginLeft: calc(20),
    marginRight: calc(20),
    marginTop: calc(20),
  },
  backgroundVideo: {
    width: calc(420),
    height: calc(300),
    marginLeft: calc(20),
    marginRight: calc(20),
    marginTop: calc(20),
  },
  mediaPanel: {
    width: Dimensions.get('window').width * 0.75,
    height: Dimensions.get('window').height * 0.75,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    margin: 0,
    padding: 0,
    position: 'absolute',
    left: Dimensions.get('window').width * 0.125,
    top: Dimensions.get('window').height * 0.125,
  },
});

class TargetObject extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // 视频暂停
      videoPaused: true,
      // 文字、图片、视频弹窗
      mediaIsVisible: false,
      // 当前媒体内容;
      currentMedia: null,
    };
    this.closeDrawer = this.closeDrawer.bind(this);
    this.onBuffer = this.onBuffer.bind(this);
    this.videoError = this.videoError.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.dismissModalHandler = this.dismissModalHandler.bind(this);
  }

  componentDidMount() {
    // console.log('===================context=============');
    // console.log(this);
    // console.log(this.context);
  }

  // eslint-disable-next-line class-methods-use-this
  onBuffer(e) {
    // console.log(e);
  }

  // eslint-disable-next-line class-methods-use-this
  videoError(e) {
    // console.log(e);
  }

  // eslint-disable-next-line class-methods-use-this
  closeDrawer() {
    // const { currentMedia } = this.state;
    const { currentTarget } = this.props;
    // Actions.drawerClose();
    Actions.pop();

    // 发送远程指令
    sendCommandToRemote({
      targetId: currentTarget.id,
      eventSource: 'PAD',
      eventType: 'OBJECT',
      eventAction: 'UNSWITCH',
      eventAttachmentUrl: '',
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


  togglePlay() {
    const { videoPaused } = this.state;
    this.setState({
      videoPaused: !videoPaused,
    });
  }

  openLightbox() {
    const { setCurrentModal, currentTarget } = this.props;
    setCurrentModal({
      isVisible: true,
      componentName: '',
    });
    // 打开兵力部署弹窗
    // 发送远程指令
    sendCommandToRemote({
      targetId: currentTarget.id,
      eventSource: 'PAD',
      eventType: 'TROOPS',
      eventAction: 'SHOW',
    }).then((res) => {
      console.log('=============指令调用结果==================');
      console.log(res);
      if (res.status === 200) {
        ToastAndroid.showWithGravity(
          res.data.message,
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
        );
      }
    });
  }


  dismissModalHandler() {
    const { currentTarget } = this.props;
    const { currentMedia } = this.state;
    this.setState({
      mediaIsVisible: false,
    });
    this.togglePlay();
    // 发送远程指令
    sendCommandToRemote({
      targetId: currentTarget.id,
      eventSource: 'PAD',
      eventType: currentMedia.type.toUpperCase(),
      eventAction: 'HIDE',
      eventAttachmentUrl: `${currentMedia.fullPath}`,
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

  openMediaPanel(data) {
    const { currentTarget, globalRemoteUrl } = this.props;

    this.setState({
      mediaIsVisible: true,
      currentMedia: data,
    });

    if (data.type === 'video') {
      // 发送远程指令
      sendCommandToRemote({
        targetId: currentTarget.id,
        eventSource: 'PAD',
        eventType: 'VIDEO',
        eventAction: 'SHOW',
        eventAttachmentUrl: `${data.fullPath}`,
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
    } else if (data.type === 'picture') {
      // 发送远程指令
      sendCommandToRemote({
        targetId: currentTarget.id,
        eventSource: 'PAD',
        eventType: 'PICTURE',
        eventAction: 'SHOW',
        eventAttachmentUrl: `${data.fullPath}`,
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

    this.togglePlay();
  }

  render() {
    const { currentTarget, globalRemoteUrl } = this.props;
    const { videoPaused, mediaIsVisible, currentMedia } = this.state;
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <TouchableOpacity
            style={[styles.flex0, styles.closeBtn]}
            onPress={this.closeDrawer}
          >

            <Icon
              name="close"
              size={calc(18)}
              color="#45AEFF"
              style={{ lineHeight: calc(48), textAlign: 'center' }}
            />


          </TouchableOpacity>


          <View style={{ flex: 1 }}>
            <Text style={{
              color: '#45AEFF', lineHeight: calc(48), fontSize: calc(18), fontWeight: 'bold',
            }}
            >
              {currentTarget.targetName}
            </Text>
          </View>


          <TouchableOpacity style={[styles.flex0, styles.rightBtn]} onPress={this.openLightbox}>

            <Text style={{ color: '#45AEFF', lineHeight: calc(48), fontSize: calc(18) }}>兵力部署</Text>

          </TouchableOpacity>
        </View>


        <View style={{ flex: 1 }}>
          <TargetObjectTabs>
            <View style={{
              flex: 1,
            }}
            >
              {currentTarget.targetDesc && (
              <Text style={{
                color: '#fff', lineHeight: calc(20) * 1.5, paddingLeft: calc(20), paddingTop: calc(20), paddingRight: calc(20), paddingBottom: calc(20),
              }}
              >
                {currentTarget.targetDesc}
              </Text>
              )}

            </View>
            <View style={{ flex: 1 }}>

              {currentTarget.pictureList.map((o) => (
                <TouchableWithoutFeedback onPress={() => { this.openMediaPanel(Object.assign(o, { type: 'picture' })); }} key={o.fileId}>
                  <Image source={{ uri: `http://${globalRemoteUrl}/${o.fullPath}` }} style={styles.imageStyle} key={o.fileId} />
                </TouchableWithoutFeedback>
              ))}

            </View>
            <View style={{ flex: 1 }}>
              {currentTarget.mediaList.map((o) =>
              // 视频目前只支持一个
                (
                  <TouchableWithoutFeedback onPress={() => { this.openMediaPanel(Object.assign(o, { type: 'video' })); }} key={o.fileId}>
                    <Video
                      source={{ uri: `http://${globalRemoteUrl}/${o.fullPath}` }} // Can be a URL or a local file.
                      key={o.fileId}
                      ref={(ref) => {
                        this.player = ref;
                      }} // Store reference
                      onBuffer={this.onBuffer} // Callback when remote video is buffering
                      onError={this.videoError} // Callback when video cannot be loaded
                      style={[styles.backgroundVideo]}
                      paused
                      resizeMode="cover"
                      volume={0.1}
                    />
                  </TouchableWithoutFeedback>
                ))}
            </View>
          </TargetObjectTabs>
        </View>


        {/* 媒体内容弹窗，如文字、图片、视频 */}
        <Modal
          isVisible={mediaIsVisible}

          animationIn="zoomIn"
          animationOut="zoomOut"
          style={{
            padding: 0,
            margin: 0,
          }}

          customBackdrop={(
            <TouchableWithoutFeedback onPress={this.dismissModalHandler}>
              <View style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.85)',
              }}
              />
            </TouchableWithoutFeedback>
            )}
        >
          <View style={styles.mediaPanel}>
            {currentMedia && currentMedia.type === 'picture' && (<Image source={{ uri: `http://${globalRemoteUrl}/${currentMedia.fullPath}` }} style={[{ flex: 1, height: Dimensions.get('window').height * 0.75, width: Dimensions.get('window').width * 0.75 }]} key={currentMedia.fileId} />)}
            {currentMedia && currentMedia.type === 'video' && (
            <Video
              source={{ uri: `http://${globalRemoteUrl}/${currentMedia.fullPath}` }} // Can be a URL or a local file.
              key={currentMedia.fileId}
              ref={(ref) => {
                this.player = ref;
              }} // Store reference
              onBuffer={this.onBuffer} // Callback when remote video is buffering
              onError={this.videoError} // Callback when video cannot be loaded
              style={[{ flex: 1, height: Dimensions.get('window').height * 0.75, width: Dimensions.get('window').width * 0.75 }]}
              paused={videoPaused}
              resizeMode="cover"
              volume={0.1}
              controls

            />
            )}
          </View>
        </Modal>
      </View>
    );
  }
}

TargetObject.propTypes = {
  currentTarget: PropTypes.object,
  globalRemoteUrl: PropTypes.string,
  setCurrentModal: PropTypes.func,
};


const mapStateToProps = (state) => ({
  currentTarget: state.app.currentTarget,
  videoPause: state.app.videoPause,
  globalRemoteUrl: state.app.globalRemoteUrl,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentModal: dispatch.app.setCurrentModal,
});

export default connect(mapStateToProps, mapDispatchToProps)(TargetObject);
