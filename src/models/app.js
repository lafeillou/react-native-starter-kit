
export default {
  namespace: 'app',
  state: {
    globalRemoteUrl: '',
    currentTarget: {
      id: '',
      classifyCode: '',
      classifyName: '',
      targetName: '',
      targetType: null,
      liablePerson: null,
      liableTellephone: null,
      targetLevel: 1,
      targetColor: '',
      targetSize: '',
      targetDesc: null,
      targetAddress: '',
      targetProvience: '',
      targetCity: '',
      targetDistrict: '',
      targetLocationType: null,
      targetLocation: null,
      targetLocationArea: '',
      creator: null,
      gmtCreate: '',
      modifier: null,
      gmtModify: '',
      pictureList: [],
      mediaList: [],
      videoPicturePath: '',
    },
    // 目前只支持一个视频
    videoPause: true,
    // 弹窗是否打开，已经弹窗的内容组件名称
    currentModal: {
      isVisible: false,
      componentName: '',
    },
    // 用户信息
    userInfo: null,
  },

  /**
   * Effects/Actions
   */
  effects: (dispatch) => ({

  }),


  /**
   * Reducers
   */
  reducers: {
    setUserInfo(state, payload) {
      return {
        ...state,
        userInfo: payload,
      };
    },
    setCurrentModal(state, payload) {
      return {
        ...state,
        currentModal: payload,
      };
    },
    setGlobalRemoteUrl(state, payload) {
      return {
        ...state,
        globalRemoteUrl: payload,
      };
    },
    setCurrentTarget(state, payload) {
      return {
        ...state,
        currentTarget: payload,
      };
    },

    toggleVideoPause(state, payload) {
      return {
        ...state,
        videoPause: !state.videoPause,
      };
    },
  },
};
