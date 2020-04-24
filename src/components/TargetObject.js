import React from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentDidMount() {
    // Actions.drawerOpen();
  }


  render() {
    // const { children } = this.props;
    return (
      <View style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'transparent',
      }}
      >
        <Text style={{ fontSize: 40, color: '#000' }}>targetObject</Text>
      </View>
    // children
    );
  }
}
