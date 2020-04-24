import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import {
  Router, Scene, Stack, Overlay, Modal, Lightbox,
} from 'react-native-router-flux';
import { PersistGate } from 'redux-persist/es/integration/react';
import SplashScreen from 'react-native-splash-screen';

import { Root, StyleProvider } from 'native-base';
import getTheme from '../native-base-theme/components';
import theme from '../native-base-theme/variables/commonColor';

import Routes from './routes/index';
// import TargetObjectDrawerRoutes from './routes/targetObjectDrawer';
import Login from './components/Login';

import Loading from './components/UI/Loading';

class App extends React.Component {
  constructor() {
    super();
    this.state = { loading: true };
  }

  async componentDidMount() {
    SplashScreen.hide();
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    const { store, persistor } = this.props;

    if (loading) {
      return <Loading />;
    }

    return (
      <Root>
        <Provider store={store}>
          <PersistGate loading={<Loading />} persistor={persistor}>
            <StyleProvider style={getTheme(theme)}>
              <Router>

                <Overlay key="overlay">
                  <Modal key="modal" hideNavBar>
                    {/* <Lightbox key="lightbox"> */}
                    <Scene hideNavBar key="login" component={Login} />
                    {Routes}
                    {/* {TargetObjectDrawerRoutes} */}
                    {/* </Lightbox> */}
                  </Modal>
                </Overlay>
              </Router>
            </StyleProvider>
          </PersistGate>
        </Provider>
      </Root>
    );
  }
}

App.propTypes = {
  store: PropTypes.shape({}).isRequired,
  persistor: PropTypes.shape({}).isRequired,
};

export default App;
