
export default {
  namespace: 'app',
  state: {
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
    videoPause: true,
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
