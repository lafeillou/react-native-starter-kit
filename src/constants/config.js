import AsyncStorage from '@react-native-community/async-storage';

const isDevEnv = process.env.NODE_ENV === 'development';


export default {
  // App Details
  appName: 'ReactNativeStarterKit',

  // Build Configuration - eg. Debug or Release?
  isDevEnv,

  // Date Format
  dateFormat: 'Do MMM YYYY',

  async apiBaseUrl() {
    let globalRemoteUrl = '';
    globalRemoteUrl = await AsyncStorage.getItem('@GlobalRemoteUrl');
    // console.log(globalRemoteUrl);
    return globalRemoteUrl;
  },

  // Google Analytics - uses a 'dev' account while we're testing
  // gaTrackingId: isDevEnv ? 'UA-84284256-2' : 'UA-84284256-1',
};
